import {
  AppstoreOutlined,
  DownloadOutlined,
  HomeOutlined,
  PlusOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Button, Col, Flex, Row, Space, Tabs, Typography } from 'antd';
import React from 'react';
import { useScreenSize } from '../common/hooks/ScreenSize.hook';
import {
  backgroundColor,
  borderRadius,
  primaryColor,
  screenThreshold,
} from './Solution.constants';
import { SolutionProps, SolutionTab } from './Solution.types';
import SolutionImage from './components/SolutionImage';
import SolutionPreview from './components/SolutionPreview';
import { ApplicationsList } from '../Applications';
import './Solution.css';

const { Text } = Typography;

const Solution: React.FC<SolutionProps> = (props) => {
  const { width } = useScreenSize();

  const tabs: SolutionTab[] = [
    {
      label: 'Preview',
      icon: <HomeOutlined />,
      content: <SolutionPreview {...props} />,
    },
    {
      label: 'Install for free',
      icon: <DownloadOutlined />,
      content: (
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

            <Button
              href={'#'}
              title={'Add your application'}
              icon={<PlusOutlined />}
              shape={'circle'}
              type={'primary'}
              size={'small'}
              style={{ margin: '.3rem' }}
            />
          </Flex>

          <div
            style={{
              height: '9rem',
              overflowY: 'scroll',
            }}
          >
            <ApplicationsList
              solutionId={'1'}
              setSolutionPageUrl={(solutionId) => `/solutions/${solutionId}`}
            />
          </div>
        </>
      ),
    },
    {
      label: 'More',
      icon: <ReadOutlined />,
      content: 'Something here',
    },
  ];

  return (
    <>
      <Row
        style={{
          ...(width > screenThreshold && {
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            overflow: 'hidden',
          }),
        }}
      >
        <Col xs={24} md={7}>
          <SolutionImage {...props} />
        </Col>

        <Col xs={24} md={17}>
          <Tabs
            defaultActiveKey={`install-for-free-${props.id}`}
            tabPosition={'bottom'}
            centered
            items={tabs.map(({ content, label, icon }) => ({
              key: `${label.toLowerCase().replaceAll(' ', '-')}-${props.id}`,
              label,
              children: content,
              icon,
            }))}
            style={{
              height: '100%',
              marginLeft: width > screenThreshold ? '.7rem' : undefined,
              marginTop: width < screenThreshold ? '1.2rem' : undefined,
            }}
            size={'small'}
          />
        </Col>
      </Row>
    </>
  );
};

export default Solution;
