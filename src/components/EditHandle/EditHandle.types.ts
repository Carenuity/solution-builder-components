import { ButtonProps, FormProps } from 'antd';
import { ComponentType } from 'react';

export type EditHandleFormFieldType = {
  tag: string;
  icon: string;
  url?: string;
};

export interface CustomFormProps extends FormProps {
  SubmitButton: ComponentType<ButtonProps>;
  handle?: EditHandleFormFieldType;
  mode: 'create' | 'update';
  dispatch?: (formData: FormData) => void | Promise<void>;
}
