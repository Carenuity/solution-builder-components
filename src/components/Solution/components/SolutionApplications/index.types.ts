import { ApplicationsListProps } from '../../../Applications/ApplicationList/ApplicationsList.types';

export type SolutionApplicationsProps = Omit<
  ApplicationsListProps,
  'solution'
> & {
  id: string;
  name: string;
  applicationsViewport: { height: number };
  createApplicationUrlGenerator?: (solutionId: string) => string;
};
