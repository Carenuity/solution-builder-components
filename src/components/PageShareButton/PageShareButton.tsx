import { ShareAltOutlined } from '@ant-design/icons';
import { Button, Divider, message, Popover, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { PageShareButtonProps } from './index.types';
import { useScreenSize } from '../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../Solution/SolutionGroup/SolutionGroup.constants';
import { sharePage } from './index.utils';

const { Text, Paragraph } = Typography;

const PageShareButton: React.FC<PageShareButtonProps> = ({ name, url }) => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);
  const [canShare, setCanShare] = useState(false);

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

    // feature detecting navigator.canShare() also implies
    // the same for the navigator.share()
    setCanShare(!!navigator.canShare);
  }, []);

  return (
    <>
      {canShare && (
        <Button
          icon={<ShareAltOutlined />}
          type={'default'}
          shape={'round'}
          size={'middle'}
          variant={'outlined'}
          onClick={async () => {
            sharePage({
              name,
              url,
            })
              .then((msg) => {
                message.success(msg);
              })
              .catch((error) => {
                message.error(error.message);
              });
          }}
        >
          <Divider type={'vertical'} />
          Share
        </Button>
      )}

      {!canShare && (
        <Popover
          placement={isMobile ? 'bottom' : 'right'}
          title={
            <Text ellipsis style={{ maxWidth: isMobile ? '100%' : '30rem' }}>
              Share {name}
            </Text>
          }
          content={
            <>
              <div style={{ maxWidth: '30rem' }}>
                <Paragraph
                  copyable
                  ellipsis={{ rows: 1, expandable: true, symbol: 'expand' }}
                  style={{
                    backgroundColor: '#ccca',
                    borderRadius: '5rem',
                    padding: '.5rem 2rem',
                  }}
                >
                  {url}
                </Paragraph>
              </div>
            </>
          }
        >
          <Button
            icon={<ShareAltOutlined />}
            type={'default'}
            shape={'round'}
            size={'middle'}
            variant={'outlined'}
          >
            <Divider type={'vertical'} />
            Share
          </Button>
        </Popover>
      )}
    </>
  );
};

export default PageShareButton;
