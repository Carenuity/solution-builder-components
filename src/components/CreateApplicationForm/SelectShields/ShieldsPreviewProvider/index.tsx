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
import { CreateApplicationContext } from '../../CreateApplicationProvider';

const sensorFallback = `https://firebasestorage.googleapis.com/v0/b/solution-builder-421307.appspot.com/o/defaults%2FS.png?alt=media&token=91b56c4a-6b40-4e5a-8617-0784000a3265`;
const boardFallback = `https://firebasestorage.googleapis.com/v0/b/solution-builder-421307.appspot.com/o/defaults%2FM.png?alt=media&token=ab16e6f7-bde7-494e-8c18-d8cfba508ac6`;
const actuatorFallback = `https://firebasestorage.googleapis.com/v0/b/solution-builder-421307.appspot.com/o/defaults%2FA.png?alt=media&token=08109a32-f812-46c5-8321-78a4ebb883f4`;

export const shieldPreviewInitialState: Record<
  IotShieldCategory,
  IoTShieldPreview
> = {
  sensor: { url: sensorFallback },
  microcontroller: { url: boardFallback },
  actuator: {
    url: actuatorFallback,
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
        value: { id: state.actuator.id, name: state.actuator.name },
      });
    }

    if (state.sensor.name && state.sensor.id) {
      createApplicationDispatch({
        category: 'sensor',
        type: 'SET',
        value: { id: state.sensor.id, name: state.sensor.name },
      });
    }

    if (state.microcontroller.name && state.microcontroller.id) {
      createApplicationDispatch({
        category: 'board',
        type: 'SET',
        value: {
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
