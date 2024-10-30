import { Button, Spin } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { handleUpdateApplication } from './index.utils';
import { IUpdateButton } from './index.types';
import useSbNotification from '../../Notification';
import { ChipFamily } from '../../../utils/types.utils';
import { UpdateApplicationContext } from '../UpdateApplicationProvider';

const UpdateButton: React.FC<IUpdateButton> = ({ accessToken, id }) => {
  const { state, dispatch } = useContext(UpdateApplicationContext);
  const [chipFamily, setChipFamily] = useState<ChipFamily>();
  const [context, openNotification] = useSbNotification();
  const [isDisabled, setIsDisabled] = useState(!state.canProceed);

  const abortController = new AbortController();
  const signal = abortController.signal;
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    setChipFamily(state.chipFamily);

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
                'Unable to detect the chip family for this application! Contact the administrator for help',
              type: 'error',
            });
            return;
          }

          timeoutId = setTimeout(async () => {
            setIsDisabled(true);
            try {
              const response = await handleUpdateApplication({
                signal,
                id,
                tag: state.tag,
                access_token: accessToken,
                application_id: state.application?.id,
                ecosystem_id: state.ecosystem?.id,
                repository: state.repository,
                chip_family: chipFamily,
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
