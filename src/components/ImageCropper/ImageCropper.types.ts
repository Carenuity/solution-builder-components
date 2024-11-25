import { ReactNode, RefObject, SetStateAction } from 'react';
import { PercentCrop } from 'react-image-crop';

type IOnCropChangeParams = {
  dataUrl: string;
  file: File;
};

export interface IImageCropper {
  minWidth: number;
  minHeight: number;
  isCircularCrop: boolean;
  fallbackImageUrl?: string;
  aspectRatio: number;
  onCropChange: (params: IOnCropChangeParams) => void;
  previewRender?: (dataUrl?: string) => ReactNode;
}

export type IGenerateOnImageLoad = {
  minWidth: number;
  aspectRatio: number;
  setCrop: (value: SetStateAction<PercentCrop>) => void;
};

export type IHandleFileUpload = {
  file?: File;
  minWidth: number;
  minHeight: number;
  setOriginalFile: (value: SetStateAction<File | undefined>) => void;
  setMimeType: (value: SetStateAction<string | undefined>) => void;
  setUploadedImgData: (value: SetStateAction<string | undefined>) => void;
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
};

export type IHandleOnCrop = {
  worker?: Worker;
  originalFile?: File;
  minWidth: number;
  crop: PercentCrop;
  imgRef: RefObject<HTMLImageElement>;
  mimeType?: string;
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
};
