import { ReactNode } from 'react';
import { SolutionPreviewProps } from './components/SolutionPreview/index.types';
import { SolutionImageProps } from './components/SolutionImage/index.types';

export interface SolutionTab {
  label: string;
  //   key: string;
  icon: ReactNode;
  content: ReactNode;
}

export type SolutionProps = SolutionPreviewProps & SolutionImageProps;
