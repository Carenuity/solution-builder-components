import { Avatar } from '../../utils/types.utils';

export type MyApplicationDataItem = {
  id: string;
  image?: string;
  name: string;
};

export interface MyApplicationDataType {
  key: React.Key;
  name: string;
  image: string;
  tag?: string;
  date?: string;
  ecosystem: string;
  type: string;
  manifest: string;
  repository: string;
}

export type FilterListItem = {
  text: string;
  value: string;
};

type ApplicationDataItem = {
  id: string;
  name: string;
  avatars: Avatar[];
};

export type ApplicationRecord = {
  id: string;
  manifest: string;
  repository: string;
  application: ApplicationDataItem;
  solution: ApplicationDataItem;
  ecosystem: {
    id: string;
    name: string;
  };
  tag?: string;
  created_at?: string;
};

// export interface EspWebInstallButtonProps extends ButtonProps {
//   manifest: string;
// }

// type WebInstallButtonResult = {
//   InstallButton: React.ForwardRefExoticComponent<
//     EspWebInstallButtonProps & React.RefAttributes<HTMLButtonElement>
//   >;
// };

export type IMyApplications = {
  developerId: string;
  accessToken: string;
  onDeleteApplication?: () => void;
  editUrlCallback: (applicationId: string) => string;
  manifestCallback?: (manifest: string) => void;
};
