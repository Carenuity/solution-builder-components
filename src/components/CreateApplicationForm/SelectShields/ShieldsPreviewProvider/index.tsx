import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { IotShieldCategory } from '../../../../utils/types.utils';
import {
  IoTShieldPreview,
  ShieldPreviewAction,
  ShieldPreviewReducerObject,
} from './index.types';
import { imageFallback } from '../../../../utils/constants.utils';
import { CreateApplicationContext } from '../../CreateApplicationProvider';

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
            sensor: {
              id: action.shield.id,
              url: action.shield.url,
              name: action.shield.name,
            },
          };

        case 'microcontroller':
          return {
            ...state,
            microcontroller: {
              id: action.shield.id,
              url: action.shield.url,
              name: action.shield.name,
            },
          };

        case 'actuator':
          return {
            ...state,
            actuator: {
              id: action.shield.id,
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
  const { dispatch: createApplicationDispatch } = useContext(
    CreateApplicationContext
  );

  useEffect(() => {
    if (state.actuator.name && state.actuator.id) {
      createApplicationDispatch({
        category: 'actuator',
        type: 'SET',
        data: { id: state.actuator.id, name: state.actuator.name },
      });
    }

    if (state.sensor.name && state.sensor.id) {
      createApplicationDispatch({
        category: 'sensor',
        type: 'SET',
        data: { id: state.sensor.id, name: state.sensor.name },
      });
    }

    if (state.microcontroller.name && state.microcontroller.id) {
      createApplicationDispatch({
        category: 'board',
        type: 'SET',
        data: {
          id: state.microcontroller.id,
          name: state.microcontroller.name,
        },
      });
    }
  }, [state]);

  return (
    <ShieldPreviewContext.Provider value={{ state, dispatch }}>
      {children}
    </ShieldPreviewContext.Provider>
  );
};
