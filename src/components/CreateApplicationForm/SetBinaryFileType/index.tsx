import { Form, FormProps } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { CreateApplicationContext } from '../CreateApplicationProvider';
import ChooseBinaryFormat from '../../common/developer/ChooseBinaryFormat';
import { BinaryFormat } from '../../../utils/types.utils';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const SetBinaryFileType = () => {
  const { state, dispatch } = useContext(CreateApplicationContext);
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
        <ChooseBinaryFormat
          defaultValue={state.binaryType}
          onChange={(e) => {
            const value = e.target.value as BinaryFormat;
            dispatch({ category: 'binary_type', type: 'SET', value });
          }}
        />
      </Form>
    </>
  );
};

export default SetBinaryFileType;
