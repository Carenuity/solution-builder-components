import { Dispatch } from 'react';
import {
  BinaryFileId,
  BinaryFormat,
  ChipFamily,
} from '../../../utils/types.utils';
import {
  ApplicationBinaryRecord,
  ApplicationDataItem,
} from '../../common/developer/index.types';

type ItemCategory =
  | 'chip_family'
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

export type UpdateApplicationData = {
  chipFamily?: ChipFamily;
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
