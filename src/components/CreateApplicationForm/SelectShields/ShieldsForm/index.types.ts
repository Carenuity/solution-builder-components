import { Avatar, IotShieldCategory } from '../../../../utils/types.utils';

export type IotShield = {
  id: string;
  name: string;
  category: IotShieldCategory;
  avatars: Avatar[];
};

export type IGetIotShields = {
  signal: AbortSignal;
};
