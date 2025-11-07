import axios from 'axios';
import { processAxiosError } from '../../utils/common.utils';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import { HandleDataType, HandleRecord } from './HandlesList.types';

export const fetchHandles = async ({
  signal,
  offset,
  accessToken,
}: {
  signal?: AbortSignal;
  offset?: string;
  accessToken: string;
}) => {
  let handles: HandleDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/handles`;

  try {
    const response = await axios.get<ListApiResponse<HandleRecord>>(url, {
      params: {
        mode: 'full',
        offset,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      signal,
    });

    if (response.status === 200) {
      const { items, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      handles = items.map(
        ({ id, icon, tag }): HandleDataType => ({
          icon,
          key: id,
          tag,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { handles, nextPageStart };
};

export const deleteHandle = async ({
  accessToken,
  handleId,
  signal,
}: {
  handleId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/handles/${handleId}`;
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
