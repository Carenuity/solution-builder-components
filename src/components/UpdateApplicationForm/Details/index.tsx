import React, { useContext, useEffect, useState } from 'react';
import SelectApplication from './SelectApplication';
import SelectEcosystem from './SelectEcosystem';
import SetRepository from './SetRepository';
import { Form, FormProps } from 'antd';
import SetTag from './SetTag';
import { UpdateApplicationContext } from '../UpdateApplicationProvider';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const Details = () => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const { state, dispatch } = useContext(UpdateApplicationContext);

  useEffect(() => {
    const { application, ecosystem, repository, tag } = state;
    if (application && ecosystem && repository && tag && !state.canProceed) {
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
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
        <SetTag />
        <SetRepository />
        <SelectApplication />
        <SelectEcosystem />
      </Form>
    </>
  );
};

export default Details;
