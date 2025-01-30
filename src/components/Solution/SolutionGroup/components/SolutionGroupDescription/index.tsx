import { ReadOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import parse from 'html-react-parser';
import React from 'react';
import { SolutionGroupDescriptionProps } from './index.types';
import { useTheme } from 'antd-style';

const { Text, Paragraph } = Typography;

const SolutionGroupDescription: React.FC<SolutionGroupDescriptionProps> = ({
  viewport,
  description,
}) => {
  const token = useTheme();

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
      </Paragraph>
    </>
  );
};

export default SolutionGroupDescription;
