import React, { createContext, ReactNode, useReducer } from 'react';
import {
  UpdateApplicationAction,
  UpdateApplicationData,
  UpdateApplicationReducerObject,
} from './index.types';
import { ApplicationBinaryRecord } from '../../common/developer/index.types';
import { BinaryFormat } from '../../../utils/types.utils';

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
