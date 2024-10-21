import { Avatar } from '../../../../utils/types.utils';

export type IGetEcosystems = {
  signal: AbortSignal;
};

export type Ecosystem = {
  id: string;
  name: string;
  avatars: Avatar[];
};

export type OptionItem = {
  value: string;
  label: string;
  image?: string;
};
