import { BinaryFileId, ChipFamily } from '../../../utils/types.utils';
import { ApplicationBinaryRecord } from '../../common/developer/index.types';

export type IHandleCreateApplication = {
  application_id?: string;
  ecosystem_id?: string;
  solution_id?: string;
  chip_family: ChipFamily;
  repository?: string;
  tag?: string;
  binaries?: Partial<Record<BinaryFileId, ApplicationBinaryRecord>>;
  access_token: string;
  signal: AbortSignal;
};

export type ICreateApplicationResponse = {
  id: string;
  tag: string;
  application_id: string;
  ecosystem_id: string;
  solution_id: string;
  chip_family: ChipFamily;
  repository: string;
};

export type ICreateButton = {
  accessToken: string;
};
