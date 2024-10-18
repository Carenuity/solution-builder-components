import axios from 'axios';
import { solutionsApiHostname } from '../../../../utils/constants.utils';
import { ListApiResponse } from '../../../../utils/types.utils';
import { Application, IGetApplications } from './index.types';

export const getApplications = async ({ signal }: IGetApplications) => {
  let applications: Application[] = [];

  const searchParam = new URLSearchParams();
  searchParam.set('mode', 'full');
  searchParam.set('props', 'id,name,avatars');
  const query = searchParam.toString();

  const url = `${solutionsApiHostname}/v1/applications?${query}`;

  try {
    const response = await axios.get<ListApiResponse<Application>>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });
    if (response.status === 200) {
      applications = response.data.data.items;
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }

  return applications;
};
