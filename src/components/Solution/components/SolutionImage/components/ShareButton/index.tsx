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
  Popover,
  Row,
  Tabs,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';
import { useScreenSize } from '../../../../../common/hooks/ScreenSize.hook';
import { primaryColor, screenThreshold } from '../../../../Solution.constants';
import { ShareButtonProps, SolutionShareTab } from './index.types';

const { Text, Paragraph } = Typography;

const ShareButton: React.FC<ShareButtonProps> = ({
  id,
  name,
  generateCopyableUrl,
  generateEmbedding,
}) => {
  const { width } = useScreenSize();

  const tabs: SolutionShareTab[] = [
    {
      label: 'URL',
      icon: <LinkOutlined />,
      content: (
        <>
          {generateCopyableUrl && (
            <Paragraph
              copyable
              style={{
                backgroundColor: '#ccca',
                borderRadius: '5rem',
                padding: '.5rem 2rem',
              }}
            >
              {generateCopyableUrl(id)}
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
            <Col xs={6}>
              <Tooltip title={'Web Share'}>
                <Button
                  icon={<AndroidOutlined />}
                  type={'link'}
                  shape={'circle'}
                  size={'large'}
                  color={'default'}
                  style={{ backgroundColor: '#add8e6', color: primaryColor }}
                />
              </Tooltip>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Popover
        placement={width > screenThreshold ? 'right' : 'bottom'}
        title={
          <Text
            ellipsis
            style={{ maxWidth: width > screenThreshold ? '22rem' : '100%' }}
          >
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
            bottom: width > screenThreshold ? '45%' : '-7%',
            right: width > screenThreshold ? '-12%' : '45%',
          }}
          onClick={() => console.log('onClick')}
        />
      </Popover>
    </>
  );
};

export default ShareButton;
