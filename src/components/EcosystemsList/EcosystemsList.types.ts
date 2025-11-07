import { Avatar } from '../../utils/types.utils';

export interface EcosystemDataType {
  key: React.Key;
  icon: string;
  name: string;
}

export type EcosystemRecord = {
  id: string;
  name: string;
  avatars: Avatar[];
};

export type IEcosystemsList = {
  accessToken: string;
  onDeleteEcosystem?: () => void;
  editIconUrlCallback: (ecosystemId: string) => string;
  editBannersUrlCallback: (ecosystemId: string) => string;
  editInfoUrlCallback: (ecosystemId: string) => string;
};
