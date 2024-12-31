import { ApplicationsListProps } from '../../../Applications/ApplicationList/ApplicationsList.types';

export type SolutionApplicationsProps = Omit<
  ApplicationsListProps,
  'solutionId'
> & {
  id: string;
  generateCreateApplicationUrl?: (solutionId: string) => string;
};
