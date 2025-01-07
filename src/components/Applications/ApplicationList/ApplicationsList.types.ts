import { ApplicationListRecordProps } from './components/ApplicationListRecord/index.types';

export type ApplicationData = Omit<
  ApplicationListRecordProps,
  'InstallButton' | 'solutionName'
>;
type ApplicationInstallButton = Omit<
  ApplicationListRecordProps,
  keyof ApplicationData | 'solutionName'
>;

export type LoadApplicationsFunction = (
  solutionId: string,
  options: {
    signal?: AbortSignal;
    limit: number;
    // offset?: { page: number; lastItem: { id: string } };
    cursor?: string;
  }
) => Promise<{ cursor?: string; data: ApplicationData[] }>;

export type ApplicationsListProps = ApplicationInstallButton & {
  solution: { id: string; name?: string };
  limit: number;
  generateSolutionPageUrl?: (solutionId: string) => string;
  onInitialApplicationsLoad: LoadApplicationsFunction;
  onLoadMoreApplications?: LoadApplicationsFunction;
};
