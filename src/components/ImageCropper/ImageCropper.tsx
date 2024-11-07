import { Button, Modal, Upload, message, Image as AntImage, Flex } from 'antd';
import { useTheme } from 'antd-style';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  PercentCrop,
} from 'react-image-crop';
import { IImageCropper } from './ImageCropper.types';
import { ExpandOutlined, UploadOutlined } from '@ant-design/icons';
import 'react-image-crop/dist/ReactCrop.css';
import {
  setOffCanvasPreview,
  getSizedImageBlob,
} from './ImageCropper.worker.js';
import { imageFallback } from '../../utils/constants.utils';

const workerCode = `
  const setOffCanvasPreview = ${setOffCanvasPreview.toString()}
  const getSizedImageBlob = ${getSizedImageBlob.toString()}

  self.onmessage = async function (e) {
    const {
      originalImageDimensions,
      imageBlob,
      offScreenCanvas,
      crop,
      pixelRatio,
      preferredWidth,
    } = e.data;

    const file = await setOffCanvasPreview({
      originalImageDimensions,
      imageBlob,
      crop,
      pixelRatio,
      preferredWidth,
    });
  
    self.postMessage({ file });
  };
`;

const ImageCropper: React.FC<IImageCropper> = ({
  minHeight,
  minWidth,
  isCircularCrop,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImgData, setUploadedImgData] = useState<string>();
  const [mimeType, setMimeType] = useState<string>();
  const [originalFile, setOriginalFile] = useState<File>();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [finalImageUrl, setFinalImageUrl] = useState<string>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<PercentCrop>({
    unit: '%',
    width: minWidth,
    height: minHeight,
    x: 0,
    y: 0,
  });

  const token = useTheme();
  const ASPECT_RATIO = Math.floor(minWidth / minHeight);

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

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (minWidth / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  useEffect(() => {
    const w = new Worker(
      URL.createObjectURL(
        new Blob([workerCode], { type: 'application/javascript' })
      )
    );

    w.onmessage = (e) => {
      const { file } = e.data;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const dataUrl = e.target?.result;
        if (dataUrl) {
          setFinalImageUrl(dataUrl as string);
        }
      };
    };
    setWorker(w);

    return () => {
      w.terminate();
    };
  }, []);

  return (
    <>
      <>
        <Flex vertical={true} align={'center'}>
          {/* Preview image */}
          <AntImage
            src={finalImageUrl}
            alt={'final image'}
            fallback={imageFallback}
          />

          <Flex
            gap={'1rem'}
            justify={'space-around'}
            align={'center'}
            style={{ marginTop: '1rem' }}
          >
            {/* Upload button */}
            <Upload<File>
              accept={'image/*'}
              itemRender={() => <></>}
              onChange={(info) => {
                const file = info.file.originFileObj;
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
                      if (
                        naturalWidth < minWidth ||
                        naturalHeight < minHeight
                      ) {
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
              }}
            >
              <Button
                title={'Upload'}
                shape={'circle'}
                variant={'filled'}
                color={'primary'}
                icon={<UploadOutlined />}
              />
            </Upload>

            {/* Edit button  */}
            {finalImageUrl && (
              <Button
                title={'Crop'}
                shape={'circle'}
                variant={'filled'}
                color={'primary'}
                icon={<ExpandOutlined />}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
            )}
          </Flex>
        </Flex>
      </>

      <Modal
        title="Image Crop"
        open={isModalOpen}
        onOk={() => {
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
        }}
        okText={
          <>
            <ExpandOutlined style={{ marginRight: '.5rem' }} /> Crop
          </>
        }
        footer={(_, { OkBtn }) => <OkBtn />}
        styles={modalStyles}
      >
        {uploadedImgData && (
          <ReactCrop
            crop={crop}
            circularCrop={isCircularCrop}
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={minWidth}
            minHeight={minHeight}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
            <img
              ref={imgRef}
              src={uploadedImgData}
              alt="image"
              onLoad={onImageLoad}
              style={{ width: '100%', height: 'auto' }}
            />
          </ReactCrop>
        )}
      </Modal>
    </>
  );
};

export default ImageCropper;
