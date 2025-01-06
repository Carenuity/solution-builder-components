import {
  CodeOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Flex, Tooltip, Typography } from 'antd';
import React from 'react';
import Slider from '../../../common/Slider';
import SolutionHardware from './components/SolutionHardware';
import SolutionStatistic from './components/SolutionStatistic';
import { SolutionPreviewProps } from './index.types';
import { useScreenSize } from '../../../common/hooks/ScreenSize.hook';
import { screenThreshold } from '../../Solution.constants';

const { Title } = Typography;

const SolutionPreview: React.FC<SolutionPreviewProps> = ({
  actuator,
  applicationCategories,
  ecosystem,
  microcontroller,
  name,
  sensor,
  contributors,
  rating,
  shopUrl,
  totalApplications,
  viewport,
  setApplicationPageUrl,
  setManufacturerSolutionsPageUrl,
}) => {
  const { width } = useScreenSize();
  return (
    <>
      <Flex
        vertical={true}
        justify={'space-between'}
        gap={5}
        style={{
          paddingRight: '.5rem',
          height: width > screenThreshold ? viewport.height : undefined,
        }}
      >
        {/* Title */}
        <Title
          level={5}
          ellipsis={true}
          title={name}
          style={{ paddingTop: '.3rem' }}
        >
          {name}
        </Title>

        {/* Applications slider */}
        <Slider
          items={applicationCategories}
          applicationPageUrlGenerator={setApplicationPageUrl}
        />

        {/* Hardware setup */}
        <Flex vertical={true} align={'end'}>
          <Avatar.Group
            size={'large'}
            max={{
              count: 4,
              style: {
                color: '#f56a00',
                backgroundColor: '#fde3cf',
              },
            }}
          >
            {/* Sensor Details */}
            {sensor && (
              <SolutionHardware
                borderColor={'#0963ab'}
                imageUrl={sensor.logo}
                manufacturerPopoverContent={{
                  name: sensor.manufacturer.name,
                  logo: sensor.manufacturer.logo,
                  shopUrl: sensor.shopUrl,
                  solutionsUrl: setManufacturerSolutionsPageUrl
                    ? setManufacturerSolutionsPageUrl(
                        sensor.manufacturer.id,
                        'sensor'
                      )
                    : undefined,
                }}
                manufacturerPopoverTitle={{
                  shieldName: sensor.name,
                  type: 'sensor',
                }}
              />
            )}

            {/* Micro-controller Details */}
            <SolutionHardware
              borderColor={'#52306d'}
              imageUrl={microcontroller.logo}
              manufacturerPopoverContent={{
                name: microcontroller.manufacturer.name,
                logo: microcontroller.manufacturer.logo,
                shopUrl: microcontroller.shopUrl,
                solutionsUrl: setManufacturerSolutionsPageUrl
                  ? setManufacturerSolutionsPageUrl(
                      microcontroller.manufacturer.id,
                      'micro-controller'
                    )
                  : undefined,
              }}
              manufacturerPopoverTitle={{
                shieldName: microcontroller.name,
                type: 'micro-controller',
              }}
            />

            {/* Actuator Details */}
            {actuator && (
              <SolutionHardware
                borderColor={'#003669'}
                imageUrl={actuator.logo}
                manufacturerPopoverContent={{
                  name: actuator.manufacturer.name,
                  logo: actuator.manufacturer.logo,
                  shopUrl: actuator.shopUrl,
                  solutionsUrl: setManufacturerSolutionsPageUrl
                    ? setManufacturerSolutionsPageUrl(
                        actuator.manufacturer.id,
                        'actuator'
                      )
                    : undefined,
                }}
                manufacturerPopoverTitle={{
                  shieldName: actuator.name,
                  type: 'actuator',
                }}
              />
            )}

            {/* Ecosystem Details */}
            {ecosystem && (
              <Tooltip title={ecosystem.name} placement="top">
                <Avatar
                  src={ecosystem.logo}
                  style={{
                    backgroundColor: '#fff',
                    border: '.1rem solid #235637',
                  }}
                />
              </Tooltip>
            )}
          </Avatar.Group>
        </Flex>

        <Flex vertical={false} align={'end'} justify={'space-between'}>
          {/* Contributors Statistics */}
          {contributors && (
            <SolutionStatistic
              icon={<TeamOutlined />}
              title={'Contributors'}
              value={contributors}
            />
          )}

          {/* Applications Statistics */}
          {totalApplications && (
            <SolutionStatistic
              icon={<CodeOutlined />}
              title={'Applications'}
              value={totalApplications}
            />
          )}

          {/* Verification Statistics */}
          {/* {isVerified && (
            <SolutionStatistic
              icon={<SafetyOutlined />}
              title={'Verification'}
              value={'Tested'}
              valueColor={'#3f8600'}
            />
          )}
          {!isVerified && (
            <SolutionStatistic
              icon={<CloseOutlined />}
              title={'Verification'}
              value={'Pending'}
              valueColor={'#DC3545'}
            />
          )} */}

          {/* Rating Statistics */}
          {rating && (
            <SolutionStatistic
              icon={<StarOutlined />}
              title={'Rating'}
              value={rating}
            />
          )}

          {/* Buy button */}
          {shopUrl && (
            <Button
              href={shopUrl}
              type={'link'}
              icon={<ShoppingCartOutlined />}
              shape={'round'}
              target={'_blank'}
            >
              Buy
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default SolutionPreview;
