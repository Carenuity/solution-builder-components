import { ReadOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import parse from 'html-react-parser';
import React from 'react';
import { primaryColor } from '../../SolutionGroup.constants';
import { SolutionGroupDescriptionProps } from './index.types';

const { Text, Paragraph } = Typography;

const SolutionGroupDescription: React.FC<SolutionGroupDescriptionProps> = ({
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

export default SolutionGroupDescription;
