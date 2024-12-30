import { Popover } from 'antd';
import React from 'react';
import ActionButton from '../ActionButton';
import { ReadOutlined } from '@ant-design/icons';
import { ApplicationDescriptionProps } from './index.types';

const ApplicationDescription: React.FC<ApplicationDescriptionProps> = ({
  description,
}) => {
  return (
    <>
      <Popover title={'Description'} content={<div>{description}</div>}>
        <ActionButton icon={<ReadOutlined />} title={'Description'} />
      </Popover>
    </>
  );
};

export default ApplicationDescription;
