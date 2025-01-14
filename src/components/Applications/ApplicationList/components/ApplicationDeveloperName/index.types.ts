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

export interface ApplicationDeveloperNameProps {
  developer: ApplicationDeveloper;
  onDispatchDeveloper?: (developer: ApplicationDeveloper) => void;
  onResetDeveloperDispatch?: () => void;
  developerApplicationsUrlGenerator?: (developerId: string) => string;
}
