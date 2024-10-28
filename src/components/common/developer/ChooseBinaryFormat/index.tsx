import { Avatar, Form, Radio, RadioGroupProps, Space } from 'antd';
import React, { PropsWithRef } from 'react';
import mergedImage from './assets/merged_binary.jpg';
import arduinoImageIcon from './assets/binary_files.webp';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChooseBinaryFormat = React.forwardRef<any, PropsWithRef<RadioGroupProps>>(
  (props, ref) => {
    return (
      <>
        <Form.Item label="How many binary files do you have?">
          <Radio.Group
            ref={ref}
            {...props}
            // defaultValue={state.binaryType}
            // onChange={(e) => {
            //   const value = e.target.value as IBinaryFileType;
            //   dispatch({ category: 'binary_type', type: 'SET', value });
            // }}
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
      </>
    );
  }
);

export default ChooseBinaryFormat;
