import { Space } from 'antd';
import React from 'react';
import { ActionTextProps } from './index.types';

const ActionText: React.FC<ActionTextProps> = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export default ActionText;
