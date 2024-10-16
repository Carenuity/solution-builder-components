import { Card, Image } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { IShieldCard } from './index.types';
import { imageFallback } from '../../../../utils/constants.utils';

const shieldImageStyle = {
  width: '100%',
  height: 'auto',
  marginBottom: 16,
  backgroundColor: 'transparent',
};

const ShieldCard: React.FC<IShieldCard> = ({ imageUrl, name, title }) => {
  return (
    <>
      <Card
        hoverable
        style={shieldImageStyle}
        bordered={false}
        cover={
          <Image
            style={{
              borderRadius: 'inherit',
            }}
            src={imageUrl}
            fallback={imageFallback}
          />
        }
      >
        <Meta
          style={{ textAlign: 'center' }}
          title={name}
          description={title}
        />
      </Card>
    </>
  );
};

export default ShieldCard;
