import { Popover } from 'antd';
import React from 'react';
import ActionButton from '../ActionButton';
import { ReadOutlined } from '@ant-design/icons';

const ApplicationDescription = () => {
  return (
    <>
      <Popover
        title={'Description'}
        content={
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil,
            veritatis? Voluptate omnis animi eaque tenetur sunt deserunt magni
            adipisci incidunt!
          </div>
        }
      >
        <ActionButton icon={<ReadOutlined />} title={'Description'} />
      </Popover>
    </>
  );
};

export default ApplicationDescription;
