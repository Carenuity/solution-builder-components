import { FormProps, Form, Result, Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { UpdateApplicationContext } from '../UpdateApplicationProvider';
import UploadBinaryFile from '../../common/developer/UploadBinaryFile';
import { RcFile } from 'antd/es/upload';
import { BinaryFileId } from '../../../utils/types.utils';
import {
  BootBinaryOffset,
  BootLoaderBinaryOffset,
  MainBinaryOffset,
  MergedBinaryOffset,
  PartitionsBinaryOffset,
} from '../../common/developer/index.constants';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const Binaries = () => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const { state, dispatch } = useContext(UpdateApplicationContext);

  useEffect(() => {
    const { binaries } = state;
    console.log('Binaries: ', state.canProceed, binaries?.main);
    if (state.canProceed && !binaries?.main) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, []);

  useEffect(() => {
    const { binaries } = state;
    if (binaries?.main && !state.canProceed) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, [state]);

  const handleFileUpload = ({
    file,
    offset,
    kind,
  }: {
    file?: RcFile;
    kind?: BinaryFileId;
    offset: number;
  }) => {
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
  };

  return (
    <>
      <Form
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        requiredMark={'optional'}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
        {!state.binaryType && (
          <Result
            status="success"
            title="Successfully Updated your application"
            // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button
                type="primary"
                variant={'solid'}
                color={'primary'}
                key="review"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Review
              </Button>,
            ]}
          />
        )}

        {state.binaryType === 'merged' && (
          <UploadBinaryFile
            kind={'main'}
            label="Binary"
            required={true}
            onChange={(info) => {
              //   const { status } = info.file;
              const file = info.fileList[0]?.originFileObj;
              handleFileUpload({
                offset: MergedBinaryOffset,
                file,
                kind: 'main',
              });
            }}
          />
        )}

        {state.binaryType === 'arduino_parts' && (
          <>
            <UploadBinaryFile
              kind={'boot'}
              label={'Boot binary'}
              onChange={(info) => {
                const file = info.fileList[0]?.originFileObj;
                handleFileUpload({
                  offset: BootBinaryOffset,
                  file,
                  kind: 'boot',
                });
              }}
            />

            <UploadBinaryFile
              kind={'bootloader'}
              label="Bootloader binary"
              onChange={(info) => {
                const file = info.fileList[0]?.originFileObj;
                handleFileUpload({
                  offset: BootLoaderBinaryOffset,
                  file,
                  kind: 'bootloader',
                });
              }}
            />

            <UploadBinaryFile
              kind={'partitions'}
              label="Partitions binary"
              onChange={(info) => {
                const file = info.fileList[0]?.originFileObj;
                handleFileUpload({
                  offset: PartitionsBinaryOffset,
                  file,
                  kind: 'partitions',
                });
              }}
            />

            <UploadBinaryFile
              kind={'main'}
              label="Main binary"
              required={true}
              onChange={(info) => {
                const file = info.fileList[0]?.originFileObj;
                handleFileUpload({
                  offset: MainBinaryOffset,
                  file,
                  kind: 'main',
                });
              }}
            />
          </>
        )}
      </Form>
    </>
  );
};

export default Binaries;
