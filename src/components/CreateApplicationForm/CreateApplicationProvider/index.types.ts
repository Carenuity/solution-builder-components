import { Dispatch } from 'react';
import { BinaryFileType } from '../SetBinaryFileType/index.types';
import { BinaryFileId } from '../UploadBinaries/BinaryFile/index.types';

type DataItem = {
  id: string;
  name: string;
};

type ItemCategory =
  | 'sensor'
  | 'board'
  | 'actuator'
  | 'solution'
  | 'ecosystem'
  | 'application'
  | 'repository'
  | 'binary_type'
  | 'binary';

export type BinaryRecord = {
  offset: number;
  file: Blob;
  kind?: BinaryFileId;
};

type ApplicationBinaries = Partial<Record<BinaryFileId, BinaryRecord>>;

export type CreateApplicationData = {
  sensor?: DataItem;
  microcontroller?: DataItem;
  actuator?: DataItem;
  solution?: DataItem;
  ecosystem?: DataItem;
  application?: DataItem;
  repository?: string;
  binaryType?: BinaryFileType;
  canProceed?: boolean;
  binaries?: ApplicationBinaries;
};

// export type IoTShieldPreview = {
//   name?: string;
//   url: string;
// };

// type IotShield = {
//   name: string;
//   url: string;
//   category: IotShieldCategory;
// };

// export type SMA = Record<IotShieldCategory, IoTShieldPreview>;

export interface CreateApplicationReducerObject {
  state: CreateApplicationData;
  dispatch: Dispatch<CreateApplicationAction>;
}

export interface CreateApplicationAction {
  type: 'SET';
  data?: DataItem;
  category: ItemCategory;
  value?: string | BinaryFileType | BinaryRecord;
}
