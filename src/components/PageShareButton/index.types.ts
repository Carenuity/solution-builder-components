import { ReactNode } from 'react';

export interface PageShareTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type PageShareButtonProps = {
  name: string;
  url: string;
};
