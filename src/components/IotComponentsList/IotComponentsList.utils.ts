import axios from 'axios';
import { processAxiosError } from '../../utils/common.utils';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import {
  IotComponentDataType,
  IotComponentRecord,
} from './IotComponentsList.types';

export const fetchIotComponents = async ({
  signal,
  offset,
  limit,
}: {
  signal?: AbortSignal;
  offset?: string;
  limit?: number;
}) => {
  let iotComponents: IotComponentDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/iot-components`;

  try {
    const response = await axios.get<ListApiResponse<IotComponentRecord>>(url, {
      params: {
        mode: 'full',
        offset,
        limit: limit || 10,
        props: 'id,name,category,avatars,manufacturer',
      },
      signal,
    });

    if (response.status === 200) {
      const { items, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      iotComponents = items.map(
        ({
          id,
          avatars,
          name,
          category,
          manufacturer,
        }): IotComponentDataType => ({
          icon: avatars[0]?.url,
          key: id,
          name,
          category,
          manufacturer: manufacturer.name,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { iotComponents, nextPageStart };
};

export const deleteIotComponent = async ({
  accessToken,
  iotComponentId,
  signal,
}: {
  iotComponentId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/iot-components/${iotComponentId}`;
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
