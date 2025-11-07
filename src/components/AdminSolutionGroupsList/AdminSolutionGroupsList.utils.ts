import axios from 'axios';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import { processAxiosError } from '../../utils/common.utils';
import {
  AdminSolutionGroupDataType,
  AdminSolutionGroupRecord,
} from './AdminSolutionGroupsList.types';

export const fetchSolutionGroups = async ({
  signal,
  offset,
  actuatorId,
  microId,
  sensorId,
}: {
  signal?: AbortSignal;
  offset?: string;
  microId?: string;
  sensorId?: string;
  actuatorId?: string;
}) => {
  let solutions: AdminSolutionGroupDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/solution-templates`;

  try {
    const response = await axios.get<ListApiResponse<AdminSolutionGroupRecord>>(
      url,
      {
        params: {
          mode: 'full',
          offset,
          limit: 10,
          props: 'id,name,actuator,sensor,microcontroller,avatars',
          filter: microId ? 'microcontroller' : undefined,
          filterId: microId,
          sensor_id: sensorId,
          microcontroller_id: microId,
          actuator_id: actuatorId,
        },
        signal,
      }
    );

    if (response.status === 200) {
      const { items, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      solutions = items.map(
        ({
          id,
          actuator,
          avatars,
          microcontroller,
          name,
          sensor,
        }): AdminSolutionGroupDataType => ({
          image: avatars[0]?.url,
          key: id,
          name,
          sensor,
          actuator,
          micro: microcontroller,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { solutions, nextPageStart };
};

export const deleteSolutionGroup = async ({
  accessToken,
  solutionId,
  signal,
}: {
  solutionId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/solution-templates/${solutionId}`;
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
