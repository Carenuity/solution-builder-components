import { Form, Input } from 'antd';
import React, { useContext, useState } from 'react';
import { UpdateApplicationContext } from '../../UpdateApplicationProvider';

const SetTag = () => {
  const { state, dispatch } = useContext(UpdateApplicationContext);
  const [preview, setPreview] = useState<string>();

  const handleValueCleaning = (value: string) => {
    if (value) {
      let cleaned = value.trim();
      cleaned = cleaned.replaceAll(' ', '-');
      cleaned = cleaned.replace(/[^a-zA-Z0-9-]/gi, '');
      return cleaned;
    }
    return undefined;
  };

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
          placeholder="Tag"
          maxLength={30}
          onChange={(e) => {
            const value = e.target.value;
            const targetValue = handleValueCleaning(value);
            setPreview(targetValue);
          }}
          defaultValue={state.tag}
          onBlur={(e) => {
            const { value } = e.target;
            const targetValue = handleValueCleaning(value);
            dispatch({
              type: 'SET',
              category: 'tag',
              value: targetValue,
            });
          }}
        />
      </Form.Item>
    </>
  );
};

export default SetTag;
