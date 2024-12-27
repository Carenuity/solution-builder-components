import { SafetyCertificateOutlined, WarningOutlined } from '@ant-design/icons';
import { Badge, Space, Typography } from 'antd';
import React from 'react';
import { ApplicationRecordTitleV1Props } from './index.types';

const { Text } = Typography;

const ApplicationRecordTitleV1: React.FC<ApplicationRecordTitleV1Props> = ({
  isVerified,
  value,
}) => {
  return (
    <Space>
      <Text ellipsis={{ tooltip: value }} style={{ maxWidth: '11.5rem' }}>
        {value}
      </Text>
      <Badge
        text={
          isVerified ? (
            <Text
              type={'secondary'}
              style={{ fontSize: '.75rem' }}
              title={'Verified'}
            >
              <SafetyCertificateOutlined />
            </Text>
          ) : (
            <Text
              type={'secondary'}
              style={{ fontSize: '.75rem' }}
              title={'Pending test'}
            >
              <WarningOutlined />
            </Text>
          )
        }
        status={isVerified ? 'success' : 'warning'}
        size={'small'}
      />
    </Space>
  );
};

export default ApplicationRecordTitleV1;
