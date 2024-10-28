import { Avatar, Form, FormProps, Radio, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import mergedImage from './assets/merged_binary.jpg';
import arduinoImageIcon from './assets/binary_files.webp';
import { UpdateApplicationContext } from '../UpdateApplicationProvider';
import { IBinaryFileType } from '../../../utils/types.utils';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const BinaryFileType = () => {
  const { state, dispatch } = useContext(UpdateApplicationContext);
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');

  useEffect(() => {
    const { binaryType } = state;
    if (state.canProceed && !binaryType) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, []);

  useEffect(() => {
    const { binaryType } = state;
    if (binaryType && !state.canProceed) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, [state]);

  return (
    <>
      <Form
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
        <Form.Item label="How many binary files do you have?">
          <Radio.Group
            defaultValue={state.binaryType}
            onChange={(e) => {
              const value = e.target.value as IBinaryFileType;
              dispatch({ category: 'binary_type', type: 'SET', value });
            }}
          >
            <Space direction={'vertical'}>
              <Radio value="merged">
                <Avatar
                  src={mergedImage}
                  alt="merged binary icon"
                  shape={'square'}
                  size={'small'}
                  style={{ marginRight: '0.3rem' }}
                />{' '}
                One <strong>Merged</strong> file
              </Radio>
              <Radio value="arduino_parts">
                <Avatar
                  src={arduinoImageIcon}
                  alt="merged binary icon"
                  shape={'square'}
                  size={'small'}
                  style={{ marginRight: '0.3rem' }}
                />{' '}
                Several files compiled by <strong>Arduino IDE</strong>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default BinaryFileType;
