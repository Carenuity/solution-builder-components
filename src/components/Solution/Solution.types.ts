import { ReactNode } from 'react';
import { SolutionPreviewProps } from './components/SolutionPreview/index.types';
import { SolutionImageProps } from './components/SolutionImage/index.types';
import { SolutionApplicationsProps } from './components/SolutionApplications/index.types';

export interface SolutionTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type SolutionProps = Omit<SolutionPreviewProps, 'viewport'> &
  SolutionImageProps &
  Omit<SolutionApplicationsProps, 'applicationsViewport'> & {
    defaultView: 'preview' | 'install-for-free' | 'more';
  };

export type SolutionViewport = {
  applicationsView?: { height: number };
  preview?: { height: number };
};
