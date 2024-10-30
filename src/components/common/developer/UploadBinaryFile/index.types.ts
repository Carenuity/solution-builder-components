import { DraggerProps } from 'antd/es/upload';
import { BinaryFileId } from '../../../../utils/types.utils';

export interface UploadBinaryFileProps extends DraggerProps {
  label: string;
  kind: BinaryFileId;
  required?: boolean;
}
