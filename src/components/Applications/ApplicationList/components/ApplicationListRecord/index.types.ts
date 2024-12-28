type SocialHandle = {
  id: string;
  url: string;
};

type ApplicationDeveloper = {
  id: string;
  name: string;
  avatar: string;
  subtitle?: string;
  socialHandles?: SocialHandle[];
};

export interface InstallButtonInterface {
  manifest: string;
}

export interface ApplicationListRecordProps {
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
  developer: ApplicationDeveloper;
  InstallButton: React.ComponentType<InstallButtonInterface>;
}
