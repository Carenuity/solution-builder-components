export type ListApiResponse<Item> = {
  data: {
    items: Item[];
  };
};

export type IotShieldCategory = 'sensor' | 'microcontroller' | 'actuator';

export type Avatar = {
  id: string;
  url: string;
};
