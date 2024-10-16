import React, { createContext, ReactNode, useReducer } from 'react';
import { IotShieldCategory } from '../../../../utils/types.utils';
import {
  IoTShieldPreview,
  ShieldPreviewAction,
  ShieldPreviewReducerObject,
} from './index.types';
import { imageFallback } from '../../../../utils/constants.utils';

// const imageFallback =
//   'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

export const shieldPreviewInitialState: Record<
  IotShieldCategory,
  IoTShieldPreview
> = {
  sensor: { url: imageFallback },
  microcontroller: { url: imageFallback },
  actuator: {
    url: imageFallback,
  },
};

const reducer = (
  state: Record<IotShieldCategory, IoTShieldPreview>,
  action: ShieldPreviewAction
): Record<IotShieldCategory, IoTShieldPreview> => {
  switch (action.type) {
    case 'SET':
      switch (action.shield.category) {
        case 'sensor':
          return {
            ...state,
            sensor: { url: action.shield.url, name: action.shield.name },
          };

        case 'microcontroller':
          return {
            ...state,
            microcontroller: {
              url: action.shield.url,
              name: action.shield.name,
            },
          };

        case 'actuator':
          return {
            ...state,
            actuator: {
              url: action.shield.url,
              name: action.shield.name,
            },
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

export const ShieldPreviewContext = createContext<ShieldPreviewReducerObject>({
  state: shieldPreviewInitialState,
  dispatch: () => {},
});

export const ShieldPreviewProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, shieldPreviewInitialState);

  return (
    <ShieldPreviewContext.Provider value={{ state, dispatch }}>
      {children}
    </ShieldPreviewContext.Provider>
  );
};
