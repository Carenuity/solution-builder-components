import { ApplicationsListProps } from '../../../../Applications/ApplicationList/ApplicationsList.types';

export type ICreateApplicationUrlGenerator = (solutionId: string) => string;

export type SolutionGroupApplicationsProps = Omit<
  ApplicationsListProps,
  'solution'
> & {
  id: string;
  name: string;
  applicationsViewport: { height: number };
  createApplicationUrlGenerator?: ICreateApplicationUrlGenerator;
};
