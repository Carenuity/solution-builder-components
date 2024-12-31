import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Space, Button, Typography } from 'antd';
import React from 'react';
import { ApplicationsList } from '../../../Applications';
import { primaryColor } from '../../Solution.constants';
import { SolutionApplicationsProps } from './index.types';

const { Text } = Typography;

const SolutionApplications: React.FC<SolutionApplicationsProps> = ({
  id,
  generateCreateApplicationUrl,
  ...applicationListProps
}) => {
  return (
    <>
      <Flex justify={'space-between'}>
        <Space
          style={{
            marginLeft: '.7rem',
            borderBottom: `.1rem solid ${primaryColor}`,
          }}
        >
          <AppstoreOutlined />
          <Text strong>Applications</Text>
        </Space>

        {generateCreateApplicationUrl && (
          <Button
            href={generateCreateApplicationUrl(id)}
            title={'Add your application'}
            icon={<PlusOutlined />}
            shape={'circle'}
            type={'primary'}
            size={'small'}
            style={{ margin: '.3rem' }}
          />
        )}
      </Flex>

      <div
        style={{
          height: '9rem',
          overflowY: 'scroll',
        }}
      >
        <ApplicationsList solutionId={id} {...applicationListProps} />
      </div>
    </>
  );
};

export default SolutionApplications;
