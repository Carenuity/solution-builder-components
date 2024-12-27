import { Popover } from 'antd';
import React from 'react';
import ActionButton from '../ActionButton';
import { EditOutlined } from '@ant-design/icons';

const ApplicationModificationRequest = () => {
  return (
    <>
      <Popover
        title={'Request Modification'}
        content={<div>Request modification form coming soon..!</div>}
      >
        <ActionButton title={'Request Modification'} icon={<EditOutlined />} />
      </Popover>
    </>
  );
};

export default ApplicationModificationRequest;
