import { ButtonProps, FormProps } from 'antd';
import { ComponentType } from 'react';

export type EditApplicationTypeFormFieldType = {
  name: string;
  description?: string;
};

export interface CustomFormProps extends FormProps {
  SubmitButton: ComponentType<ButtonProps>;
  mode: 'create' | 'update';
  application?: EditApplicationTypeFormFieldType;
  dispatch?: (formData: FormData) => void | Promise<void>;
}
