import axios from 'axios';
import { solutionsApiHostname } from '../../../../utils/constants.utils';
import { ListApiResponse } from '../../../../utils/types.utils';
import { IGetIotShields, IotShield } from './index.types';

export const getIotShields = async ({ signal }: IGetIotShields) => {
  let iotShields: IotShield[] = [];

  const searchParam = new URLSearchParams();
  searchParam.set('mode', 'full');
  searchParam.set('props', 'id,name,avatars,category');
  const query = searchParam.toString();

  const url = `${solutionsApiHostname}/v1/iot-components?${query}`;

  try {
    const response = await axios.get<ListApiResponse<IotShield>>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });
    if (response.status === 200) {
      iotShields = response.data.data.items;
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }

  return iotShields;
};
