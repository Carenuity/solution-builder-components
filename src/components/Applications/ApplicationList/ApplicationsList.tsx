import {
  DislikeFilled,
  DislikeOutlined,
  DownloadOutlined,
  GithubOutlined,
  LikeFilled,
  LikeOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Button, Flex, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution/Solution.constants';
import ApplicationDescription from '../components/ApplicationDescription';
import ApplicationModificationRequest from '../components/ApplicationModificationRequest';
import ActionButton from '../components/ActionButton';
import ApplicationReviews from '../components/ApplicationReviews';
import ActionText from '../components/ActionText';
import ApplicationRecordTitleV1 from './components/ApplicationRecordTitleV1';
import ApplicationDeveloperName from './components/ApplicationDeveloperName';

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `Version-${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const ApplicationsList = () => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);

  useEffect(() => {
    setIsMobile(width < screenThreshold);
  }, [width]);

  return (
    <>
      <List
        itemLayout={isMobile ? 'vertical' : 'horizontal'}
        size={'small'}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={data}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <ActionText
                icon={DownloadOutlined}
                text="20"
                key="list-vertical-star-o"
              />,
              <ActionButton
                count={10}
                icon={<LikeOutlined />}
                actionedIcon={<LikeFilled />}
                hasActioned={true}
                title={'Likes'}
              />,
              <ActionButton
                count={2}
                icon={<DislikeOutlined />}
                actionedIcon={<DislikeFilled />}
                hasActioned={false}
                title={'Dislikes'}
              />,
              <ApplicationReviews />,
              <ActionText
                icon={SafetyCertificateOutlined}
                text="5"
                key="list-vertical-star-o"
              />,
              <ApplicationDescription />,
              <ActionButton
                href={'#'}
                target={'_blank'}
                referrerPolicy={'no-referrer'}
                title={'Repository'}
                type={'link'}
                icon={<GithubOutlined />}
              />,
              <ApplicationModificationRequest />,
            ]}
          >
            <List.Item.Meta
              title={
                <ApplicationRecordTitleV1
                  value={item.title}
                  isVerified={true}
                />
              }
              description={<ApplicationDeveloperName value={'John Doe'} />}
            />

            <Flex gap={10} vertical={isMobile}>
              <Button
                type={'primary'}
                shape={'round'}
                size={'small'}
                icon={<DownloadOutlined />}
              >
                Install
              </Button>
            </Flex>
          </List.Item>
        )}
      />
    </>
  );
};

export default ApplicationsList;
