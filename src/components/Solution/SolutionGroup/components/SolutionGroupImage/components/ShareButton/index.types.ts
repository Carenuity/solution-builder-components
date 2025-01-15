import { ReactNode } from 'react';

export interface SolutionShareTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type ShareButtonProps = {
  id: string;
  name: string;
  solutionUrlGenerator?: (solutionId: string) => string;
  embeddingGenerator?: (solutionId: string) => string;
};
