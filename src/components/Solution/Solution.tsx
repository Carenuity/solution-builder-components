import {
  DownloadOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Col, Row, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useScreenSize } from '../common/hooks/ScreenSize.hook';
import {
  backgroundColor,
  borderRadius,
  screenThreshold,
} from './Solution.constants';
import { SolutionProps, SolutionTab, SolutionViewport } from './Solution.types';
import SolutionImage from './components/SolutionImage';
import SolutionPreview from './components/SolutionPreview';
import './Solution.css';
import SolutionApplications from './components/SolutionApplications';
import { useResizeObserver } from '../common/hooks/ResizeObserver';

const Solution: React.FC<SolutionProps> = (props) => {
  const { width } = useScreenSize();
  const contentRef = useRef<HTMLDivElement>(null);
  const { observer, observerEntries } = useResizeObserver();
  const [viewport, setViewport] = useState<SolutionViewport>({});

  const contentId = 'content';

  useEffect(() => {
    if (!window.document) {
      return;
    }
    if (observer && contentRef.current) {
      observer.observe(contentRef.current);
    }
  }, [observer]);

  useEffect(() => {
    if (!window.document || !observerEntries) {
      return;
    }

    const height = observerEntries[contentId].contentRect.height;
    const appsVH = Math.ceil((62.3931 * height) / 100);
    const previewVH = Math.ceil((76.923 * height) / 100);

    setViewport((old) => ({
      ...old,
      applicationsView: { height: appsVH },
      preview: { height: previewVH },
    }));
  }, [observerEntries]);

  const tabs: SolutionTab[] = [
    {
      label: 'Preview',
      icon: <HomeOutlined />,
      content: (
        <SolutionPreview
          viewport={{ height: viewport.preview?.height || 0 }}
          {...props}
        />
      ),
    },
    {
      label: 'Install for free',
      icon: <DownloadOutlined />,
      content: (
        <SolutionApplications
          applicationsViewport={{
            height: viewport.applicationsView?.height || 0,
          }}
          {...props}
        />
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
        <Col xs={24} md={7} lg={5} xl={4}>
          <SolutionImage {...props} />
        </Col>

        <Col ref={contentRef} id={contentId} xs={24} md={17} lg={19} xl={20}>
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
