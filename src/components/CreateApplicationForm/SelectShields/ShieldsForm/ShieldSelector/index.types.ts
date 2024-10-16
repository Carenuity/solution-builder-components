import { IotShieldCategory } from '../../../../../utils/types.utils';
import { IotShield } from '../index.types';

export type IShieldSelector = {
  label: string;
  name: string;
  category: IotShieldCategory;
  shields: IotShield[];
};

export type OptionItem = {
  value: string;
  label: string;
  image: string;
};
