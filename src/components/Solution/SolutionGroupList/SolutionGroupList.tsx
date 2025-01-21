import { Divider, List, message } from 'antd';
import React, { PropsWithRef, useEffect, useState } from 'react';
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
      onInitialApplicationsLoad,
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

    const solutionGroupProps = {
      InstallButton,
      defaultView,
      limit,
      onInitialApplicationsLoad,
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

    const abortController = new AbortController();

    const loadMoreData = async () => {
      if (loading) {
        return;
      }
      setLoading(true);

      try {
        const _data = await onLoadMoreSolutionGroups({
          signal: abortController.signal,
          limit: solutionGroupProps.limit,
        });

        if (_data.length < solutionGroupProps.limit || _data.length === 0) {
          setHasMoreData(false);
        }

        setData((old) => [...old, ..._data]);
        setLoading(false);
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        message.error(err.message);
        setLoading(false);
      }
    };

    useEffect(() => {
      loadMoreData().then(() => {
        setInitialLoading(false);
      });

      return () => {
        abortController.abort();
      };
    }, []);

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
            next={loadMoreData}
            hasMore={hasMoreData}
            loader={!initialLoading && <SolutionGroupSkeleton />}
            endMessage={
              <Divider plain>
                That's all. Couldn't find your solution group? Request it{' '}
                <a
                  href={
                    'mailto:max.mergenthaler@chipglobe.com?subject=Request%20Solution%20Group&body=I%20would%20like%20to%20'
                  }
                >
                  here
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
