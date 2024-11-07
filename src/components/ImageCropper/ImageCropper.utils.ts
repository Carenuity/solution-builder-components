import { message } from 'antd';
import { Theme } from 'antd-style';
import { SyntheticEvent } from 'react';
import {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop';
import {
  IGenerateOnImageLoad,
  IHandleFileUpload,
  IHandleOnCrop,
} from './ImageCropper.types';

export const getModalStyles = (token: Theme) => {
  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    mask: {
      backdropFilter: 'blur(7px)',
    },
    content: {
      boxShadow: '0 0 30px #999',
    },
  };
  return modalStyles;
};

export const generateOnImageLoad = ({
  minWidth,
  aspectRatio,
  setCrop,
}: IGenerateOnImageLoad) => {
  return (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (minWidth / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };
};

export const handleFileUpload = ({
  file,
  minHeight,
  minWidth,
  setOriginalFile,
  setMimeType,
  setUploadedImgData,
  setIsModalOpen,
}: IHandleFileUpload) => {
  if (file) {
    setOriginalFile(file);
    setMimeType(file.type);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) {
        return;
      }

      // handle image load
      const image = new Image();
      image.src = dataUrl;

      image.addEventListener('load', (e: Event) => {
        const ct = e.currentTarget as HTMLImageElement;
        const { naturalWidth, naturalHeight } = ct;
        if (naturalWidth < minWidth || naturalHeight < minHeight) {
          message.error(
            `Image must be at least ${minWidth} x ${minHeight} pixels`
          );
          setUploadedImgData('');
          return;
        }
        setUploadedImgData(dataUrl);
        setIsModalOpen(true);
      });
    };
  }
};

export const handleOnCrop = ({
  imgRef,
  worker,
  originalFile,
  mimeType,
  minWidth,
  crop,
  setIsModalOpen,
}: IHandleOnCrop) => {
  if (worker) {
    // Get image dimensions
    const img = imgRef.current;
    if (!img || !originalFile) {
      message.error('Something went wrong! Try again.');
      return;
    }

    const originalImageDimensions = {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      width: img.width,
      height: img.height,
      mimeType,
    };

    // Get crop dimensions
    const cropPixel = convertToPixelCrop(
      crop,
      imgRef.current?.width,
      imgRef.current?.height
    );

    worker.postMessage({
      originalImageDimensions,
      imageBlob: originalFile,
      crop: cropPixel,
      pixelRatio: window.devicePixelRatio,
      preferredWidth: minWidth,
    });
    setIsModalOpen(false);
  }
};
