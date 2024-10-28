import { BinaryFileId } from '../../../../utils/types.utils';

export type IBinaryFile = {
  label: string;
  kind: BinaryFileId;
  offset: number;
};
