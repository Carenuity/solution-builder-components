import { Button, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { CreateApplicationContext } from '../CreateApplicationProvider';
import { handleCreateApplication } from './index.utils';
import { ChipFamily, ICreateButton } from './index.types';
import useSbNotification from '../../Notification';

const CreateButton: React.FC<ICreateButton> = ({ accessToken }) => {
  const { state, dispatch } = useContext(CreateApplicationContext);
  const [chipFamily, setChipFamily] = useState<ChipFamily>();
  const [context, openNotification] = useSbNotification();
  const [isDisabled, setIsDisabled] = useState(!state.canProceed);

  const abortController = new AbortController();
  const signal = abortController.signal;
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    const boardName = state.microcontroller?.name;
    if (boardName) {
      if (boardName.includes('D1')) {
        setChipFamily('ESP8266');
      } else if (boardName.includes('C3')) {
        setChipFamily('ESP32-C3');
      } else if (boardName.trim() === 'ESP32' || boardName.includes('ESP32')) {
        setChipFamily('ESP32');
      } else {
        setChipFamily(undefined);
      }
    }

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
          if (!chipFamily) {
            openNotification({
              message:
                'Please specify the microcontroller your application uses! Return to step 1',
              type: 'error',
            });
            return;
          }

          timeoutId = setTimeout(async () => {
            setIsDisabled(true);
            try {
              const response = await handleCreateApplication({
                signal,
                access_token: accessToken,
                application_id: state.application?.id,
                ecosystem_id: state.ecosystem?.id,
                solution_id: state.solution?.id,
                repository: state.repository,
                chip_family: chipFamily,
                binaries: state.binaries,
              });
              dispatch({ category: 'proceed', type: 'UNSET' });
              openNotification({
                message: 'Application successfully created',
                description: `Repository: ${response?.repository}`,
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
        Create
      </Button>
    </>
  );
};

export default CreateButton;
