import { Avatar } from '../../../../utils/types.utils';

export type IGetApplications = {
  signal: AbortSignal;
};

export type Application = {
  id: string;
  name: string;
  avatars: Avatar[];
};

export type OptionItem = {
  value: string;
  label: string;
  image?: string;
};
