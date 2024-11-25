import { ButtonProps, FormProps } from 'antd';
import { ComponentType } from 'react';

export interface CustomFormProps extends FormProps {
  SubmitButton: ComponentType<ButtonProps>;
  mode: 'create' | 'update';
  ecosystem?: { name: string; description: string };
  dispatch?: (formData: FormData) => void | Promise<void>;
}

export type EditEcosystemFormFieldType = {
  name: string;
  description: string;
};
