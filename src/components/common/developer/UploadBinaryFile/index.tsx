import { InboxOutlined } from '@ant-design/icons';
import { Form, Upload, UploadProps } from 'antd';
import React, { PropsWithRef } from 'react';
import { UploadBinaryFileProps } from './index.types';
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

const UploadBinaryFile = React.forwardRef<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  PropsWithRef<UploadBinaryFileProps>
>(({ kind, label, ...props }, ref) => {
  // const { dispatch } = useContext(UpdateApplicationContext);

  const uploadProps: UploadProps = {
    name: 'file',
    accept: '.bin,application/octet-stream',
    multiple: false /*
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
    },*/,
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
        <Dragger ref={ref} {...props} {...uploadProps} disabled={false}>
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
});

export default UploadBinaryFile;
