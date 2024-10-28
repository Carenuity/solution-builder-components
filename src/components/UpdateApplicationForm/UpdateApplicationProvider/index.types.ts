import { Dispatch } from 'react';
import { BinaryFileId, BinaryFormat } from '../../../utils/types.utils';
import { ApplicationDataItem } from '../../common/developer/index.types';

type ItemCategory =
  | 'board'
  | 'ecosystem'
  | 'application'
  | 'repository'
  | 'tag'
  | 'binary_type'
  | 'binary'
  | 'proceed';

export type ApplicationBinaryRecord = {
  offset: number;
  file: Blob;
  kind?: BinaryFileId;
};

type ApplicationBinaries = Partial<
  Record<BinaryFileId, ApplicationBinaryRecord>
>;

export type UpdateApplicationData = {
  microcontroller?: ApplicationDataItem;
  ecosystem?: ApplicationDataItem;
  application?: ApplicationDataItem;
  repository?: string;
  tag?: string;
  binaryType?: BinaryFormat;
  canProceed: boolean;
  binaries?: ApplicationBinaries;
};

export interface UpdateApplicationReducerObject {
  state: UpdateApplicationData;
  dispatch: Dispatch<UpdateApplicationAction>;
}

export interface UpdateApplicationAction {
  type: 'SET' | 'UNSET';
  category: ItemCategory;
  value?: string | BinaryFormat | ApplicationBinaryRecord | ApplicationDataItem;
}
