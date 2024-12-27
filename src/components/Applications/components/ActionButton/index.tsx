import { Button } from 'antd';
import React, { PropsWithRef } from 'react';
import { DynamicActionItemProps } from './index.types';

const ActionButton = React.forwardRef<
  HTMLButtonElement,
  PropsWithRef<DynamicActionItemProps>
>(({ actionedIcon, count, hasActioned, icon, title, ...otherProps }, ref) => {
  return (
    <>
      <Button
        ref={ref}
        title={title}
        type={'text'}
        size={'small'}
        icon={!hasActioned ? icon : actionedIcon}
        style={{ color: 'rgba(0,0,0,0.45)' }}
        {...otherProps}
      >
        {count}
      </Button>
    </>
  );
});

export default ActionButton;
