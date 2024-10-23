import React, { useContext, useEffect, useState } from 'react';
import SelectApplication from './SelectApplication';
import SelectEcosystem from './SelectEcosystem';
import SetRepository from './SetRepository';
import { Form, FormProps } from 'antd';
import { CreateApplicationContext } from '../CreateApplicationProvider';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const SetMetadata = () => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const { state, dispatch } = useContext(CreateApplicationContext);

  useEffect(() => {
    const { application, ecosystem, repository } = state;
    if (application && ecosystem && repository && !state.canProceed) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, [state]);

  useEffect(() => {
    const { application, ecosystem, repository } = state;
    if (state.canProceed && !application && !ecosystem && !repository) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
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
        <SetRepository />
        <SelectApplication />
        <SelectEcosystem />
      </Form>
    </>
  );
};

export default SetMetadata;
