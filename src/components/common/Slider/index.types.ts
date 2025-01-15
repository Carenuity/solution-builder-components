export type SliderItem = {
  avatar?: string;
  name: string;
  id: string;
};

export type SliderProps = {
  items: SliderItem[];
  itemUrlGenerator?: (id: string) => string;
};
