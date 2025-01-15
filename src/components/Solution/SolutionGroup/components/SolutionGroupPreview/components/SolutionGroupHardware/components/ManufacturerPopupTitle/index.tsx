import { Divider, Typography } from 'antd';
import React from 'react';
import { ManufacturerPopupTitleProps } from './index.types';

const { Text } = Typography;

const ManufacturerPopupTitle: React.FC<ManufacturerPopupTitleProps> = ({
  shieldName,
  type,
}) => {
  return (
    <>
      <Text ellipsis style={{ maxWidth: '12rem' }}>
        {shieldName} Manufacturer
      </Text>{' '}
      <Divider type={'vertical'} />{' '}
      <Text
        type={'secondary'}
        style={{ maxWidth: '7rem', fontSize: '.75rem' }}
        ellipsis
      >
        {type === 'sensor' && 'Sensor'}
        {type === 'micro-controller' && 'Micro-Controller'}
        {type === 'actuator' && 'Actuator'}
      </Text>
    </>
  );
};

export default ManufacturerPopupTitle;
