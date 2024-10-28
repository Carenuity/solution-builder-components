import React, { createContext, ReactNode, useReducer } from 'react';
import {
  ApplicationBinaryRecord,
  ApplicationDataItem,
  UpdateApplicationAction,
  UpdateApplicationData,
  UpdateApplicationReducerObject,
} from './index.types';
import { IBinaryFileType } from '../../../utils/types.utils';

// const imageFallback =
//   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export const updateApplicationInitialState: UpdateApplicationData = {
  canProceed: false,
};

const reducer = (
  state: UpdateApplicationData,
  action: UpdateApplicationAction
): UpdateApplicationData => {
  switch (action.type) {
    case 'SET':
      switch (action.category) {
        // case 'sensor':
        //   return {
        //     ...state,
        //     sensor: action.data,
        //   };

        case 'board':
          return {
            ...state,
            microcontroller: action.value as ApplicationDataItem,
          };

        // case 'actuator':
        //   return {
        //     ...state,
        //     actuator: action.data,
        //   };

        // case 'solution':
        //   return {
        //     ...state,
        //     solution: action.data,
        //   };

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
            binaryType: action.value as IBinaryFileType,
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

export const UpdateApplicationContext =
  createContext<UpdateApplicationReducerObject>({
    state: updateApplicationInitialState,
    dispatch: () => {},
  });

export const UpdateApplicationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, updateApplicationInitialState);

  return (
    <UpdateApplicationContext.Provider value={{ state, dispatch }}>
      {children}
    </UpdateApplicationContext.Provider>
  );
};
