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
import { useTheme } from 'antd-style';

const ApplicationsList: React.FC<ApplicationsListProps> = ({
  solution,
  limit,
  label,
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
  const style = useTheme();

  const onLoadMore = async ({ signal }: { signal?: AbortSignal }) => {
    try {
      const { cursor: c, data: moreData } = await onLoadMoreApplications(
        solution.id,
        {
          signal,
          limit,
          cursor,
        }
      );

      setData((prevData) => [...prevData, ...moreData]);
      setCursor(c);

      if (moreData.length < limit || moreData.length === 0) {
        setHasMoreData(false);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (!window.document) return;

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      onLoadMoreApplications(solution.id, { signal: controller.signal, limit });
      onLoadMore({ signal: controller.signal })
        .then(() => {
          setInitialLoading(false);
        })
        .catch(() => {
          setInitialLoading(false);
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
            label={label}
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
                    style={{ color: style.colorPrimary }}
                    // className={'solution-link'}
                  >
                    <LinkOutlined style={{ marginRight: '.2rem' }} />
                    Load More
                  </Link>
                )}

                {!solutionUrlGenerator && hasMoreData && (
                  <Button
                    disabled={loading}
                    shape={'round'}
                    type={'primary'}
                    icon={loading ? <LoadingOutlined /> : <DownloadOutlined />}
                    onClick={() => {
                      setLoading(true);
                      loadMoreControllerRef.current = new AbortController();

                      onLoadMore({
                        signal: loadMoreControllerRef.current.signal,
                      })
                        .then(() => {
                          setLoading(false);
                        })
                        .catch(() => {
                          setLoading(false);
                        });
                    }}
                  >
                    {!loading && 'Load More'}
                    {loading && 'Loading...'}
                  </Button>
                )}

                {!hasMoreData && !solutionUrlGenerator && (
                  <Divider plain>
                    Need more? Just drop your request for a new application{' '}
                    <a
                      href={
                        'mailto:max.mergenthaler@chipglobe.com?subject=Request%20Solution%20Group&body=I%20would%20like%20to%20'
                      }
                    >
                      for free
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
