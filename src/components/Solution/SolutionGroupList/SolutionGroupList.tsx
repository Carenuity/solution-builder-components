import { Divider, List, message, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  SolutionGroupData,
  SolutionGroupListHocProps,
} from './SolutionGroupList.types';
import SolutionGroup from '../SolutionGroup/SolutionGroup';
import InfiniteScroll from 'react-infinite-scroll-component';

const SolutionGroupListHoc = ({
  onLoadMoreSolutionGroups,
  ...solutionGroupProps
}: SolutionGroupListHocProps) => {
  const SolutionGroupList = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SolutionGroupData[]>([]);
    const [hasMoreData, setHasMoreData] = useState(true);

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

        if (_data.length === 0) {
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
          id="scrollableDiv"
          style={{
            height: '100vh', // 400,
            overflow: 'auto',
            padding: '0 16px',
            border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={hasMoreData}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              loading={initialLoading}
              // itemLayout={isMobile ? 'vertical' : 'horizontal'}
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
  };

  return { SolutionGroupList };
};

export default SolutionGroupListHoc;
