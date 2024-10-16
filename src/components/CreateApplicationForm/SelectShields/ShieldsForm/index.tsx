import { Form, FormProps } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import ShieldSelector from './ShieldSelector';
import { getIotShields } from './index.utils';
import { IotShield } from './index.types';

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 6 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 14 },
//   },
// };

type LayoutType = Parameters<typeof Form>[0]['layout'];

const ShieldsForm = () => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const [shields, setShields] = useState<IotShield[]>([]);

  useLayoutEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const timeoutId = setTimeout(async () => {
      const iotShields = await getIotShields({ signal });

      if (iotShields.length > 0) {
        setShields(() => iotShields);
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Form
        //   {...formItemLayout}
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
        <ShieldSelector
          label="Sensor"
          name="sensor"
          category={'sensor'}
          shields={shields}
        />
        <ShieldSelector
          label="Microcontroller"
          name={'board'}
          category={'microcontroller'}
          shields={shields}
        />
        <ShieldSelector
          label="Actuator"
          name={'actuator'}
          category={'actuator'}
          shields={shields}
        />
      </Form>
    </>
  );
};

export default ShieldsForm;
