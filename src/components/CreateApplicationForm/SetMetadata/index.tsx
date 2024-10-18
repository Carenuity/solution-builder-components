import React, { useState } from 'react';
import SelectApplication from './SelectApplication';
import SelectEcosystem from './SelectEcosystem';
import SetRepository from './SetRepository';
import { Form, FormProps } from 'antd';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const SetMetadata = () => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');

  return (
    <>
      <Form
        //   {...formItemLayout}
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
        <SelectApplication />
        <SelectEcosystem />
        <SetRepository />
      </Form>
    </>
  );
};

export default SetMetadata;
