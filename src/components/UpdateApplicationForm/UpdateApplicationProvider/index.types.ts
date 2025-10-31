import { Dispatch } from 'react';
import { BinaryFileId, BinaryFormat } from '../../../utils/types.utils';
import { ApplicationBinaryRecord } from '../../common/developer/index.types';

type ItemCategory = 'binary_type' | 'binary' | 'proceed';

type ApplicationBinaries = Partial<
  Record<BinaryFileId, ApplicationBinaryRecord>
>;

export type UpdateApplicationData = {
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
  value?: string | BinaryFormat | ApplicationBinaryRecord;
}
