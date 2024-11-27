import { Col, Form, FormProps, Input, message, Row } from 'antd';
import React, { PropsWithRef, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import ImageCropper from '../ImageCropper';
import { CustomFormProps, EditCompanyFormFieldType } from './EditCompany.types';
import SelectCountry from '../common/SelectCountry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditCompany = React.forwardRef<any, PropsWithRef<CustomFormProps>>(
  ({ SubmitButton, dispatch, mode, company, ...extraProps }, ref) => {
    const [description, setDescription] = useState(company?.description);
    const [logoFile, setLogoFile] = useState<File>();
    const [bannerFile, setBannerFile] = useState<File>();

    const componentVariant = 'filled';
    const formLayout = 'vertical';

    const onFinish: FormProps<EditCompanyFormFieldType>['onFinish'] = ({
      name,
      country,
      description,
    }) => {
      const formData = new FormData();
      formData.set('name', name);
      formData.set('description', description);
      formData.set('country', country);

      if (mode === 'create') {
        if (logoFile) {
          formData.set('logo', logoFile);
        } else {
          message.error('Please upload company logo!');
          return;
        }

        if (bannerFile) {
          formData.set('banner', bannerFile);
        } else {
          message.error('Please upload company banner!');
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
          initialValues={{ variant: componentVariant, layout: formLayout }}
          onFinish={onFinish}
          {...extraProps}
          ref={ref}
        >
          {/* Company name Field */}
          <Form.Item
            name={'name'}
            label="Name"
            rules={[
              { required: true },
              { type: 'string', warningOnly: true },
              { type: 'string', max: 255 },
            ]}
            initialValue={company?.name}
          >
            <Input placeholder="company name" maxLength={255} />
          </Form.Item>

          {/* Company country Field */}
          <Form.Item
            name={'country'}
            label="Country"
            rules={[
              { required: true },
              { type: 'string', warningOnly: true },
              { type: 'string', max: 150 },
            ]}
            initialValue={company?.country}
          >
            <SelectCountry />
          </Form.Item>

          {/* Company description Field */}
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
                {/* Company logo Field */}
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
                {/* Company banner Field */}
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

export default EditCompany;
