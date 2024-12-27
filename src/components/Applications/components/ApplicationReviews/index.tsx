import { Popover } from 'antd';
import React from 'react';
import ActionButton from '../ActionButton';
import { CommentOutlined, MessageFilled } from '@ant-design/icons';

const ApplicationReviews = () => {
  return (
    <>
      <Popover
        title={'Application version-1 Reviews'}
        content={<div>Reviews list here coming soon..!</div>}
      >
        <ActionButton
          count={2}
          icon={<CommentOutlined />}
          actionedIcon={<MessageFilled />}
          hasActioned={false}
          title={'Reviews'}
        />
      </Popover>
    </>
  );
};

export default ApplicationReviews;
