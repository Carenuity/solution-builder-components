import axios from 'axios';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import {
  ApplicationRecord,
  MyApplicationDataType,
} from './MyApplications.types';
import { processAxiosError } from '../../utils/common.utils';

export const getMyApplications = async ({
  developerId,
  signal,
  offset,
}: {
  developerId: string;
  signal?: AbortSignal;
  offset?: string;
}) => {
  let apps: MyApplicationDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/binaries`;

  try {
    const response = await axios.get<ListApiResponse<ApplicationRecord>>(url, {
      params: {
        mode: 'full',
        offset,
        limit: 10,
        props:
          'id,solution,application,repository,manifest,ecosystem,tag,created_at', // ,developer
        developer_id: developerId,
      },
      signal,
    });

    if (response.status === 200) {
      const { items: applications, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      apps = applications.map(
        ({
          application,
          ecosystem,
          id,
          manifest,
          repository,
          solution,
          created_at,
          tag,
        }): MyApplicationDataType => ({
          ecosystem: ecosystem.name,
          image: solution.avatars[0]?.url,
          key: id,
          name: solution.name,
          type: application.name,
          date: created_at,
          tag,
          manifest,
          repository,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { apps, nextPageStart };
};

export const deleteMyApplication = async ({
  accessToken,
  applicationId,
  signal,
}: {
  applicationId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/binaries/${applicationId}`;
  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal,
    });
  } catch (error) {
    processAxiosError(error, (message) => {
      throw new Error(message);
    });
  }
};
