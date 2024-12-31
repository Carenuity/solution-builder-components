import { ReactNode } from 'react';
import { SolutionPreviewProps } from './components/SolutionPreview/index.types';
import { SolutionImageProps } from './components/SolutionImage/index.types';
import { SolutionApplicationsProps } from './components/SolutionApplications/index.types';

export interface SolutionTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type SolutionProps = SolutionPreviewProps &
  SolutionImageProps &
  SolutionApplicationsProps & {
    defaultView: 'preview' | 'install-for-free' | 'more';
  };
