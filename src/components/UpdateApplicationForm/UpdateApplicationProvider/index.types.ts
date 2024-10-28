import { Dispatch } from 'react';
import { BinaryFileId, IBinaryFileType } from '../../../utils/types.utils';

export type ApplicationDataItem = {
  id: string;
  name: string;
};

type ItemCategory =
  | 'board'
  | 'ecosystem'
  | 'application'
  | 'repository'
  | 'tag'
  | 'binary_type'
  | 'binary'
  | 'proceed';

// | 'sensor'
// | 'actuator'
// | 'solution'

export type ApplicationBinaryRecord = {
  offset: number;
  file: Blob;
  kind?: BinaryFileId;
};

type ApplicationBinaries = Partial<
  Record<BinaryFileId, ApplicationBinaryRecord>
>;

export type UpdateApplicationData = {
  // sensor?: DataItem;
  microcontroller?: ApplicationDataItem;
  // actuator?: DataItem;
  // solution?: DataItem;
  ecosystem?: ApplicationDataItem;
  application?: ApplicationDataItem;
  repository?: string;
  tag?: string;
  binaryType?: IBinaryFileType;
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
  value?:
    | string
    | IBinaryFileType
    | ApplicationBinaryRecord
    | ApplicationDataItem;
}
