import {
  AndroidOutlined,
  CodeOutlined,
  GlobalOutlined,
  LinkOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  FloatButton,
  message,
  Popover,
  Row,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../../../../common/hooks/ScreenSize.hook';
import { primaryColor, screenThreshold } from '../../../../Solution.constants';
import { ShareButtonProps, SolutionShareTab } from './index.types';
import { shareSolution } from './index.utils';

const { Text, Paragraph } = Typography;

const ShareButton: React.FC<ShareButtonProps> = ({
  id,
  name,
  generateSolutionPageUrl,
  generateEmbedding,
}) => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);
  const [canShare, setCanShare] = useState(false);

  const solutionPageUrl = generateSolutionPageUrl
    ? generateSolutionPageUrl(id)
    : undefined;

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

  const tabs: SolutionShareTab[] = [
    {
      label: 'URL',
      icon: <LinkOutlined />,
      content: (
        <>
          {solutionPageUrl && (
            <Paragraph
              copyable
              style={{
                backgroundColor: '#ccca',
                borderRadius: '5rem',
                padding: '.5rem 2rem',
              }}
            >
              {solutionPageUrl}
            </Paragraph>
          )}
        </>
      ),
    },
    {
      label: 'Embedding',
      icon: <CodeOutlined />,
      content: (
        <>
          {generateEmbedding && (
            <Paragraph
              copyable
              type={'secondary'}
              style={{
                backgroundColor: '#ccca',
                borderRadius: '1rem',
                padding: '.5rem 1rem',
              }}
            >
              {generateEmbedding(id)}
            </Paragraph>
          )}
        </>
      ),
    },
    {
      label: 'Media',
      icon: <GlobalOutlined />,
      content: (
        <>
          <Row gutter={16}>
            {canShare && (
              <Col xs={6}>
                <Tooltip title={'Web Share'}>
                  <Button
                    icon={<AndroidOutlined />}
                    type={'link'}
                    shape={'circle'}
                    size={'large'}
                    color={'default'}
                    style={{ backgroundColor: '#add8e6', color: primaryColor }}
                    onClick={async () => {
                      shareSolution({
                        name,
                        url: solutionPageUrl,
                      })
                        .then((msg) => {
                          message.success(msg);
                        })
                        .catch((error) => {
                          message.error(error.message);
                        });
                    }}
                  />
                </Tooltip>
              </Col>
            )}
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Popover
        placement={isMobile ? 'bottom' : 'right'}
        title={
          <Text ellipsis style={{ maxWidth: isMobile ? '100%' : '22rem' }}>
            Share {name}
          </Text>
        }
        content={
          <>
            <div style={{ maxWidth: '22rem' }}>
              <Tabs
                defaultActiveKey="url"
                tabPosition={'top'}
                items={tabs.map(({ content, label, icon }) => ({
                  key: label.toLowerCase(),
                  label,
                  children: content,
                  icon,
                }))}
                size={'large'}
              />
            </div>
          </>
        }
      >
        <FloatButton
          icon={<ShareAltOutlined />}
          style={{
            position: 'absolute',
            ...(isMobile
              ? {
                  bottom: '-7%',
                  right: '50%',
                  transform: `translateX(50%)`,
                }
              : { top: '45%', transform: `translateY(-45%)`, right: '-9.5%' }),
          }}
        />
      </Popover>
    </>
  );
};

export default ShareButton;
