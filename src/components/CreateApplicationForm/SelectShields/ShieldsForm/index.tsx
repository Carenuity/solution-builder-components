import { Form, FormProps } from 'antd';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import ShieldSelector from './ShieldSelector';
import { getIotShields } from './index.utils';
import { IotShield } from './index.types';
import { CreateApplicationContext } from '../../CreateApplicationProvider';

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
  const { state, dispatch } = useContext(CreateApplicationContext);

  useLayoutEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const timeoutId = setTimeout(async () => {
      const iotShields = await getIotShields({ signal });

      if (iotShields.length > 0) {
        setShields(() => iotShields);
      }
    }, 0);

    // set can proceed flag to false
    const { sensor, microcontroller, actuator } = state;
    if (state.canProceed && !sensor && !microcontroller && !actuator) {
      dispatch({ category: 'proceed', type: 'SET' });
    }

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const { sensor, microcontroller, actuator } = state;
    if (actuator && microcontroller && sensor && !state.canProceed) {
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
        <ShieldSelector
          label="Sensor"
          name="sensor"
          category={'sensor'}
          shields={shields}
          defaultValue={state.sensor?.id}
        />
        <ShieldSelector
          label="Microcontroller"
          name={'board'}
          category={'microcontroller'}
          shields={shields}
          defaultValue={state.microcontroller?.id}
        />
        <ShieldSelector
          label="Actuator"
          name={'actuator'}
          category={'actuator'}
          shields={shields}
          defaultValue={state.actuator?.id}
        />
      </Form>
    </>
  );
};

export default ShieldsForm;
