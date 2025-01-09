import { ReactNode } from 'react';

export interface SolutionShareTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type ShareButtonProps = {
  id: string;
  name: string;
  generateSolutionPageUrl?: (solutionId: string) => string;
  generateEmbedding?: (solutionId: string) => string;
};
