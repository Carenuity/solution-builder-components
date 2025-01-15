import { ReactNode } from 'react';

export interface SolutionShareTab {
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export type ISolutionGroupInfoGenerator = (solutionId: string) => string;

export type ShareButtonProps = {
  id: string;
  name: string;
  solutionUrlGenerator?: ISolutionGroupInfoGenerator;
  embeddingGenerator?: ISolutionGroupInfoGenerator;
};
