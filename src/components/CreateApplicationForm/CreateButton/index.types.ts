import { ChipFamily } from '../../../utils/types.utils';
import { BinaryRecord } from '../CreateApplicationProvider/index.types';
import { BinaryFileId } from '../UploadBinaries/BinaryFile/index.types';

export type IHandleCreateApplication = {
  application_id?: string;
  ecosystem_id?: string;
  solution_id?: string;
  chip_family: ChipFamily;
  repository?: string;
  binaries?: Partial<Record<BinaryFileId, BinaryRecord>>;
  access_token: string;
  signal: AbortSignal;
};

export type ICreateApplicationResponse = {
  id: string;
  application_id: string;
  ecosystem_id: string;
  solution_id: string;
  chip_family: ChipFamily;
  repository: string;
};

export type ICreateButton = {
  accessToken: string;
};
