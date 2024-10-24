import { Avatar } from '../../utils/types.utils';

export type MyApplicationDataItem = {
  id: string;
  image: string;
  name: string;
};

export interface MyApplicationDataType {
  key: React.Key;
  name: string;
  image: string;
  tag?: string;
  ecosystem: MyApplicationDataItem;
  microcontroller: MyApplicationDataItem;
  type: MyApplicationDataItem;
}

export type SolutionTemplate = {
  id: string;
  name: string;
  actuator_id: string;
  microcontroller_id: string;
  sensor_id: string;
  avatars: Avatar[];
};

export type FilterListItem = {
  text: string;
  value: string;
};
