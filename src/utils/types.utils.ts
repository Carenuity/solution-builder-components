export type ListApiResponse<Item> = {
  data: {
    items: Item[];
  };
};

export type IotShieldCategory = 'sensor' | 'microcontroller' | 'actuator';
