import { ApplicationDeveloperNameProps } from '../ApplicationDeveloperName/index.types';

interface InstallButtonInterface {
  manifest: string;
}

export type IWebFlashButton = React.ComponentType<InstallButtonInterface>;

export interface ApplicationListRecordProps
  extends ApplicationDeveloperNameProps {
  id: string;
  downloads?: number;
  upVotes?: number;
  hasUpVoted?: boolean;
  downVotes?: number;
  hasDownVoted?: boolean;
  reviews?: string[];
  hasReviewed?: boolean;
  totalValidators?: number;
  description?: string;
  repository: string;
  manifest: string;
  tag?: string;
  InstallButton: IWebFlashButton;
  solutionName?: string;
  editAppUrl?: string;
}
