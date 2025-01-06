import { ReadOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import React from 'react';
import { primaryColor } from '../../Solution.constants';
import parse from 'html-react-parser';
import { SolutionDescriptionProps } from './index.types';

const { Text, Paragraph } = Typography;

const SolutionDescription: React.FC<SolutionDescriptionProps> = ({
  viewport,
  description,
}) => {
  return (
    <>
      <Space
        style={{
          marginLeft: '.3rem',
          borderBottom: `.1rem solid ${primaryColor}`,
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

export default SolutionDescription;
