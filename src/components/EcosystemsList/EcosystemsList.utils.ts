import axios from 'axios';
import { processAxiosError } from '../../utils/common.utils';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import { EcosystemDataType, EcosystemRecord } from './EcosystemsList.types';

export const fetchEcosystems = async ({
  signal,
  offset,
}: {
  signal?: AbortSignal;
  offset?: string;
}) => {
  let ecosystems: EcosystemDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/ecosystems`;

  try {
    const response = await axios.get<ListApiResponse<EcosystemRecord>>(url, {
      params: {
        mode: 'full',
        offset,
        limit: 10,
        props: 'id,name,description,avatars',
      },
      signal,
    });

    if (response.status === 200) {
      const { items, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      ecosystems = items.map(
        ({ id, avatars, name }): EcosystemDataType => ({
          icon: avatars[0]?.url,
          key: id,
          name,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { ecosystems, nextPageStart };
};

export const deleteEcosystem = async ({
  accessToken,
  ecosystemId,
  signal,
}: {
  ecosystemId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/ecosystems/${ecosystemId}`;
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
