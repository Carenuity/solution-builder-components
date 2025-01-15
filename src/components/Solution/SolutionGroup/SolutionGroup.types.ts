import { ReactNode } from 'react';
import { SolutionGroupApplicationsProps } from './components/SolutionGroupApplications/index.types';
import { SolutionGroupDescriptionProps } from './components/SolutionGroupDescription/index.types';
import { SolutionGroupImageProps } from './components/SolutionGroupImage/index.types';
import { SolutionGroupPreviewProps } from './components/SolutionGroupPreview/index.types';

export interface SolutionGroupTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type SolutionGroupView = 'preview' | 'install-for-free' | 'more';

export type SolutionGroupProps = Omit<SolutionGroupPreviewProps, 'viewport'> &
  SolutionGroupImageProps &
  Omit<SolutionGroupApplicationsProps, 'applicationsViewport'> &
  Omit<SolutionGroupDescriptionProps, 'viewport'> & {
    defaultView: SolutionGroupView;
  };

export type SolutionGroupViewport = {
  applicationsView?: { height: number };
  preview?: { height: number };
  more?: { height: number };
};
