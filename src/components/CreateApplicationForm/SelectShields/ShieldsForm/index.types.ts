import { IotShieldCategory } from '../../../../utils/types.utils';

type Avatar = {
  id: string;
  url: string;
};

export type IotShield = {
  id: string;
  name: string;
  category: IotShieldCategory;
  avatars: Avatar[];
};

export type IGetIotShields = {
  signal: AbortSignal;
};
