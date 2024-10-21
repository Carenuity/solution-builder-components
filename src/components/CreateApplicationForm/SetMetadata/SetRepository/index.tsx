import { Form, Input, message } from 'antd';
import React, { useContext } from 'react';
import { CreateApplicationContext } from '../../CreateApplicationProvider';

const SetRepository = () => {
  const { state, dispatch } = useContext(CreateApplicationContext);

  return (
    <>
      <Form.Item
        name="url"
        label="Repository URL"
        rules={[
          { required: true },
          { type: 'url', warningOnly: true },
          { type: 'string', min: 6 },
        ]}
      >
        <Input
          placeholder="Application source code repository"
          defaultValue={state.repository}
          onBlur={(e) => {
            const { value } = e.target;
            const valid = /^https:\/\/github\.com\/.*/.test(value);
            // const valid = /^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(value);
            if (!valid) {
              e.target.setCustomValidity('Invalid GitHub repository URL');
              message.error('Invalid GitHub repository URL');
            } else {
              e.target.setCustomValidity('');
              // message.success(`Valid URL`);
              dispatch({
                type: 'SET',
                category: 'repository',
                value,
              });
            }
          }}
        />
      </Form.Item>
    </>
  );
};

export default SetRepository;
