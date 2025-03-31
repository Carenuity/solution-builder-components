import React, { createContext, ReactNode, useReducer } from 'react';
import {
  SolutionGroupAction,
  SolutionGroupContextData,
  SolutionGroupReducerObject,
} from './index.types';

// const imageFallback =
//   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export const solutionGroupInitialState: SolutionGroupContextData = {
  isWidget: false,
};

const reducer = (
  state: SolutionGroupContextData,
  action: SolutionGroupAction
): SolutionGroupContextData => {
  switch (action.type) {
    case 'SET':
      return { isWidget: action.value };

    default:
      return state;
  }
};

export const SolutionGroupContext = createContext<SolutionGroupReducerObject>({
  state: solutionGroupInitialState,
  dispatch: () => {},
});

export const SolutionGroupProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, solutionGroupInitialState);

  return (
    <SolutionGroupContext.Provider value={{ state, dispatch }}>
      {children}
    </SolutionGroupContext.Provider>
  );
};
