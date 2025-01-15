import {
  DownloadOutlined,
  LinkOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Button, List, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution/SolutionGroup/SolutionGroup.constants';
import {
  ApplicationData,
  ApplicationsListProps,
} from './ApplicationsList.types';
import ApplicationListRecord from './components/ApplicationListRecord';

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  solution,
  limit,
  solutionUrlGenerator,
  onInitialApplicationsLoad,
  onLoadMoreApplications,
  InstallButton,
  developerApplicationsUrlGenerator,
  onDispatchDeveloper,
  onResetDeveloperDispatch,
}) => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);
  const [initialLoading, setInitialLoading] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [data, setData] = useState<ApplicationData[]>([]);

  const controller = new AbortController();

  useEffect(() => {
    if (!window.document) return;

    onInitialApplicationsLoad(solution.id, { signal: controller.signal, limit })
      .then(({ cursor: c, data: _initialData }) => {
        setInitialLoading(false);
        setData(_initialData);
        setCursor(c);
      })
      .catch((err) => {
        setInitialLoading(false);
        message.error(err.message);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    setIsMobile(width < screenThreshold);
  }, [width]);

  const onLoadMore = () => {
    if (onLoadMoreApplications) {
      setLoading(true);
      onLoadMoreApplications(solution.id, {
        signal: controller.signal,
        limit,
        cursor,
      })
        .then(({ cursor: c, data: moreData }) => {
          setLoading(false);
          if (moreData.length === 0) {
            setHasMoreData(false);
            return;
          }
          setCursor(c);
          setData((prevData) => [...prevData, ...moreData]);
        })
        .catch((err) => {
          setLoading(false);
          message.error(err.message);
        });
    }
  };

  return (
    <>
      <List
        loading={initialLoading}
        itemLayout={isMobile ? 'vertical' : 'horizontal'}
        size={'small'}
        dataSource={data}
        renderItem={(item) => (
          <ApplicationListRecord
            key={item.id}
            {...item}
            solutionName={solution.name}
            InstallButton={InstallButton}
            developerApplicationsUrlGenerator={
              developerApplicationsUrlGenerator
            }
            onDispatchDeveloper={onDispatchDeveloper}
            onResetDeveloperDispatch={onResetDeveloperDispatch}
          />
        )}
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
              {solutionUrlGenerator && (
                <Button
                  size={'small'}
                  shape={'round'}
                  type={'link'}
                  href={solutionUrlGenerator(solution.id)}
                  icon={<LinkOutlined />}
                >
                  Load More
                </Button>
              )}

              {onLoadMoreApplications && hasMoreData && (
                <Button
                  disabled={loading}
                  shape={'round'}
                  type={'primary'}
                  icon={loading ? <LoadingOutlined /> : <DownloadOutlined />}
                  onClick={onLoadMore}
                >
                  {!loading && 'Load More'}
                  {loading && 'Loading...'}
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
