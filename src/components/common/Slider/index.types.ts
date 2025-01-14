export type SliderItem = {
  avatar?: string;
  name: string;
  id: string;
};

export type SliderProps = {
  items: SliderItem[];
  applicationUrlGenerator?: (id: string) => string;
};
