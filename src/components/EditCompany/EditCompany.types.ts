import { ButtonProps, FormProps } from 'antd';
import { ComponentType } from 'react';

export type EditCompanyFormFieldType = {
  name: string;
  country: string;
  description: string;
};

export interface CustomFormProps extends FormProps {
  SubmitButton: ComponentType<ButtonProps>;
  mode: 'create' | 'update';
  company?: EditCompanyFormFieldType;
  dispatch?: (formData: FormData) => void | Promise<void>;
}
