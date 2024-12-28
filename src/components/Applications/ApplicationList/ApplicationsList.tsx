import { DownloadOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution/Solution.constants';
import ApplicationListRecord from './components/ApplicationListRecord';
import { ApplicationListRecordProps } from './components/ApplicationListRecord/index.types';

const InstallButton = ({ manifest }: { manifest: string }) => {
  return (
    <Button
      href={manifest}
      type={'primary'}
      shape={'round'}
      size={'small'}
      icon={<DownloadOutlined />}
    >
      Install
    </Button>
  );
};

const data = Array.from({ length: 23 }).map(
  (_, i): ApplicationListRecordProps => ({
    id: `werty-${i}`,
    InstallButton,
    tag: `Version-${i}`,
    developer: {
      id: `dev-${i}`,
      name: `john ${i}`,
      subtitle: 'Embedded Systems developer',
      avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
      socialHandles: [{ id: `handle-${i}`, url: '#' }],
    },
    manifest: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    repository: 'https://github.com/ant-design/ant-design',
    downVotes: i * 1,
    downloads: i * 3,
    hasDownVoted: i % 3 === 0,
    hasUpVoted: i % 2 === 0,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    reviews: [
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    ],
    hasReviewed: i % 5 === 0,
    totalValidators: i * 2,
    upVotes: i * 3,
  })
);

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
        // footer={
        //   <div>
        //     <b>ant design</b> footer part
        //   </div>
        // }
        renderItem={(item) => <ApplicationListRecord key={item.id} {...item} />}
      />
    </>
  );
};

export default ApplicationsList;
