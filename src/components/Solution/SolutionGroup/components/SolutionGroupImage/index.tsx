import { Flex, Image, Skeleton } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useScreenSize } from '../../../../common/hooks/ScreenSize.hook';
import { borderRadius, screenThreshold } from '../../SolutionGroup.constants';
import ShareButton from './components/ShareButton';
import { SolutionGroupImageProps } from './index.types';
import { SolutionGroupContext } from '../../context';

const SolutionGroupImage: React.FC<SolutionGroupImageProps> = ({
  imageUrl,
  fallbackImage,
  isEmbedding,
  ...shareButtonProps
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);
  const { dispatch, state } = useContext(SolutionGroupContext);

  useEffect(() => {
    if (!window.document) {
      return;
    }

    setIsMobile(width < screenThreshold);
  }, [width]);

  useEffect(() => {
    if (!window.document) {
      return;
    }

    if (state.isWidget !== isEmbedding) {
      dispatch({ type: 'SET', value: !!isEmbedding });
    }
  }, []);

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
        <div style={{ textAlign: 'center' }}>
          {/* <LoadingOutlined style={{ fontSize: '2rem' }} /> */}

          <Skeleton.Image
            active
            style={{
              width: '16rem',
              height: '15rem',
              borderRadius: borderRadius,
            }}
          />
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
