import { Avatar } from '../../../utils/types.utils';

export interface DataType {
  key: React.Key;
  name: string;
  image: string;
}

export type SolutionTemplate = {
  id: string;
  name: string;
  actuator_id: string;
  microcontroller_id: string;
  sensor_id: string;
  avatars: Avatar[];
};
