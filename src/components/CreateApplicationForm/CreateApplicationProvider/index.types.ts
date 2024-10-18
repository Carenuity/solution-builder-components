import { Dispatch } from 'react';

type DataItem = {
  id: string;
  name: string;
};

type ItemCategory =
  | 'sensor'
  | 'board'
  | 'actuator'
  | 'solution'
  | 'ecosystem'
  | 'application'
  | 'repository';

export type CreateApplicationData = {
  sensor?: DataItem;
  microcontroller?: DataItem;
  actuator?: DataItem;
  solution?: DataItem;
  ecosystem?: DataItem;
  application?: DataItem;
  repository?: string;
};

// export type IoTShieldPreview = {
//   name?: string;
//   url: string;
// };

// type IotShield = {
//   name: string;
//   url: string;
//   category: IotShieldCategory;
// };

// export type SMA = Record<IotShieldCategory, IoTShieldPreview>;

export interface CreateApplicationReducerObject {
  state: CreateApplicationData;
  dispatch: Dispatch<CreateApplicationAction>;
}

export interface CreateApplicationAction {
  type: 'SET';
  data?: DataItem;
  category: ItemCategory;
  repository?: string;
}
