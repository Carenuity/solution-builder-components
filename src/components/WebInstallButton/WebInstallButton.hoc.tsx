import React, { PropsWithRef, useRef } from 'react';
import { Button, ButtonProps } from 'antd';
import {
  DownloadOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
} from '@ant-design/icons';
import { InstallButton } from 'esp-web-tools';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'esp-web-install-button': unknown;
    }
  }
}

interface EspWebInstallButtonProps extends ButtonProps {
  manifest: string;
}

const WebInstallButtonHoc = () => {
  const unsupportedButtonRef = useRef<HTMLButtonElement>(null);
  const notAllowedButtonRef = useRef<HTMLButtonElement>(null);

  try {
    if (!customElements.get('esp-web-install-button')) {
      customElements.define('esp-web-install-button', InstallButton);
    }
  } catch (error) {
    console.error(error);
  }

  const Index = React.forwardRef<
    HTMLButtonElement,
    PropsWithRef<EspWebInstallButtonProps>
  >((props, ref) => (
    <>
      <esp-web-install-button manifest={props.manifest}>
        <Button
          ref={ref}
          title="Install"
          color={'primary'}
          variant={'solid'}
          icon={<DownloadOutlined />}
          {...props}
          slot="activate"
        />
        {/* <button
            ref={ref}
            title="Install"
            type="button"
            style={{ transition: 'all 0.2s ease-in-out' }}
            className={
              'btn btn-sm btn-success rounded-pill px-3 text-center w-100'
            }
            slot="activate"
          >
            {children && children}
            {!children && (
              <>
                <i className="bi bi-download me-md-2"></i>
                <span className="d-none d-md-inline-block">Install</span>
              </>
            )}
          </button> */}
        <Button
          ref={unsupportedButtonRef}
          color={'default'}
          variant={'solid'}
          title="Use Microsoft Edge or Chrome Desktop Browser"
          icon={<ExclamationCircleOutlined />}
          {...props}
          slot="unsupported"
        />
        {/* <button
            ref={unsupportedButtonRef}
            type="button"
            title="Use Microsoft Edge or Chrome Desktop Browser"
            className="btn text-dark btn-sm btn-warning rounded-pill px-3 text-center w-100 d-flex justify-content-center"
            slot="unsupported"
          >
            <i className="bi bi-exclamation-triangle-fill me-md-2"></i>
            <span className="d-none d-md-inline-block text-nowrap">
              Unsupported Browser
            </span>
          </button> */}
        <Button
          ref={notAllowedButtonRef}
          icon={<StopOutlined />}
          color={'danger'}
          variant={'solid'}
          title="Operation Not Allowed"
          {...props}
          slot="not-allowed"
        />
        {/* <button
            ref={notAllowedButtonRef}
            type="button"
            className="btn text-dark btn-sm btn-danger rounded-pill px-3 text-center w-100"
            slot="not-allowed"
          >
            <i className="bi bi-dash-circle-fill me-md-2"></i>
            <span className="d-none d-md-inline-block">Not Allowed</span>
          </button> */}
      </esp-web-install-button>
    </>
  ));
  return {
    InstallButton: Index,
    NotAllowedButtonRef: notAllowedButtonRef,
    UnsupportedButtonRef: unsupportedButtonRef,
  };
};

export default WebInstallButtonHoc;
