import { Avatar, ChipFamily } from '../../utils/types.utils';

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
export type ApplicationPreview = {
  id: string;
  tag: string;
  application_id: string;
  chip_family: ChipFamily;
  ecosystem_id: string;
  repository: string;
};
