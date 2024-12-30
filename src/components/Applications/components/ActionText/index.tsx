import { Space } from 'antd';
import React, { PropsWithRef } from 'react';
import { ActionTextProps } from './index.types';

const ActionText = React.forwardRef<
  HTMLDivElement,
  PropsWithRef<ActionTextProps>
>(({ icon, text, ...props }, ref) => (
  <Space ref={ref} style={{ color: 'rgba(0,0,0,0.45)' }} {...props}>
    {React.createElement(icon)}
    {text}
  </Space>
));

export default ActionText;
