export interface HandleDataType {
  key: React.Key;
  icon: string;
  tag: string;
}

export type HandleRecord = {
  id: string;
  tag: string;
  icon: string;
};

export type IHandlesList = {
  accessToken: string;
  onDeleteHandle?: () => void;
  editInfoUrlCallback: (handleId: string) => string;
};
