import {
  DownloadOutlined,
  LinkOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Button, Divider, List, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useScreenSize } from '../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution/SolutionGroup/SolutionGroup.constants';
import {
  ApplicationData,
  ApplicationsListProps,
} from './ApplicationsList.types';
import ApplicationListRecord from './components/ApplicationListRecord';
import Link from 'next/link';
import './ApplicationsList.css';

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  solution,
  limit,
  solutionUrlGenerator,
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
  const loadMoreControllerRef = useRef<AbortController>();

  useEffect(() => {
    if (!window.document) return;

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      onLoadMoreApplications(solution.id, { signal: controller.signal, limit })
        .then(({ cursor: c, data: _initialData }) => {
          setInitialLoading(false);
          setData(_initialData);
          setCursor(c);
        })
        .catch((err) => {
          setInitialLoading(false);
          message.error(err.message);
        });
    }, 0);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
      loadMoreControllerRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    setIsMobile(width < screenThreshold);
  }, [width]);

  const onLoadMore = () => {
    if (onLoadMoreApplications) {
      setLoading(true);
      loadMoreControllerRef.current = new AbortController();

      onLoadMoreApplications(solution.id, {
        signal: loadMoreControllerRef.current.signal,
        limit,
        cursor,
      })
        .then(({ cursor: c, data: moreData }) => {
          setLoading(false);
          setCursor(c);
          setData((prevData) => [...prevData, ...moreData]);

          if (moreData.length < limit || moreData.length === 0) {
            setHasMoreData(false);
            return;
          }
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
            {data.length > 0 && (
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 12,
                  height: 32,
                  lineHeight: '32px',
                }}
              >
                {solutionUrlGenerator && (
                  <Link
                    href={solutionUrlGenerator(solution.id)}
                    className={'solution-link'}
                  >
                    <LinkOutlined style={{ marginRight: '.3rem' }} />
                    Load More
                  </Link>
                )}

                {!solutionUrlGenerator && hasMoreData && (
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

                {!hasMoreData && (
                  <Divider plain>
                    That's all! Request application{' '}
                    <a
                      href={
                        'mailto:max.mergenthaler@chipglobe.com?subject=Request%20Solution%20Group&body=I%20would%20like%20to%20'
                      }
                    >
                      here
                    </a>
                    .
                  </Divider>
                )}
              </div>
            )}
          </>
        }
      />
    </>
  );
};

export default ApplicationsList;
