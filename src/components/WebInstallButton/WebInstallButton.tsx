import React, { PropsWithRef } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { EspWebInstallButtonProps } from '../MyApplications/MyApplications.types';

export const FlashButtonHOC = () => {
  // const unsupportedButtonRef = useRef<HTMLButtonElement>(null);
  // const notAllowedButtonRef = useRef<HTMLButtonElement>(null);

  const Index = React.forwardRef<
    HTMLButtonElement,
    PropsWithRef<EspWebInstallButtonProps>
  >((props, ref) => (
    <>
      <Button
        ref={ref}
        title="Install"
        color={'primary'}
        variant={'solid'}
        icon={<DownloadOutlined />}
        {...props}
        slot="activate"
      />
      {/* <Button
        ref={unsupportedButtonRef}
        color={'default'}
        variant={'solid'}
        title="Use Microsoft Edge or Chrome Desktop Browser"
        icon={<ExclamationCircleOutlined />}
        {...props}
        slot="unsupported"
      />
      <Button
        ref={notAllowedButtonRef}
        icon={<StopOutlined />}
        color={'danger'}
        variant={'solid'}
        title="Operation Not Allowed"
        {...props}
        slot="not-allowed"
      /> */}
    </>
  ));

  return {
    InstallButton: Index,
  };
};

const WebInstallButton = () => {
  const { InstallButton } = FlashButtonHOC();

  return (
    <>
      <InstallButton manifest={''} shape={'round'} type={'primary'}>
        Install
      </InstallButton>
    </>
  );
};

export default WebInstallButton;
