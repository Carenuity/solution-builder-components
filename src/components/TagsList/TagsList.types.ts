import { Avatar } from '../../utils/types.utils';

export interface TagDataType {
  key: React.Key;
  icon: string;
  name: string;
}

export type TagRecord = {
  id: string;
  name: string;
  avatars: Avatar[];
};

export type ITagsList = {
  accessToken: string;
  onDeleteTag?: () => void;
  editIconUrlCallback: (tagId: string) => string;
  editInfoUrlCallback: (tagId: string) => string;
};
