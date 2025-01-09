import { ApplicationDeveloperNameProps } from '../ApplicationDeveloperName/index.types';

export interface InstallButtonInterface {
  manifest: string;
}

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
  InstallButton: React.ComponentType<InstallButtonInterface>;
  solutionName?: string;
}
