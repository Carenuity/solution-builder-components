import { BinaryFileId, ChipFamily } from '../../../utils/types.utils';
import { ApplicationBinaryRecord } from '../../common/developer/index.types';

export type IHandleUpdateApplication = {
  id: string;
  application_id?: string;
  ecosystem_id?: string;
  chip_family: ChipFamily;
  repository?: string;
  tag?: string;
  binaries?: Partial<Record<BinaryFileId, ApplicationBinaryRecord>>;
  access_token: string;
  signal: AbortSignal;
};

export type IUpdateApplicationResponse = {
  id: string;
  solution_id: string;
  application_id: string;
  ecosystem_id: string;
  chip_family: string;
  repository: string;
  tag: string;
};

export type IUpdateButton = {
  accessToken: string;
  id: string;
};
