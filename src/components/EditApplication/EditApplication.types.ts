import { ButtonProps, FormProps } from 'antd';
import { ComponentType } from 'react';

export type EditApplicationFormFieldType = {
  name: string;
  description?: string;
};

export interface CustomFormProps extends FormProps {
  SubmitButton: ComponentType<ButtonProps>;
  mode: 'create' | 'update';
  application?: EditApplicationFormFieldType;
  dispatch?: (formData: FormData) => void | Promise<void>;
}
