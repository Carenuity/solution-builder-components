import React from 'react';
import ActionButton from '../ActionButton';
import { MailOutlined } from '@ant-design/icons';

const ApplicationModificationRequest = () => {
  return (
    <>
      <ActionButton
        href={
          'mailto:max.mergenthaler@chipglobe.com?subject=Request%20Binary%20Modification&body=I%20would%20like%20to%20'
        }
        title={'Request Modification'}
        icon={<MailOutlined />}
      />
    </>
  );
};

export default ApplicationModificationRequest;
