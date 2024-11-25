import { Col, Form, FormProps, Input, message, Row } from 'antd';
import React, { PropsWithRef, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import ImageCropper from '../ImageCropper';
import {
  CustomFormProps,
  EditEcosystemFormFieldType,
} from './EditEcosystem.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditEcosystem = React.forwardRef<any, PropsWithRef<CustomFormProps>>(
  ({ SubmitButton, dispatch, mode, ecosystem, ...extraProps }, ref) => {
    const [description, setDescription] = useState(ecosystem?.description);
    const [logoFile, setLogoFile] = useState<File>();
    const [bannerFile, setBannerFile] = useState<File>();

    const componentVariant = 'filled';
    const formLayout = 'vertical';

    const onFinish: FormProps<EditEcosystemFormFieldType>['onFinish'] = ({
      description,
      name,
    }) => {
      const formData = new FormData();
      formData.set('name', name);
      formData.set('description', description);

      if (mode === 'create') {
        if (logoFile) {
          formData.set('logo', logoFile);
        } else {
          message.error('Please upload ecosystem logo!');
          return;
        }

        if (bannerFile) {
          formData.set('banner', bannerFile);
        } else {
          message.error('Please upload ecosystem banner!');
          return;
        }
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
          // style={{ maxWidth: 600 }}
          initialValues={{ variant: componentVariant, layout: formLayout }}
          onFinish={onFinish}
          {...extraProps}
          ref={ref}
        >
          {/* Ecosystem name Field */}
          <Form.Item
            name={'name'}
            label="Name"
            rules={[
              { required: true },
              { type: 'string', warningOnly: true },
              { type: 'string', max: 50 },
            ]}
            initialValue={ecosystem?.name}
          >
            <Input placeholder="Matter" maxLength={50} />
          </Form.Item>

          {/* Ecosystem description Field */}
          <Form.Item
            name={'description'}
            label="Description"
            rules={[{ required: true }, { type: 'string', warningOnly: true }]}
            initialValue={description}
          >
            <RichTextEditor value={description} onChange={setDescription} />
          </Form.Item>

          {/* Attach files */}
          {mode === 'create' && (
            <Row gutter={16}>
              <Col xs={24} md={6}>
                {/* Ecosystem logo Field */}
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
                {/* Ecosystem banner Field */}
                <Form.Item label="Banner" required>
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

export default EditEcosystem;
