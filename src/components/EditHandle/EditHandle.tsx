import { Col, Form, FormProps, Input, message, Row } from 'antd';
import React, { PropsWithRef, useState } from 'react';
import ImageCropper from '../ImageCropper';
import { CustomFormProps, EditHandleFormFieldType } from './EditHandle.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditHandle = React.forwardRef<any, PropsWithRef<CustomFormProps>>(
  ({ SubmitButton, dispatch, handle, mode, ...extraProps }, ref) => {
    const [iconFile, setIconFile] = useState<File>();

    const componentVariant = 'filled';
    const formLayout = 'vertical';

    const onFinish: FormProps<EditHandleFormFieldType>['onFinish'] = ({
      tag,
      url,
    }) => {
      const formData = new FormData();
      formData.set('tag', tag);

      if (url) {
        formData.set('url', url);
      }

      if (iconFile) {
        formData.set('icon', iconFile);
      } else if (mode === 'create') {
        message.error('Please upload handle icon!');
        return;
      }

      if (dispatch) {
        dispatch(formData);
      }
    };

    return (
      <>
        <Form
          layout={formLayout}
          variant={componentVariant}
          initialValues={{ variant: componentVariant, layout: formLayout }}
          onFinish={onFinish}
          {...extraProps}
          ref={ref}
        >
          <Row gutter={16}>
            <Col xs={24} md={6}>
              {/* Handle logo Field */}
              <Form.Item label="Icon" required>
                <ImageCropper
                  fallbackImageUrl={
                    handle?.icon ||
                    `https://image-placeholder.com/images/actual-size/57x57.png`
                  }
                  aspectRatio={1}
                  isCircularCrop={true}
                  minHeight={30}
                  minWidth={30}
                  onCropChange={({ file }) => {
                    setIconFile(() => file);
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={18}>
              {/* Handle tag Field */}
              <Form.Item
                name={'tag'}
                label="Tag"
                rules={[
                  { required: true },
                  { type: 'string', warningOnly: true },
                  { type: 'string', max: 30 },
                ]}
                initialValue={handle?.tag}
              >
                <Input placeholder="handle tag" maxLength={30} />
              </Form.Item>

              {/* Handle default url Field */}
              <Form.Item
                name={'url'}
                label="Default url"
                rules={[
                  // { required: true },
                  { type: 'url', warningOnly: true },
                ]}
                initialValue={handle?.url}
              >
                <Input placeholder="https://" />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit button */}
          <SubmitButton />
        </Form>
      </>
    );
  }
);

export default EditHandle;
