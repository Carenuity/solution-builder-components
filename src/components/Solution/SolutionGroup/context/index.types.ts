import { Dispatch } from 'react';

export type SolutionGroupContextData = {
  isWidget: boolean;
};

export interface SolutionGroupReducerObject {
  state: SolutionGroupContextData;
  dispatch: Dispatch<SolutionGroupAction>;
}

export interface SolutionGroupAction {
  type: 'SET';
  value: boolean;
}
