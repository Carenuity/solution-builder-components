import { Button, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { CreateApplicationContext } from '../CreateApplicationProvider';
import { handleCreateApplication } from './index.utils';
import { ChipFamily, ICreateButton } from './index.types';

const CreateButton: React.FC<ICreateButton> = ({ accessToken }) => {
  const { state } = useContext(CreateApplicationContext);
  const [chipFamily, setChipFamily] = useState<ChipFamily>();

  const abortController = new AbortController();
  const signal = abortController.signal;
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    // console.log('main binary: ', state.binaries?.main);
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
      <Button
        type="primary"
        onClick={() => {
          if (!chipFamily) {
            message.error(
              'Please specify the microcontroller your application uses! Return to step 1'
            );
            return;
          }
          timeoutId = setTimeout(async () => {
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
            } catch (error) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const err = error as any;
              message.error(err.message);
            }
          }, 0);
        }}
      >
        Create
      </Button>
    </>
  );
};

export default CreateButton;
