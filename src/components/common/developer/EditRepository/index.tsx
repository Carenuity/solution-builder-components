import { Form, Input, InputProps } from 'antd';
import React, { PropsWithRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditRepository = React.forwardRef<any, PropsWithRef<InputProps>>(
  (props, ref) => {
    // const { state, dispatch } = useContext(UpdateApplicationContext);

    return (
      <>
        <Form.Item
          name="url"
          label="Repository URL"
          extra={`A GitHub repository url to this application's source code.`}
          rules={[
            { required: true },
            { type: 'url', warningOnly: true },
            { type: 'string', min: 6 },
          ]}
        >
          <Input
            ref={ref}
            {...props}
            placeholder="Application source code repository"
            // defaultValue={state.repository}
            // onBlur={(e) => {
            //   const { value } = e.target;
            //   const valid = /^https:\/\/github\.com\/.*/.test(value);
            //   if (!valid) {
            //     e.target.setCustomValidity('Invalid GitHub repository URL');
            //     message.error('Invalid GitHub repository URL');
            //   } else {
            //     e.target.setCustomValidity('');
            //     // message.success(`Valid URL`);
            //     dispatch({
            //       type: 'SET',
            //       category: 'repository',
            //       value,
            //     });
            //   }
            // }}
          />
        </Form.Item>
      </>
    );
  }
);

export default EditRepository;
