import { Typography } from 'antd';
import React from 'react';
import { ApplicationDeveloperNameProps } from './index.types';

const { Text } = Typography;

const ApplicationDeveloperName: React.FC<ApplicationDeveloperNameProps> = ({
  value,
}) => {
  return (
    <>
      <Text type={'secondary'} ellipsis style={{ fontSize: '.7rem' }}>
        By{' '}
        <Text
          type={'secondary'}
          strong
          underline
          italic
          style={{ fontSize: '.75rem' }}
        >
          {value}
        </Text>
      </Text>
    </>
  );
};

export default ApplicationDeveloperName;
