import { ManufacturerPopupProps } from './components/ManufacturerPopup/index.types';
import { ManufacturerPopupTitleProps } from './components/ManufacturerPopupTitle/index.types';

export type SolutionGroupHardwareProps = {
  manufacturerPopoverContent: ManufacturerPopupProps;
  manufacturerPopoverTitle: ManufacturerPopupTitleProps;
  imageUrl: string;
  borderColor: string;
};
