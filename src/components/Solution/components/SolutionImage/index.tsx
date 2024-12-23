import { LoadingOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Flex, FloatButton, Image } from 'antd';
import React, { useState } from 'react';
import { borderRadius, screenThreshold } from '../../Solution.constants';
import { useScreenSize } from '../../Solution.hooks';
import { SolutionImageProps } from './index.types';

const SolutionImage: React.FC<SolutionImageProps> = ({
  imageUrl,
  fallbackImage,
}) => {
  const { width } = useScreenSize();
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
      <FloatButton
        tooltip={'share'}
        icon={<ShareAltOutlined />}
        style={{
          position: 'absolute',
          bottom: width > screenThreshold ? '45%' : '-7%',
          right: width > screenThreshold ? '-12%' : '45%',
        }}
        onClick={() => console.log('onClick')}
      />

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
