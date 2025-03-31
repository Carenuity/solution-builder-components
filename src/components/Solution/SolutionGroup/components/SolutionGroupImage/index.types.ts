import { ShareButtonProps } from './components/ShareButton/index.types';

export type SolutionGroupImageProps = ShareButtonProps & {
  imageUrl: string;
  fallbackImage?: string;
  isEmbedding?: boolean;
};
