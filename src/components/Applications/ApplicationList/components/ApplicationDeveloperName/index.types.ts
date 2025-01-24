type SocialHandle = {
  id: string;
  url: string;
  icon: string;
  tag: string;
};

type ApplicationDeveloper = {
  id: string;
  name: string;
  avatar: string;
  subtitle?: string;
  socialHandles?: SocialHandle[];
};

export type IOnDispatchDeveloper = (developer: ApplicationDeveloper) => void;
export type IOnResetDeveloperDispatch = () => void;
export type IDeveloperApplicationsUrlGenerator = (
  developerId: string
) => string;

export interface ApplicationDeveloperNameProps {
  developer: ApplicationDeveloper;
  onDispatchDeveloper?: IOnDispatchDeveloper;
  onResetDeveloperDispatch?: IOnResetDeveloperDispatch;
  developerApplicationsUrlGenerator?: IDeveloperApplicationsUrlGenerator;
}
