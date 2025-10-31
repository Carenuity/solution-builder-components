import { Button, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { handleUpdateApplication } from './index.utils';
import { IUpdateButton } from './index.types';
import useSbNotification from '../../Notification';
import { UpdateApplicationContext } from '../UpdateApplicationProvider';

const UpdateButton: React.FC<IUpdateButton> = ({ accessToken, id }) => {
  const { state, dispatch } = useContext(UpdateApplicationContext);
  const [context, openNotification] = useSbNotification();
  const [isDisabled, setIsDisabled] = useState(!state.canProceed);

  const abortController = new AbortController();
  const signal = abortController.signal;
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [state]);

  return (
    <>
      {context}
      <Button
        type={isDisabled ? 'dashed' : 'primary'}
        disabled={isDisabled}
        onClick={() => {
          timeoutId = setTimeout(async () => {
            setIsDisabled(true);
            try {
              const response = await handleUpdateApplication({
                signal,
                id,
                access_token: accessToken,
                binaries: state.binaries,
              });
              dispatch({ category: 'proceed', type: 'UNSET' });
              openNotification({
                message: 'Application successfully updated',
                description: `Tag: ${response?.tag}`,
                type: 'success',
              });
            } catch (error) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const err = error as any;
              openNotification({
                message: err.message,
                type: 'error',
              });
            }
            setIsDisabled(false);
          }, 0);
        }}
      >
        {isDisabled && <Spin size="small" />}
        Update
      </Button>
    </>
  );
};

export default UpdateButton;
