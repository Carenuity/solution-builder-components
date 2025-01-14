import { AppstoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Space, Button, Typography } from 'antd';
import React from 'react';
import { ApplicationsList } from '../../../Applications';
import { primaryColor, screenThreshold } from '../../Solution.constants';
import { SolutionApplicationsProps } from './index.types';
import { useScreenSize } from '../../../common/hooks/ScreenSize.hook';

const { Text } = Typography;

const SolutionApplications: React.FC<SolutionApplicationsProps> = ({
  id,
  name,
  applicationsViewport,
  createApplicationUrlGenerator,
  ...applicationListProps
}) => {
  const { width } = useScreenSize();
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

        {createApplicationUrlGenerator && (
          <Button
            href={createApplicationUrlGenerator(id)}
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

export default SolutionApplications;
