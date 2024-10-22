export type BinaryFileId = 'boot' | 'bootloader' | 'partitions' | 'main';

export type IBinaryFile = {
  label: string;
  kind: BinaryFileId;
  offset: number;
};
