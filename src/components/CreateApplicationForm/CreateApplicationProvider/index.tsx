import React, { createContext, ReactNode, useReducer } from 'react';
import {
  CreateApplicationData,
  CreateApplicationAction,
  CreateApplicationReducerObject,
  BinaryRecord,
} from './index.types';
import { BinaryFileType } from '../SetBinaryFileType/index.types';

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
            sensor: action.data,
          };

        case 'board':
          return {
            ...state,
            microcontroller: action.data,
          };

        case 'actuator':
          return {
            ...state,
            actuator: action.data,
          };

        case 'solution':
          return {
            ...state,
            solution: action.data,
          };

        case 'ecosystem':
          return {
            ...state,
            ecosystem: action.data,
          };

        case 'application':
          return {
            ...state,
            application: action.data,
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
            binaryType: action.value as BinaryFileType,
          };

        case 'binary': {
          const data = action.value as BinaryRecord;

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
