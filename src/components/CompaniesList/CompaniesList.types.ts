import { Avatar } from '../../utils/types.utils';

export interface CompanyDataType {
  key: React.Key;
  logo: string;
  name: string;
  country: string;
}

export type CompanyRecord = {
  id: string;
  name: string;
  avatars: Avatar[];
  country: string;
};

export type ICompaniesList = {
  accessToken: string;
  onDeleteCompany?: () => void;
  editLogoUrlCallback: (companyId: string) => string;
  editBannersUrlCallback: (companyId: string) => string;
  editInfoUrlCallback: (companyId: string) => string;
};
