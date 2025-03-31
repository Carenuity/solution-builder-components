import { Divider, List, message } from 'antd';
import React, { PropsWithRef, useEffect, useRef, useState } from 'react';
import {
  SolutionGroupData,
  SolutionGroupListContainer,
} from './SolutionGroupList.types';
import SolutionGroup from '../SolutionGroup/SolutionGroup';
import InfiniteScroll from 'react-infinite-scroll-component';
import SolutionGroupSkeleton from '../skeletons/SolutionGroupSkeleton';

const SolutionGroupList = React.forwardRef<
  HTMLDivElement,
  PropsWithRef<SolutionGroupListContainer>
>(
  (
    {
      onLoadMoreSolutionGroups,
      InstallButton,
      defaultView,
      limit,
      refresh,
      canLoadMore,
      isEmbedding,
      createApplicationUrlGenerator,
      developerApplicationsUrlGenerator,
      embeddingGenerator,
      fallbackImage,
      manufacturerSolutionsUrlGenerator,
      onDispatchDeveloper,
      onLoadMoreApplications,
      onResetDeveloperDispatch,
      solutionUrlGenerator,
      tagUrlGenerator,
      ...divProps
    },
    ref
  ) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SolutionGroupData[]>([]);
    const [hasMoreData, setHasMoreData] = useState(true);
    const loadMoreControllerRef = useRef<AbortController>();

    const solutionGroupProps = {
      InstallButton,
      defaultView,
      limit,
      canLoadMore,
      isEmbedding,
      createApplicationUrlGenerator,
      developerApplicationsUrlGenerator,
      embeddingGenerator,
      fallbackImage,
      manufacturerSolutionsUrlGenerator,
      onDispatchDeveloper,
      onLoadMoreApplications,
      onResetDeveloperDispatch,
      solutionUrlGenerator,
      tagUrlGenerator,
    };

    const loadMoreData = async ({
      hasRefreshed,
      signal,
    }: {
      hasRefreshed?: boolean;
      signal?: AbortSignal;
    }) => {
      if (loading) {
        return;
      }
      setLoading(true);

      try {
        const _data = await onLoadMoreSolutionGroups({
          limit: solutionGroupProps.limit,
          signal,
        });

        if (_data.length < solutionGroupProps.limit || _data.length === 0) {
          setHasMoreData(false);
        } else if (!hasMoreData && _data.length >= solutionGroupProps.limit) {
          setHasMoreData(true);
        }

        if (!hasRefreshed) {
          setData((old) => [...old, ..._data]);
        } else {
          setData(() => _data);
        }

        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        message.error(err.message);
        setLoading(false);
      }
    };

    useEffect(() => {
      if (!window.document) return;

      const controller = new AbortController();

      const timeoutId = setTimeout(() => {
        loadMoreData({ signal: controller.signal }).then(() => {
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
      if (!window.document || !refresh) return;

      const controller = new AbortController();
      setInitialLoading(true);

      const timeoutId = setTimeout(() => {
        loadMoreData({ hasRefreshed: true, signal: controller.signal }).then(
          () => {
            setInitialLoading(false);
          }
        );
      }, 0);

      return () => {
        controller.abort();
        clearTimeout(timeoutId);
      };
    }, [refresh]);

    return (
      <>
        <div
          ref={ref}
          {...divProps}
          id="scrollableDiv"
          style={{
            ...divProps.style,
            height: divProps.style?.height || '100vh',
            overflow: 'auto',
            // padding: '0 16px',
            // border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={() => {
              loadMoreControllerRef.current = new AbortController();
              loadMoreData({ signal: loadMoreControllerRef.current.signal });
            }}
            hasMore={hasMoreData}
            loader={!initialLoading && <SolutionGroupSkeleton />}
            endMessage={
              <Divider plain>
                Need more? Describe the use case and request yours{' '}
                <a
                  href={
                    'mailto:max.mergenthaler@chipglobe.com?subject=Request%20Solution%20Group&body=I%20would%20like%20to%20'
                  }
                >
                  for free
                </a>
                .
              </Divider>
            }
            scrollableTarget="scrollableDiv"
          >
            <List
              loading={initialLoading}
              size={'small'}
              dataSource={data}
              renderItem={(item) => (
                <>
                  <List.Item>
                    <SolutionGroup {...item} {...solutionGroupProps} />
                  </List.Item>
                </>
              )}
            />
          </InfiniteScroll>
        </div>
      </>
    );
  }
);

export default SolutionGroupList;
