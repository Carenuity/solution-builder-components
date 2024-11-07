import { Button, Modal, Upload, Image as AntImage, Flex } from 'antd';
import { useTheme } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import ReactCrop, { PercentCrop } from 'react-image-crop';
import { IImageCropper } from './ImageCropper.types';
import { ExpandOutlined, UploadOutlined } from '@ant-design/icons';
import 'react-image-crop/dist/ReactCrop.css';
import {
  setOffCanvasPreview,
  getSizedImageBlob,
} from './ImageCropper.worker.js';
import { imageFallback } from '../../utils/constants.utils';
import {
  generateOnImageLoad,
  getModalStyles,
  handleFileUpload,
  handleOnCrop,
} from './ImageCropper.utils';

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
  aspectRatio,
  onCropChange,
  previewRender,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImgData, setUploadedImgData] = useState<string>();
  const [mimeType, setMimeType] = useState<string>();
  const [originalFile, setOriginalFile] = useState<File>();
  const [worker, setWorker] = useState<Worker>();
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
  const modalStyles = getModalStyles(token);
  const ASPECT_RATIO = aspectRatio;
  const onImageLoad = generateOnImageLoad({ aspectRatio, minWidth, setCrop });

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
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          setFinalImageUrl(dataUrl);
          onCropChange({ dataUrl, file });
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
          {previewRender && previewRender(finalImageUrl)}
          {!previewRender && (
            <AntImage
              src={finalImageUrl}
              alt={'final image'}
              fallback={imageFallback}
            />
          )}

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
                handleFileUpload({
                  file,
                  minHeight,
                  minWidth,
                  setIsModalOpen,
                  setMimeType,
                  setOriginalFile,
                  setUploadedImgData,
                });
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
          handleOnCrop({
            crop,
            imgRef,
            minWidth,
            setIsModalOpen,
            mimeType,
            originalFile,
            worker,
          });
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
