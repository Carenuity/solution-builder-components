import { Popover } from 'antd';
import React from 'react';
import ActionButton from '../ActionButton';
import { CommentOutlined, MessageFilled } from '@ant-design/icons';
import { ApplicationReviewsProps } from './index.types';

const ApplicationReviews: React.FC<ApplicationReviewsProps> = ({
  hasReviewed,
  reviews,
  tag,
}) => {
  return (
    <>
      <Popover
        title={`${tag} Reviews`}
        content={
          <div>{reviews?.map((review, i) => <p key={i}>{review}</p>)}</div>
        }
      >
        <ActionButton
          icon={<CommentOutlined />}
          actionedIcon={<MessageFilled />}
          hasActioned={hasReviewed}
          title={'Reviews'}
        />
      </Popover>
    </>
  );
};

export default ApplicationReviews;
