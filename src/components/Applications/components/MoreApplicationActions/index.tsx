import { Flex, Popover } from 'antd';
import React from 'react';
import ActionButton from '../ActionButton';
import { MoreOutlined } from '@ant-design/icons';
import { MoreApplicationActionsProps } from './index.types';

const MoreApplicationActions: React.FC<MoreApplicationActionsProps> = ({
  actions,
}) => {
  return (
    <>
      <Popover
        content={<Flex vertical={true}>{actions.map((action) => action)}</Flex>}
      >
        <ActionButton icon={<MoreOutlined />} />
      </Popover>
    </>
  );
};

export default MoreApplicationActions;
