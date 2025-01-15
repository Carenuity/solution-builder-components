import { PictureOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';
import React from 'react';
import { ManufacturerPopup } from './components/ManufacturerPopup';
import ManufacturerPopupTitle from './components/ManufacturerPopupTitle';
import { SolutionGroupHardwareProps } from './index.types';

const SolutionGroupHardware: React.FC<SolutionGroupHardwareProps> = ({
  manufacturerPopoverContent,
  manufacturerPopoverTitle,
  borderColor,
  imageUrl,
}) => {
  return (
    <>
      <Popover
        content={<ManufacturerPopup {...manufacturerPopoverContent} />}
        title={<ManufacturerPopupTitle {...manufacturerPopoverTitle} />}
      >
        <Avatar
          src={imageUrl}
          icon={<PictureOutlined />}
          style={{
            backgroundColor: borderColor,
            border: `.1rem solid ${borderColor}`,
          }}
        />
      </Popover>
    </>
  );
};

export default SolutionGroupHardware;
