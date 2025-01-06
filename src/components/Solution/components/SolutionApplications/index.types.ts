import { ApplicationsListProps } from '../../../Applications/ApplicationList/ApplicationsList.types';

export type SolutionApplicationsProps = Omit<
  ApplicationsListProps,
  'solutionId'
> & {
  id: string;
  applicationsViewport: { height: number };
  generateCreateApplicationUrl?: (solutionId: string) => string;
};
