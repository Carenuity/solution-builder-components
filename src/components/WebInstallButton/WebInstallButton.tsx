import React from 'react';
import WebInstallButtonHoc from './WebInstallButton.hoc';

const WebInstallButton = () => {
  const { InstallButton } = WebInstallButtonHoc();

  return (
    <>
      <InstallButton manifest={''} shape={'round'} type={'primary'}>
        Install
      </InstallButton>
    </>
  );
};

export default WebInstallButton;
