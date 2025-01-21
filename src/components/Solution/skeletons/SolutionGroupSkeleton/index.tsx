import { Avatar, Col, Flex, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useScreenSize } from '../../../common/hooks/ScreenSize.hook';
import {
  backgroundColor,
  borderRadius,
  screenThreshold,
} from '../../SolutionGroup/SolutionGroup.constants';

const SolutionGroupSkeleton = () => {
  const { width } = useScreenSize();
  const [isMobile, setIsMobile] = useState(width < screenThreshold);

  useEffect(() => {
    if (!window.document) {
      return;
    }

    setIsMobile(width < screenThreshold);
  }, [width]);

  return (
    <>
      <Row
        style={{
          ...(!isMobile && {
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            overflow: 'hidden',
          }),
          //   marginBottom: isMobile ? '.8rem' : undefined,
          width: '100%',
        }}
      >
        <Col xs={24} md={8} lg={6} xl={4}>
          <Flex
            justify={isMobile ? 'center' : 'start'}
            align={'center'}
            style={{ position: 'relative' }}
          >
            <Skeleton.Button
              active
              size={'large'}
              shape={'circle'}
              style={{
                position: 'absolute',
                ...(isMobile
                  ? {
                      bottom: '-7%',
                      right: '50%',
                      transform: `translateX(50%)`,
                    }
                  : {
                      top: '50%',
                      transform: `translateY(-50%)`,
                      right: '3%',
                    }),
              }}
            />

            <Skeleton.Image
              active
              style={{
                width: '15rem',
                height: '15rem',
                borderRadius: borderRadius,
              }}
            />
          </Flex>
        </Col>

        <Col xs={24} md={16} lg={18} xl={20}>
          <Flex
            vertical={true}
            gap={7}
            justify={'space-between'}
            style={{
              marginRight: !isMobile ? '1rem' : undefined,
              paddingBottom: '1rem',
              height: '100%',
            }}
          >
            <Skeleton.Input
              active
              size={'small'}
              style={{ width: '100%', marginTop: '.5rem' }}
            />

            <Skeleton.Button
              active
              size={'default'}
              shape={'round'}
              block={true}
            />

            <Flex justify={'end'}>
              <Avatar.Group
                size={'large'}
                max={{
                  count: 3,
                  style: {
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                  },
                }}
              >
                <Skeleton.Avatar active size={'large'} shape={'circle'} />
                <Skeleton.Avatar active size={'large'} shape={'circle'} />
                <Skeleton.Avatar active size={'large'} shape={'circle'} />
              </Avatar.Group>
            </Flex>

            <Flex justify={'center'} gap={24}>
              <Skeleton.Button
                active
                size={'small'}
                shape={'square'}
                style={{ width: '33%' }}
              />

              <Skeleton.Button
                active
                size={'small'}
                shape={'square'}
                style={{ width: '33%' }}
              />

              <Skeleton.Button
                active
                size={'small'}
                shape={'square'}
                style={{ width: '33%' }}
              />
            </Flex>
          </Flex>
        </Col>
      </Row>
    </>
  );
};

export default SolutionGroupSkeleton;
