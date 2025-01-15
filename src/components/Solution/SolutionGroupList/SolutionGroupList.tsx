import { List } from 'antd';
import React, { useState } from 'react';
import {
  SolutionGroupData,
  SolutionGroupListHocProps,
} from './SolutionGroupList.types';
import SolutionGroup from '../SolutionGroup/SolutionGroup';

const SolutionGroupListHoc = ({
  ...solutionGroupProps
}: SolutionGroupListHocProps) => {
  const [data, setData] = useState<SolutionGroupData[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  const SolutionGroupList = () => {
    return (
      <>
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
      </>
    );
  };

  return { SolutionGroupList, setData, setInitialLoading };
};

export default SolutionGroupListHoc;
