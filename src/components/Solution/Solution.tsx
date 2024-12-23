import { Col, Row, Tabs } from 'antd';
import React from 'react';
import { SolutionProps, SolutionTab } from './Solution.types';
import {
  AppstoreOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { useScreenSize } from './Solution.hooks';
import {
  screenThreshold,
  backgroundColor,
  borderRadius,
} from './Solution.constants';
import SolutionPreview from './components/SolutionPreview';
import SolutionImage from './components/SolutionImage';

const Solution: React.FC<SolutionProps> = (props) => {
  const { width } = useScreenSize();

  const tabs: SolutionTab[] = [
    {
      label: 'Preview',
      icon: <HomeOutlined />,
      content: <SolutionPreview {...props} />,
    },
    {
      label: 'Applications',
      icon: <AppstoreOutlined />,
      content: 'Something here',
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
            defaultActiveKey="Preview"
            tabPosition={'bottom'}
            centered
            items={tabs.map(({ content, label, icon }) => ({
              key: label,
              label,
              children: content,
              icon,
            }))}
            style={{
              minHeight: '100%',
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
