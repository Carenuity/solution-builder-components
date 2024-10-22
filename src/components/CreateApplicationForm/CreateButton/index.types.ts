import { BinaryRecord } from '../CreateApplicationProvider/index.types';
import { BinaryFileId } from '../UploadBinaries/BinaryFile/index.types';

export type ChipFamily = 'ESP8266' | 'ESP32-C3' | 'ESP32';

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
