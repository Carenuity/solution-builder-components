import axios from 'axios';
import { processAxiosError } from '../../utils/common.utils';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import { SchoolDataType, SchoolRecord } from './SchoolsList.types';

export const fetchSchools = async ({
  signal,
  offset,
}: {
  signal?: AbortSignal;
  offset?: string;
}) => {
  let schools: SchoolDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/schools`;

  try {
    const response = await axios.get<ListApiResponse<SchoolRecord>>(url, {
      params: {
        mode: 'full',
        offset,
        limit: 10,
        props: 'id,name,country,avatars,website',
      },
      signal,
    });

    if (response.status === 200) {
      const { items, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      schools = items.map(
        ({ id, avatars, name, country, website }): SchoolDataType => ({
          logo: avatars[0]?.url,
          key: id,
          name,
          country,
          website,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { schools, nextPageStart };
};

export const deleteSchool = async ({
  accessToken,
  schoolId,
  signal,
}: {
  schoolId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/schools/${schoolId}`;
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
