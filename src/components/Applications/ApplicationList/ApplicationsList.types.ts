import { ISolutionGroupInfoGenerator } from '../../Solution/SolutionGroup/components/SolutionGroupImage/components/ShareButton/index.types';
import { ApplicationListRecordProps } from './components/ApplicationListRecord/index.types';

export type ApplicationData = Omit<
  ApplicationListRecordProps,
  | 'InstallButton'
  | 'solutionName'
  | 'onDispatchDeveloper'
  | 'onResetDeveloperDispatch'
  | 'developerApplicationsUrlGenerator'
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
  solutionUrlGenerator?: ISolutionGroupInfoGenerator;
  onLoadMoreApplications: LoadApplicationsFunction;
};
