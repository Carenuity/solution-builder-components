import { Dispatch } from 'react';
import {
  ApplicationBinaryRecord,
  ApplicationDataItem,
} from '../../common/developer/index.types';
import { BinaryFileId, BinaryFormat } from '../../../utils/types.utils';

type ItemCategory =
  | 'sensor'
  | 'board'
  | 'actuator'
  | 'solution'
  | 'ecosystem'
  | 'application'
  | 'repository'
  | 'tag'
  | 'binary_type'
  | 'binary'
  | 'proceed';

type ApplicationBinaries = Partial<
  Record<BinaryFileId, ApplicationBinaryRecord>
>;

export type CreateApplicationData = {
  sensor?: ApplicationDataItem;
  microcontroller?: ApplicationDataItem;
  actuator?: ApplicationDataItem;
  solution?: ApplicationDataItem;
  ecosystem?: ApplicationDataItem;
  application?: ApplicationDataItem;
  repository?: string;
  tag?: string;
  binaryType?: BinaryFormat;
  canProceed: boolean;
  binaries?: ApplicationBinaries;
};

export interface CreateApplicationReducerObject {
  state: CreateApplicationData;
  dispatch: Dispatch<CreateApplicationAction>;
}

export interface CreateApplicationAction {
  type: 'SET' | 'UNSET';
  // data?: DataItem;
  category: ItemCategory;
  value?: string | BinaryFormat | ApplicationBinaryRecord | ApplicationDataItem;
}
