import { ShareButtonProps } from './components/ShareButton/index.types';

export type SolutionImageProps = ShareButtonProps & {
  imageUrl: string;
  fallbackImage?: string;
};
