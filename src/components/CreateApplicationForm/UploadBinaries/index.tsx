import { FormProps, Form } from 'antd';
import React, { useContext, useState } from 'react';
import BinaryFile from './BinaryFile';
import { CreateApplicationContext } from '../CreateApplicationProvider';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const UploadBinaries = () => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const { state } = useContext(CreateApplicationContext);

  return (
    <>
      <Form
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
        {state.binaryType === 'merged' && (
          <BinaryFile kind={'main'} label="Binary" offset={0} />
        )}

        {state.binaryType === 'arduino_parts' && (
          <>
            <BinaryFile kind={'boot'} label="Boot binary" offset={57344} />
            <BinaryFile
              kind={'bootloader'}
              label="Bootloader binary"
              offset={0}
            />
            <BinaryFile
              kind={'partitions'}
              label="Partitions binary"
              offset={32768}
            />
            <BinaryFile kind={'main'} label="Main binary" offset={65536} />
          </>
        )}
      </Form>
    </>
  );
};

export default UploadBinaries;
