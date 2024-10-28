import { Avatar } from '../../utils/types.utils';

export type IGetApplicationTypes = {
  signal: AbortSignal;
};

export type IGetEcosystems = {
  signal: AbortSignal;
};

type DataItem = {
  id: string;
  name: string;
  avatars: Avatar[];
};

export type Ecosystem = DataItem;

export type Application = DataItem;
