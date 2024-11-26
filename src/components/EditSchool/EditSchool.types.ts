import { ButtonProps, FormProps } from 'antd';
import { ComponentType } from 'react';

export type EditSchoolFormFieldType = {
  name: string;
  country: string;
  url: string;
  description: string;
};

export interface CustomFormProps extends FormProps {
  SubmitButton: ComponentType<ButtonProps>;
  mode: 'create' | 'update';
  school?: EditSchoolFormFieldType;
  dispatch?: (formData: FormData) => void | Promise<void>;
}
