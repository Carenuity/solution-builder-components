import { Form, Input, InputProps } from 'antd';
import React, { PropsWithRef, useState } from 'react';
import { sanitizeTag } from '../index.utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditTag = React.forwardRef<any, PropsWithRef<InputProps>>(
  (props, ref) => {
    // const { state, dispatch } = useContext(UpdateApplicationContext);
    const [preview, setPreview] = useState<string>();

    return (
      <>
        <Form.Item
          name={'tag'}
          label="Name your application"
          help={preview}
          extra={`Accepts alphanumeric and hyphen (-) characters.`}
          rules={[
            { required: true },
            { type: 'string', warningOnly: true },
            { type: 'string', max: 30 },
          ]}
        >
          <Input
            ref={ref}
            {...props}
            placeholder="Tag"
            maxLength={30}
            onChange={(e) => {
              const value = e.target.value;
              const targetValue = sanitizeTag(value);
              setPreview(targetValue);
            }}
            // defaultValue={state.tag}
            // onBlur={(e) => {
            //   const { value } = e.target;
            //   const targetValue = handleValueCleaning(value);
            //   dispatch({
            //     type: 'SET',
            //     category: 'tag',
            //     value: targetValue,
            //   });
            // }}
          />
        </Form.Item>
      </>
    );
  }
);

export default EditTag;
