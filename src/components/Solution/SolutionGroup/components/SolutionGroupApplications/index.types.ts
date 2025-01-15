import { ApplicationsListProps } from '../../../../Applications/ApplicationList/ApplicationsList.types';

export type SolutionGroupApplicationsProps = Omit<
  ApplicationsListProps,
  'solution'
> & {
  id: string;
  name: string;
  applicationsViewport: { height: number };
  createApplicationUrlGenerator?: (solutionId: string) => string;
};
