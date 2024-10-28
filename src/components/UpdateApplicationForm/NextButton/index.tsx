import { Button, ButtonProps } from 'antd';
import React, { PropsWithRef, useContext } from 'react';
import { UpdateApplicationContext } from '../UpdateApplicationProvider';

// type ForwardedButtonProps<T> = {
//   ref: React.RefObject<T>;
// } & Omit<ButtonProps, 'ref'>;

const NextButton = React.forwardRef<
  HTMLButtonElement,
  PropsWithRef<ButtonProps>
>((props, ref) => {
  const { state } = useContext(UpdateApplicationContext);

  return (
    <>
      <Button {...props} ref={ref} type="primary" disabled={!state.canProceed}>
        Next
      </Button>
    </>
  );
});

export default NextButton;
