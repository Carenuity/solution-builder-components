import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { Button, List } from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution/Solution.constants';
import ApplicationListRecord from './components/ApplicationListRecord';
import { ApplicationListRecordProps } from './components/ApplicationListRecord/index.types';
import { ApplicationsListProps } from './ApplicationsList.types';

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

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  solutionId,
  setSolutionPageUrl,
}) => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);
  // const [data, setData] = useState<ApplicationListRecordProps[]>();

  // useEffect(() => {
  //   alert('Loaded!');
  // }, []);

  useEffect(() => {
    setIsMobile(width < screenThreshold);
  }, [width]);

  return (
    <>
      <List
        itemLayout={isMobile ? 'vertical' : 'horizontal'}
        size={'small'}
        dataSource={data}
        renderItem={(item) => <ApplicationListRecord key={item.id} {...item} />}
        loadMore={
          <>
            <div
              style={{
                textAlign: 'center',
                marginTop: 12,
                height: 32,
                lineHeight: '32px',
              }}
            >
              {setSolutionPageUrl && (
                <Button
                  size={'small'}
                  shape={'round'}
                  type={'link'}
                  href={setSolutionPageUrl(solutionId)}
                  icon={<LinkOutlined />}
                >
                  Load More
                </Button>
              )}
            </div>
          </>
        }
      />
    </>
  );
};

export default ApplicationsList;
