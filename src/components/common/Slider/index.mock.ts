import { SliderProps } from './index.types';

export const sliderProps: SliderProps = {
  items: [
    {
      name: 'Barometer',
      id: '1',
      avatar:
        'https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fiot_component%252Favatars%252Fb0A3sJ4VNoi9brJB7eR4%252F1719585948570_OLED.png%3Falt%3Dmedia%26token%3Dbb2567e3-2ea8-40bf-b365-162cb1a64905&w=256&q=75',
    },
    { name: 'Thermometer', id: '2', avatar: '' },
    { name: 'Radar', id: '3', avatar: '' },
    { name: 'Pressure', id: '4', avatar: '' },
    { name: 'Heat', id: '5', avatar: '' },
    { name: 'Distance', id: '6', avatar: '' },
    { name: 'Display', id: '7', avatar: '' },
    { name: 'API', id: '8', avatar: '' },
  ],
  applicationPageUrlGenerator(id) {
    return `#${id}`;
  },
};
