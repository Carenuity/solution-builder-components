import {
  DownloadOutlined,
  LinkOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Button, List, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution/Solution.constants';
import ApplicationListRecord from './components/ApplicationListRecord';
import {
  ApplicationData,
  ApplicationsListProps,
} from './ApplicationsList.types';

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  solutionId,
  limit,
  InstallButton,
  generateSolutionPageUrl,
  onInitialApplicationsLoad,
  onLoadMoreApplications,
}) => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);
  const [initialLoading, setInitialLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [data, setData] = useState<ApplicationData[]>([]);

  const controller = new AbortController();

  useEffect(() => {
    if (!window.document) return;

    onInitialApplicationsLoad(solutionId, { signal: controller.signal, limit })
      .then((_initialData) => {
        setInitialLoading(false);
        setData(_initialData);
        setPage((prevPageNumber) => (prevPageNumber += 1));
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [lastApplicationItem, ..._] = [...data].reverse();
      setLoading(true);
      onLoadMoreApplications(solutionId, {
        signal: controller.signal,
        limit,
        offset: { page, lastItem: { id: lastApplicationItem.id } },
      })
        .then((moreData) => {
          setLoading(false);
          if (moreData.length === 0) {
            setHasMoreData(false);
            return;
          }
          setPage((prevPageNumber) => (prevPageNumber += 1));
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
            InstallButton={InstallButton}
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
              {generateSolutionPageUrl && (
                <Button
                  size={'small'}
                  shape={'round'}
                  type={'link'}
                  href={generateSolutionPageUrl(solutionId)}
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
