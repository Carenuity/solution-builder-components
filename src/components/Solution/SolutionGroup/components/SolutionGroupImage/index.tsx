import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../../../common/hooks/ScreenSize.hook';
import { borderRadius, screenThreshold } from '../../SolutionGroup.constants';
import ShareButton from './components/ShareButton';
import { SolutionGroupImageProps } from './index.types';

const SolutionGroupImage: React.FC<SolutionGroupImageProps> = ({
  imageUrl,
  fallbackImage,
  ...shareButtonProps
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);

  useEffect(() => {
    if (!window.document) {
      return;
    }

    setIsMobile(width < screenThreshold);
  }, [width]);

  return (
    <Flex
      justify={isMobile ? 'center' : 'start'}
      align={'center'}
      style={{
        position: 'relative',
        height: '100%',
      }}
    >
      {/* Solution Share button */}
      <ShareButton {...shareButtonProps} />

      {loadingImage && (
        <div style={{ width: '100%', textAlign: 'center' }}>
          <LoadingOutlined style={{ fontSize: '2rem' }} />
        </div>
      )}

      <Image
        src={imageUrl}
        loading={'lazy'}
        style={{
          borderRadius: borderRadius,
          display: loadingImage ? 'none' : 'block',
        }}
        onLoad={() => {
          setLoadingImage(false);
        }}
        onError={() => {
          setLoadingImage(false);
        }}
        alt={'Solution image'}
        fallback={
          fallbackImage ||
          'https://image-placeholder.com/images/actual-size/640x640.png'
        }
      />
    </Flex>
  );
};

export default SolutionGroupImage;
