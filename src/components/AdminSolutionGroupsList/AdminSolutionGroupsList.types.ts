import { Avatar } from '../../utils/types.utils';

export type AdminSolutionGroupDataItem = {
  id: string;
  name: string;
  image: string;
  sensor: IotComponent;
  actuator: IotComponent;
  micro: IotComponent;
};

export interface AdminSolutionGroupDataType {
  key: React.Key;
  name: string;
  image: string;
  sensor: IotComponent;
  actuator: IotComponent;
  micro: IotComponent;
}

export type FilterListItem = {
  text: string;
  value: string;
};

type IotComponent = {
  id: string;
  name: string;
  avatars: Avatar[];
};

export type AdminSolutionGroupRecord = {
  id: string;
  name: string;
  avatars: Avatar[];
  sensor: IotComponent;
  actuator: IotComponent;
  microcontroller: IotComponent;
};

export type IAdminSolutionGroupsList = {
  accessToken: string;
  onDeleteSolutionGroup?: () => void;
  editImageUrlCallback: (solutionId: string) => string;
};
