import axios from 'axios';
import {
  Application,
  Ecosystem,
  IGetApplicationTypes,
  IGetEcosystems,
} from './types.lib';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';

export const getApplicationTypes = async ({ signal }: IGetApplicationTypes) => {
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

export const getEcosystems = async ({ signal }: IGetEcosystems) => {
  let ecosystems: Ecosystem[] = [];

  const searchParam = new URLSearchParams();
  searchParam.set('mode', 'full');
  searchParam.set('props', 'id,name,avatars');
  const query = searchParam.toString();

  const url = `${solutionsApiHostname}/v1/ecosystems?${query}`;

  try {
    const response = await axios.get<ListApiResponse<Ecosystem>>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal,
    });
    if (response.status === 200) {
      ecosystems = response.data.data.items;
    }
  } catch (error) {
    if (error) {
      console.error(error);
    }
  }

  return ecosystems;
};
