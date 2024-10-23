import { Button, ButtonProps } from 'antd';
import React, { PropsWithRef, useContext } from 'react';
import { CreateApplicationContext } from '../CreateApplicationProvider';

// type ForwardedButtonProps<T> = {
//   ref: React.RefObject<T>;
// } & Omit<ButtonProps, 'ref'>;

const NextButton = React.forwardRef<
  HTMLButtonElement,
  PropsWithRef<ButtonProps>
>((props, ref) => {
  const { state } = useContext(CreateApplicationContext);

  return (
    <>
      <Button {...props} ref={ref} type="primary" disabled={!state.canProceed}>
        Next
      </Button>
    </>
  );
});

export default NextButton;
