import axios from 'axios';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import {
  ApplicationRecord,
  MyApplicationDataType,
} from './MyApplications.types';

export const getMyApplications = async ({
  developerId,
  signal,
}: {
  developerId: string;
  signal?: AbortSignal;
}) => {
  let result: MyApplicationDataType[] = [];

  const url = `${solutionsApiHostname}/v1/binaries`;

  try {
    const response = await axios.get<ListApiResponse<ApplicationRecord>>(url, {
      params: {
        mode: 'full',
        props:
          'id,solution,application,repository,manifest,ecosystem,tag,created_at', // ,developer
        developer_id: developerId,
      },
      signal,
    });

    if (response.status === 200) {
      const applications = response.data.data.items;
      result = applications.map(
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

  return result;
};
