import { Statistic, Typography } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { useScreenSize } from '../../../../../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../../../SolutionGroup.constants';
import { SolutionGroupStatisticProps } from './index.types';

const { Text } = Typography;

const SolutionGroupStatistic: React.FC<SolutionGroupStatisticProps> = ({
  icon,
  title,
  value,
  valueColor,
}) => {
  const { width } = useScreenSize();
  const [titleContent, setTitleContent] = useState<ReactNode | undefined>();

  useEffect(() => {
    if (width <= screenThreshold) {
      setTitleContent(undefined);
    } else if (width > screenThreshold) {
      setTitleContent(
        <Text
          type={'secondary'}
          translate={'yes'}
          ellipsis
          style={{ fontSize: '.7rem' }}
        >
          {title}
        </Text>
      );
    }
  }, [width]);

  return (
    <Statistic
      title={titleContent}
      value={value}
      prefix={icon}
      valueStyle={{
        fontSize: '.85rem',
        color: valueColor,
        textAlign: 'center',
      }}
    />
  );
};

export default SolutionGroupStatistic;
