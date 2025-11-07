import axios from 'axios';
import { processAxiosError } from '../../utils/common.utils';
import { solutionsApiHostname } from '../../utils/constants.utils';
import { ListApiResponse } from '../../utils/types.utils';
import { CompanyDataType, CompanyRecord } from './CompaniesList.types';

export const fetchCompanies = async ({
  signal,
  offset,
}: {
  signal?: AbortSignal;
  offset?: string;
}) => {
  let companies: CompanyDataType[] = [];
  let nextPageStart = undefined;

  const url = `${solutionsApiHostname}/v1/companies`;

  try {
    const response = await axios.get<ListApiResponse<CompanyRecord>>(url, {
      params: {
        mode: 'full',
        offset,
        limit: 10,
        props: 'id,name,country,avatars',
      },
      signal,
    });

    if (response.status === 200) {
      const { items, offset: _offset } = response.data.data;
      nextPageStart = _offset;

      companies = items.map(
        ({ id, avatars, name, country }): CompanyDataType => ({
          logo: avatars[0]?.url,
          key: id,
          name,
          country,
        })
      );
    }
  } catch (error) {
    console.error(error);
  }

  return { companies, nextPageStart };
};

export const deleteCompany = async ({
  accessToken,
  companyId,
  signal,
}: {
  companyId: string;
  accessToken: string;
  signal?: AbortSignal;
}) => {
  const url = `${solutionsApiHostname}/v1/companies/${companyId}`;
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
