import { LoadApplicationsFunction } from '../../Applications/ApplicationList/ApplicationsList.types';
import {
  IOnDispatchDeveloper,
  IOnResetDeveloperDispatch,
  IDeveloperApplicationsUrlGenerator,
} from '../../Applications/ApplicationList/components/ApplicationDeveloperName/index.types';
import { IWebFlashButton } from '../../Applications/ApplicationList/components/ApplicationListRecord/index.types';
import { ICreateApplicationUrlGenerator } from '../SolutionGroup/components/SolutionGroupApplications/index.types';
import { ISolutionGroupInfoGenerator } from '../SolutionGroup/components/SolutionGroupImage/components/ShareButton/index.types';
import {
  IManufacturerSolutionsUrlGenerator,
  ITagUrlGenerator,
} from '../SolutionGroup/components/SolutionGroupPreview/index.types';
import {
  SolutionGroupProps,
  SolutionGroupView,
} from '../SolutionGroup/SolutionGroup.types';

export type SolutionGroupListHocProps = {
  defaultView: SolutionGroupView;
  limit: number;
  fallbackImage?: string;
  tagUrlGenerator?: ITagUrlGenerator;
  manufacturerSolutionsUrlGenerator?: IManufacturerSolutionsUrlGenerator;
  solutionUrlGenerator?: ISolutionGroupInfoGenerator;
  embeddingGenerator?: ISolutionGroupInfoGenerator;
  InstallButton: IWebFlashButton;
  onInitialApplicationsLoad: LoadApplicationsFunction;
  onLoadMoreApplications?: LoadApplicationsFunction;
  createApplicationUrlGenerator?: ICreateApplicationUrlGenerator;
  onDispatchDeveloper?: IOnDispatchDeveloper;
  onResetDeveloperDispatch?: IOnResetDeveloperDispatch;
  developerApplicationsUrlGenerator?: IDeveloperApplicationsUrlGenerator;
  onLoadMoreSolutionGroups: (params: {
    signal?: AbortSignal;
    limit: number;
  }) => Promise<SolutionGroupData[]>;
};

export type SolutionGroupData = Omit<
  SolutionGroupProps,
  keyof SolutionGroupListHocProps
>;
