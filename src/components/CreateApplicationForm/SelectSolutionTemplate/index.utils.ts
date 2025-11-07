import axios from 'axios';
import { solutionsApiHostname } from '../../../utils/constants.utils';
import { ListApiResponse } from '../../../utils/types.utils';
import { DataType, SolutionTemplate } from './index.types';

export const getSolutionTemplates = async ({
  actuatorId,
  microcontrollerId,
  sensorId,
  signal,
}: {
  sensorId: string;
  microcontrollerId: string;
  actuatorId: string;
  signal: AbortSignal;
}) => {
  let tableData: DataType[] = [];

  const searchParam = new URLSearchParams();
  searchParam.set('mode', 'full');
  searchParam.set('filter', 'microcontroller');
  searchParam.set('filterId', microcontrollerId);
  searchParam.set('sensor_id', sensorId);
  searchParam.set('actuator_id', actuatorId);
  searchParam.set(
    'props',
    'id,name,sensor_id,microcontroller_id,actuator_id,avatars'
  );
  const query = searchParam.toString();

  const url = `${solutionsApiHostname}/v1/solution-templates?${query}`;

  try {
    const response = await axios.get<ListApiResponse<SolutionTemplate>>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });

    if (response.status === 200) {
      const solutions = response.data.data.items;
      const filteredSolutions = solutions.filter(
        ({ actuator_id, sensor_id }) => {
          if (actuatorId === actuator_id && sensorId === sensor_id) {
            return true;
          }
          return false;
        }
      );

      tableData = filteredSolutions.map(
        ({ id, name, avatars }): DataType => ({
          image: avatars[0]?.url,
          key: id,
          name,
        })
      );
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }

  return tableData;
};
