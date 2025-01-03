import { Button, Modal, Upload, Image as AntImage, Flex } from 'antd';
import { useTheme } from 'antd-style';
import React, { useEffect, useRef, useState } from 'react';
import ReactCrop, { PercentCrop } from 'react-image-crop';
import { IImageCropper } from './ImageCropper.types';
import { ExpandOutlined, UploadOutlined } from '@ant-design/icons';
import 'react-image-crop/dist/ReactCrop.css';
import { imageFallback } from '../../utils/constants.utils';
import {
  generateOnImageLoad,
  getModalStyles,
  handleFileUpload,
  handleOnCrop,
} from './ImageCropper.utils';
import { workerFileContent } from './worker.content';

const ImageCropper: React.FC<IImageCropper> = ({
  minHeight,
  minWidth,
  isCircularCrop,
  aspectRatio,
  fallbackImageUrl,
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
        new Blob([workerFileContent], { type: 'application/javascript' })
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
          if (onCropChange) {
            onCropChange({ dataUrl, file });
          }
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
              fallback={fallbackImageUrl || imageFallback}
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
              beforeUpload={(file) => {
                handleFileUpload({
                  file,
                  minHeight,
                  minWidth,
                  setIsModalOpen,
                  setMimeType,
                  setOriginalFile,
                  setUploadedImgData,
                });
                return false;
              }}
              itemRender={() => <></>}
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
