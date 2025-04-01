import {
  DownloadOutlined,
  HomeOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Col, Row, Tabs } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '../../common/hooks/ResizeObserver';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import SolutionApplications from './components/SolutionGroupApplications';
import SolutionDescription from './components/SolutionGroupDescription';
import SolutionImage from './components/SolutionGroupImage';
import SolutionPreview from './components/SolutionGroupPreview';
import './SolutionGroup.css';
import {
  backgroundColor,
  borderRadius,
  screenThreshold,
} from './SolutionGroup.constants';
import {
  SolutionGroupProps,
  SolutionGroupTab,
  SolutionGroupViewport,
} from './SolutionGroup.types';
import { SolutionGroupProvider } from './context';

const SolutionGroup: React.FC<SolutionGroupProps> = (props) => {
  const { width } = useScreenSize();
  const contentRef = useRef<HTMLDivElement>(null);
  const { observer, observerEntries } = useResizeObserver();
  const [viewport, setViewport] = useState<SolutionGroupViewport>({});
  const [isMobile, setIsMobile] = useState(width < screenThreshold);

  const contentId = 'content';

  useEffect(() => {
    if (!window.document) {
      return;
    }

    setIsMobile(width < screenThreshold);
  }, [width]);

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
    const moreVH = Math.ceil((67.09401 * height) / 100);

    setViewport((old) => ({
      ...old,
      applicationsView: { height: appsVH },
      preview: { height: previewVH },
      more: { height: moreVH },
    }));
  }, [observerEntries]);

  const tabs: SolutionGroupTab[] = [
    {
      label: 'Preview',
      icon: <HomeOutlined />,
      content: (
        <SolutionPreview
          viewport={{ height: viewport.preview?.height || 172 }}
          {...props}
        />
      ),
    },
    {
      label: 'Description',
      icon: <ReadOutlined />,
      content: (
        <SolutionDescription
          description={props.description}
          viewport={{ height: viewport.more?.height || 0 }}
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
  ];

  return (
    <>
      <SolutionGroupProvider>
        <Row
          style={{
            ...(!isMobile && {
              backgroundColor: backgroundColor,
              borderRadius: borderRadius,
              overflow: 'hidden',
            }),
            marginBottom: isMobile ? '.8rem' : undefined,
            width: '100%',
            maxWidth: '970px',
            margin: 'auto',
          }}
        >
          <Col
            span={24}
            xs={{ span: 24 }}
            // md={{ span: 10 }}
            // lg={{ span: 8 }}
            // xl={{ span: 9 }}
            // xxl={{ span: 7 }}
            sm={{ span: 9 }}
            lg={{ span: 7 }}
          >
            <SolutionImage {...props} />
          </Col>

          <Col
            ref={contentRef}
            id={contentId}
            xs={{ span: 24 }}
            // md={{ span: 14 }}
            // lg={{ span: 16 }}
            // xl={{ span: 15 }}
            // xxl={{ span: 17 }}
            sm={{ span: 15 }}
            lg={{ span: 17 }}
          >
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
                marginLeft: !isMobile ? '.7rem' : undefined,
                marginTop: isMobile ? '1.2rem' : undefined,
              }}
              size={'small'}
            />
          </Col>
        </Row>
      </SolutionGroupProvider>
    </>
  );
};

export default SolutionGroup;
