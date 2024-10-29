import { BinaryFileId } from '../../../utils/types.utils';

export type ApplicationDataItem = {
  id: string;
  name: string;
};

export type ApplicationBinaryRecord = {
  offset: number;
  file: Blob;
  kind?: BinaryFileId;
};

export type OptionItem = {
  value: string;
  label: string;
  image?: string;
};
