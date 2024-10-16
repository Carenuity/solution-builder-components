import { Dispatch } from 'react';
import { IotShieldCategory } from '../../../../utils/types.utils';

export type IoTShieldPreview = {
  name?: string;
  url: string;
};

type IotShield = {
  name: string;
  url: string;
  category: IotShieldCategory;
};

// export type SMA = Record<IotShieldCategory, IoTShieldPreview>;

export interface ShieldPreviewReducerObject {
  state: Record<IotShieldCategory, IoTShieldPreview>;
  dispatch: Dispatch<ShieldPreviewAction>;
}

export interface ShieldPreviewAction {
  type: 'SET';
  shield: IotShield;
}
