import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Image } from 'antd';
import React, { useState } from 'react';
import { borderRadius } from '../../Solution.constants';
import { SolutionImageProps } from './index.types';
import ShareButton from './components/ShareButton';

const SolutionImage: React.FC<SolutionImageProps> = ({
  imageUrl,
  fallbackImage,
  ...shareButtonProps
}) => {
  const [loadingImage, setLoadingImage] = useState(true);

  return (
    <Flex
      justify={'center'}
      align={'center'}
      style={{
        position: 'relative',
        height: '100%',
      }}
    >
      {/* Solution Share button */}
      <ShareButton {...shareButtonProps} />

      {loadingImage && <LoadingOutlined style={{ fontSize: '2rem' }} />}

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

export default SolutionImage;
