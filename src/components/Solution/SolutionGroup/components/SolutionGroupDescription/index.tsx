import { ReadOutlined } from '@ant-design/icons';
import { Divider, Space, Typography } from 'antd';
import parse from 'html-react-parser';
import React, { useContext } from 'react';
import { SolutionGroupDescriptionProps } from './index.types';
import { useTheme } from 'antd-style';
import { SolutionGroupContext } from '../../context';

const { Text, Paragraph, Link } = Typography;

const SolutionGroupDescription: React.FC<SolutionGroupDescriptionProps> = ({
  viewport,
  description,
}) => {
  const token = useTheme();
  const { state } = useContext(SolutionGroupContext);

  return (
    <>
      <Space
        style={{
          marginLeft: '.3rem',
          borderBottom: `.1rem solid ${token.colorPrimary}`,
        }}
      >
        <ReadOutlined />
        <Text strong>Description</Text>
      </Space>
      <Paragraph
        ellipsis={{ rows: 6, expandable: true, symbol: 'more' }}
        style={{
          marginLeft: '.5rem',
          marginBottom: 0,
          paddingBottom: 0,
          paddingRight: '.2rem',
          height: viewport.height,
          overflowY: 'scroll',
        }}
      >
        {parse(description || '')}
        <Divider />
        <Paragraph>
          <ul>
            <li>
              Learn how to build within 3 minutes{' '}
              <Link
                href={'https://carenuity.com/install-for-free/'}
                target={'_blank'}
              >
                here
              </Link>
              .
            </li>

            <li>
              Find more applications with{' '}
              <Link
                href={
                  'https://solutions.carenuity.com/microcontrollers/4OQQy4edGswvbN6boCKw'
                }
                target={state.isWidget ? '_blank' : '_self'}
              >
                C3-Mini
              </Link>
              .
            </li>
          </ul>
        </Paragraph>
      </Paragraph>
    </>
  );
};

export default SolutionGroupDescription;
