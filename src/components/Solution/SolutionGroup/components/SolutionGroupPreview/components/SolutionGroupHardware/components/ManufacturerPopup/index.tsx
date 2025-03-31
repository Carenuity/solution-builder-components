import {
  LinkOutlined,
  LoadingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Row, Col, Flex, Button, Image } from 'antd';
import React, { useContext, useState } from 'react';
import { ManufacturerPopupProps } from './index.types';
import Link from 'next/link';
import { SolutionGroupContext } from '../../../../../../context';

// const { Link } = Typography;

const companyImageFallback = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fcompany%252Favatars%252FZpPTBErPqSiOwSxON6t5%252F1719655090636_carenuity.png%3Falt%3Dmedia%26token%3D41ced7d7-4d43-4e3f-9bc3-d3d441fa8e73&w=384&q=75`;

export const ManufacturerPopup: React.FC<ManufacturerPopupProps> = ({
  name,
  logo,
  shopUrl,
  solutionsUrl,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const { state } = useContext(SolutionGroupContext);

  return (
    <>
      <div style={{ maxWidth: '15rem' }}>
        <Link
          href={solutionsUrl || '#'}
          style={{ color: 'inherit' }}
          target={state.isWidget ? '_blank' : '_self'}
        >
          <Row gutter={16} style={{ marginBottom: '.3rem' }}>
            <Col xs={10}>
              <Flex
                vertical={true}
                justify={'center'}
                align={'center'}
                style={{ height: '100%' }}
              >
                {loadingImage && (
                  <LoadingOutlined style={{ fontSize: '2rem' }} />
                )}
                <Image
                  src={logo}
                  fallback={companyImageFallback}
                  loading={'lazy'}
                  preview={false}
                  onLoad={() => {
                    setLoadingImage(false);
                  }}
                  onError={() => {
                    setLoadingImage(false);
                  }}
                  style={{
                    display: loadingImage ? 'none' : 'block',
                  }}
                />
              </Flex>
            </Col>

            <Col xs={14} flex={'auto'}>
              <LinkOutlined
                style={{ marginRight: '.2rem', color: '#3d8346' }}
              />
              {name}
            </Col>
          </Row>
        </Link>

        {shopUrl && (
          <Button
            href={shopUrl}
            target={'_blank'}
            variant={'solid'}
            type={'primary'}
            shape={'round'}
            size={'small'}
            icon={<ShoppingCartOutlined />}
            style={{ marginTop: '.8rem', width: '100%', textAlign: 'center' }}
          >
            Buy Now
          </Button>
        )}
      </div>
    </>
  );
};
