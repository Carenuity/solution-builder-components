import { Col, Flex, FloatButton, Image, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { SolutionTab } from './Solution.types';
import {
  AppstoreOutlined,
  HomeOutlined,
  ReadOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

const tabs: SolutionTab[] = [
  {
    label: 'Preview',
    icon: <HomeOutlined />,
    content: 'Something here is showing up here',
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

const borderRadius = '.7rem';
const backgroundColor = 'rgba(0,0,0,.25)';
const screenThreshold = 700;

const useScreenSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // handle screen resize
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    // add window resize event listener
    window.addEventListener('resize', handleResize);

    // revoke listener on component destroy
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
};

const Solution = () => {
  const { width } = useScreenSize();

  //   useEffect(() => {
  //     alert(width);
  //   }, [width]);

  return (
    <>
      <Row>
        <Col xs={24} md={6}>
          <Flex
            justify={'center'}
            align={'center'}
            style={{
              position: 'relative',
              ...(width > screenThreshold && {
                backgroundColor: backgroundColor,
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
              }),
            }}
          >
            <FloatButton
              tooltip={'share'}
              icon={<ShareAltOutlined />}
              style={{
                position: 'absolute',
                bottom: width > screenThreshold ? '45%' : '-7%',
                right: width > screenThreshold ? '-12%' : '45%',
              }}
              onClick={() => console.log('onClick')}
            />
            <Image
              src={
                'https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fsolution_template%252Favatars%252FeieQlkAmwh1LUePfYXmW%252F1723542605619_SGP30_C3-Mini_0.66-OLED_couldfree.png%3Falt%3Dmedia%26token%3D47a6d73a-8f26-4659-bbd0-3f5ec4a90979&w=640&q=75'
              }
              loading={'lazy'}
              style={{
                borderRadius: borderRadius,
              }}
              alt={'Solution image'}
              fallback={
                'https://image-placeholder.com/images/actual-size/640x640.png'
              }
            />
          </Flex>
        </Col>
        <Col
          xs={24}
          md={16}
          style={{
            ...(width > screenThreshold && {
              backgroundColor: backgroundColor,
              borderTopRightRadius: borderRadius,
              borderBottomRightRadius: borderRadius,
            }),
          }}
        >
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
          />
        </Col>
      </Row>
    </>
  );
};

export default Solution;
