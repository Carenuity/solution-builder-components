import { ReactNode } from 'react';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type INotification = {
  type: NotificationType;
  message: ReactNode;
  description?: ReactNode;
};
