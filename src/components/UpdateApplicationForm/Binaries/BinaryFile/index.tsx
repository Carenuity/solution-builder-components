import { InboxOutlined } from '@ant-design/icons';
import { Form, Upload, UploadProps } from 'antd';
import React, { useContext } from 'react';
import { IBinaryFile } from './index.types';
import { UpdateApplicationContext } from '../../UpdateApplicationProvider';
import { BinaryFileId } from '../../../../utils/types.utils';

const { Dragger } = Upload;

const hintFileName = ({ kind }: { kind: BinaryFileId }) => {
  switch (kind) {
    case 'boot':
      return 'boot_app0.bin';

    case 'bootloader':
      return '*.bootloader.bin';

    case 'partitions':
      return '*.partitions.bin';

    case 'main':
      return '*.ino.bin';
  }
};

const BinaryFile: React.FC<IBinaryFile> = ({ kind, label, offset }) => {
  const { dispatch } = useContext(UpdateApplicationContext);

  const props: UploadProps = {
    name: 'file',
    accept: '.bin,application/octet-stream',
    multiple: false,
    onChange(info) {
      //   const { status } = info.file;
      const file = info.fileList[0]?.originFileObj;

      if (file) {
        dispatch({
          category: 'binary',
          type: 'SET',
          value: {
            file,
            offset,
            kind,
          },
        });
      }
    },
    onRemove: () => {
      //
    },
    maxCount: 1,
    listType: 'picture',
    onDrop(_e) {
      // console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <>
      <Form.Item label={label} name={kind}>
        <Dragger {...props} disabled={false}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Use strictly to upload{' '}
            <strong>`.bin`</strong> file.
            <br />
            <em>
              Hint: <strong>{hintFileName({ kind })}</strong>
            </em>
          </p>
        </Dragger>
      </Form.Item>
    </>
  );
};

export default BinaryFile;
