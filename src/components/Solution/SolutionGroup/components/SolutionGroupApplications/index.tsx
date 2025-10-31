import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Space, Typography } from 'antd';
import React from 'react';
import { ApplicationsList } from '../../../../Applications';
import { useScreenSize } from '../../../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../SolutionGroup.constants';
import { SolutionGroupApplicationsProps } from './index.types';
import Link from 'next/link';
import { useTheme } from 'antd-style';

const { Text } = Typography;

const SolutionGroupApplications: React.FC<SolutionGroupApplicationsProps> = ({
  id,
  name,
  applicationsViewport,
  createApplicationUrlGenerator,
  ...applicationListProps
}) => {
  const { width } = useScreenSize();
  const token = useTheme();

  return (
    <>
      <Flex justify={'space-between'}>
        <Space
          style={{
            marginLeft: '.7rem',
            borderBottom: `.1rem solid ${token.colorPrimary}`,
          }}
        >
          <AppstoreOutlined />
          <Text strong ellipsis>
            HW for Free Installable Applications
          </Text>
        </Space>

        {createApplicationUrlGenerator && (
          <Link
            href={createApplicationUrlGenerator(id)}
            title={'Add your application'}
            style={{
              margin: '.3rem',
              backgroundColor: token.colorPrimary,
              color: '#fff',
              borderRadius: '50%',
              padding: '.1rem .34rem',
              textAlign: 'center',
            }}
          >
            <PlusOutlined style={{ padding: 0, margin: 0 }} />
          </Link>
        )}
      </Flex>

      <div
        style={{
          height:
            width > screenThreshold ? applicationsViewport.height : '9rem',
          overflowY: 'scroll',
        }}
      >
        <ApplicationsList solution={{ id, name }} {...applicationListProps} />
      </div>
    </>
  );
};

export default SolutionGroupApplications;
