import { Avatar } from '../../utils/types.utils';

export interface SchoolDataType {
  key: React.Key;
  logo: string;
  name: string;
  country: string;
  website: string;
}

export type SchoolRecord = {
  id: string;
  name: string;
  avatars: Avatar[];
  country: string;
  website: string;
};

export type ISchoolsList = {
  accessToken: string;
  onDeleteSchool?: () => void;
  editLogoUrlCallback: (schoolId: string) => string;
  editBannersUrlCallback: (schoolId: string) => string;
  editInfoUrlCallback: (schoolId: string) => string;
};
