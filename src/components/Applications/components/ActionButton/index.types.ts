import { ButtonProps } from 'antd';
import { ReactNode } from 'react';

export interface DynamicActionItemProps extends ButtonProps {
  hasActioned?: boolean;
  count?: number;
  //   icon: ReactNode;
  actionedIcon?: ReactNode;
  //   title?: string;
}
