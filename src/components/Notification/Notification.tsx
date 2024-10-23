import { notification } from 'antd';
import { INotification } from './Notification.types';

const useSbNotification = (): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  (notification: INotification) => void,
] => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = ({
    description,
    message,
    type,
  }: INotification) => {
    api[type]({
      message,
      description,
      showProgress: true,
      pauseOnHover: true,
    });
  };

  return [contextHolder, openNotificationWithIcon];
};

export default useSbNotification;
