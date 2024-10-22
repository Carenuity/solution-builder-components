import { InboxOutlined } from '@ant-design/icons';
import { Form, Upload, UploadProps } from 'antd';
import React, { useContext } from 'react';
import { BinaryFileId, IBinaryFile } from './index.types';
import { CreateApplicationContext } from '../../CreateApplicationProvider';

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
  const { dispatch } = useContext(CreateApplicationContext);

  const props: UploadProps = {
    name: 'file',
    accept: '.bin,application/octet-stream',
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
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

      /*
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }*/
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
