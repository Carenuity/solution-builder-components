import { Avatar } from '../../utils/types.utils';
import { CompanyRecord } from '../CompaniesList/CompaniesList.types';

type Category = 'sensor' | 'actuator' | 'microcontroller';

export interface IotComponentDataType {
  key: React.Key;
  icon: string;
  name: string;
  manufacturer: string;
  category: Category;
}

export type IotComponentRecord = {
  id: string;
  name: string;
  avatars: Avatar[];
  manufacturer: CompanyRecord;
  category: Category;
};

export type IIotComponentsList = {
  accessToken: string;
  onDeleteIotComponent?: () => void;
  editIconUrlCallback: (iotComponentId: string) => string;
  editInfoUrlCallback: (iotComponentId: string) => string;
};
