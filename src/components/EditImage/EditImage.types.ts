import { ButtonProps } from 'antd';
import { ComponentType } from 'react';
import { IImageCropper } from '../ImageCropper/ImageCropper.types';

export type EditImageFormFieldType = {
  tag: string;
  url: string;
};

export interface CustomFormProps extends IImageCropper {
  SubmitButton: ComponentType<ButtonProps>;
  image?: EditImageFormFieldType;
  dispatch?: (formData: FormData) => void | Promise<void>;
}
