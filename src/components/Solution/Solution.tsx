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
            defaultActiveKey={`Preview-${props.id}`}
            tabPosition={'bottom'}
            centered
            items={tabs.map(({ content, label, icon }) => ({
              key: `${label.toLowerCase().replaceAll(' ', '-')}-${props.id}`,
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
