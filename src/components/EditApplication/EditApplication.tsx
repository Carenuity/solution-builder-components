import { Col, Form, FormProps, Input, message, Row } from 'antd';
import React, { PropsWithRef, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import ImageCropper from '../ImageCropper';
import {
  CustomFormProps,
  EditApplicationFormFieldType,
} from './EditApplication.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditApplication = React.forwardRef<any, PropsWithRef<CustomFormProps>>(
  ({ SubmitButton, dispatch, mode, application, ...extraProps }, ref) => {
    const [description, setDescription] = useState(application?.description);
    const [logoFile, setLogoFile] = useState<File>();
    const [bannerFile, setBannerFile] = useState<File>();

    const componentVariant = 'filled';
    const formLayout = 'vertical';

    const onFinish: FormProps<EditApplicationFormFieldType>['onFinish'] = ({
      name,
      description,
    }) => {
      const formData = new FormData();
      formData.set('name', name);

      if (description) {
        formData.set('description', description);
      }

      if (mode === 'create') {
        if (logoFile) {
          formData.set('logo', logoFile);
        } else {
          message.error('Please upload application logo!');
          return;
        }

        if (bannerFile) {
          formData.set('banner', bannerFile);
        }
        // else {
        //   message.error('Please upload application banner!');
        //   return;
        // }
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
          {/* Application name Field */}
          <Form.Item
            name={'name'}
            label="Name"
            rules={[
              { required: true },
              { type: 'string', warningOnly: true },
              { type: 'string', max: 255 },
            ]}
            initialValue={application?.name}
          >
            <Input placeholder="application name" maxLength={255} />
          </Form.Item>

          {/* Application description Field */}
          <Form.Item
            name={'description'}
            label="Description"
            // rules={[{ required: true }, { type: 'string', warningOnly: true }]}
            initialValue={description}
          >
            <RichTextEditor value={description} onChange={setDescription} />
          </Form.Item>

          {/* Attach files */}
          {mode === 'create' && (
            <Row gutter={16}>
              <Col xs={24} md={6}>
                {/* Application logo Field */}
                <Form.Item label="Logo" required>
                  <ImageCropper
                    fallbackImageUrl={`https://image-placeholder.com/images/actual-size/200x200.png`}
                    aspectRatio={1}
                    isCircularCrop={true}
                    minHeight={200}
                    minWidth={200}
                    onCropChange={({ file }) => {
                      setLogoFile(() => file);
                    }}
                  />
                </Form.Item>
              </Col>

              <Col className="gutter-row" md={18} xs={24}>
                {/* Application banner Field */}
                <Form.Item label="Banner">
                  <ImageCropper
                    fallbackImageUrl={`https://image-placeholder.com/images/actual-size/1136x640.png`}
                    aspectRatio={16 / 9}
                    isCircularCrop={false}
                    minHeight={640}
                    minWidth={1136}
                    onCropChange={({ file }) => {
                      setBannerFile(() => file);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}

          {/* Submit button */}
          <SubmitButton />
        </Form>
      </>
    );
  }
);

export default EditApplication;
