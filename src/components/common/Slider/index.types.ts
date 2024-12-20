type SliderItem = {
  avatar?: string;
  name: string;
  id: string;
};

export type SliderProps = {
  items: SliderItem[];
  applicationPageUrlGenerator?: (id: string) => string;
};
