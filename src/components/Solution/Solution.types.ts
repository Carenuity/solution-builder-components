import { ReactNode } from 'react';
import { SolutionPreviewProps } from './components/SolutionPreview/index.types';
import { SolutionImageProps } from './components/SolutionImage/index.types';
import { SolutionApplicationsProps } from './components/SolutionApplications/index.types';
import { SolutionDescriptionProps } from './components/SolutionDescription/index.types';

export interface SolutionTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type SolutionProps = Omit<SolutionPreviewProps, 'viewport'> &
  SolutionImageProps &
  Omit<SolutionApplicationsProps, 'applicationsViewport'> &
  Omit<SolutionDescriptionProps, 'viewport'> & {
    defaultView: 'preview' | 'install-for-free' | 'more';
  };

export type SolutionViewport = {
  applicationsView?: { height: number };
  preview?: { height: number };
  more?: { height: number };
};
