import {
  DownloadOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Col, Row, Tabs } from 'antd';
import React from 'react';
import { useScreenSize } from '../common/hooks/ScreenSize.hook';
import {
  backgroundColor,
  borderRadius,
  screenThreshold,
} from './Solution.constants';
import { SolutionProps, SolutionTab } from './Solution.types';
import SolutionImage from './components/SolutionImage';
import SolutionPreview from './components/SolutionPreview';
import './Solution.css';
import SolutionApplications from './components/SolutionApplications';

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
      content: <SolutionApplications {...props} />,
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
        <Col xs={24} md={7} lg={5} xl={4}>
          <SolutionImage {...props} />
        </Col>

        <Col xs={24} md={17} lg={19} xl={20}>
          <Tabs
            defaultActiveKey={`${props.defaultView}-${props.id}`}
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
