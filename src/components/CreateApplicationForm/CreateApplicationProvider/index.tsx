import React, { createContext, ReactNode, useReducer } from 'react';
import {
  CreateApplicationData,
  CreateApplicationAction,
  CreateApplicationReducerObject,
} from './index.types';
import {
  ApplicationBinaryRecord,
  ApplicationDataItem,
} from '../../common/developer/index.types';
import { BinaryFormat } from '../../../utils/types.utils';

// const imageFallback =
//   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export const createApplicationInitialState: CreateApplicationData = {
  canProceed: false,
};

const reducer = (
  state: CreateApplicationData,
  action: CreateApplicationAction
): CreateApplicationData => {
  switch (action.type) {
    case 'SET':
      switch (action.category) {
        case 'sensor':
          return {
            ...state,
            sensor: action.value as ApplicationDataItem,
          };

        case 'board':
          return {
            ...state,
            microcontroller: action.value as ApplicationDataItem,
          };

        case 'actuator':
          return {
            ...state,
            actuator: action.value as ApplicationDataItem,
          };

        case 'solution':
          return {
            ...state,
            solution: action.value as ApplicationDataItem,
          };

        case 'ecosystem':
          return {
            ...state,
            ecosystem: action.value as ApplicationDataItem,
          };

        case 'application':
          return {
            ...state,
            application: action.value as ApplicationDataItem,
          };

        case 'repository':
          return {
            ...state,
            repository: action.value as string,
          };

        case 'tag':
          return {
            ...state,
            tag: action.value as string,
          };

        case 'binary_type':
          return {
            ...state,
            binaryType: action.value as BinaryFormat,
          };

        case 'binary': {
          const data = action.value as ApplicationBinaryRecord;

          return {
            ...state,
            binaries: {
              ...state.binaries,
              [data.kind!]: data,
            },
          };
        }

        case 'proceed':
          return {
            ...state,
            canProceed: !state.canProceed,
          };

        default:
          return state;
      }

    case 'UNSET':
      return { canProceed: false };

    default:
      return state;
  }
};

export const CreateApplicationContext =
  createContext<CreateApplicationReducerObject>({
    state: createApplicationInitialState,
    dispatch: () => {},
  });

export const CreateApplicationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, createApplicationInitialState);

  return (
    <CreateApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </CreateApplicationContext.Provider>
  );
};
