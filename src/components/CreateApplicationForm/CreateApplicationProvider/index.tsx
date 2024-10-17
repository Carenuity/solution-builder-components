import React, { createContext, ReactNode, useReducer } from 'react';
import {
  CreateApplicationData,
  CreateApplicationAction,
  CreateApplicationReducerObject,
} from './index.types';

// const imageFallback =
//   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export const createApplicationInitialState: CreateApplicationData = {};

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

        default:
          return state;
      }

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
