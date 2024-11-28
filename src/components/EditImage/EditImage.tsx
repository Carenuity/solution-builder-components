import { Form, FormProps, message } from 'antd';
import React, { PropsWithRef, useState } from 'react';
import ImageCropper from '../ImageCropper';
import { CustomFormProps, EditImageFormFieldType } from './EditImage.types';
import { IImageCropper } from '../ImageCropper/ImageCropper.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditImage = React.forwardRef<any, PropsWithRef<CustomFormProps>>(
  ({ SubmitButton, dispatch, image, ...extraProps }, ref) => {
    const [file, setFile] = useState<File>();

    const componentVariant = 'filled';
    const formLayout = 'vertical';

    const onFinish: FormProps<EditImageFormFieldType>['onFinish'] = ({
      tag,
    }) => {
      const formData = new FormData();
      formData.set('tag', tag);

      if (file) {
        formData.set('file', file);
      } else {
        message.error('Please upload Image file!');
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
        >
          {/* Handle logo Field */}
          <ImageCropper
            {...extraProps}
            fallbackImageUrl={image?.url || extraProps.fallbackImageUrl}
            onCropChange={({ dataUrl, file }) => {
              setFile(() => file);

              if (extraProps.onCropChange) {
                extraProps.onCropChange({ dataUrl, file });
              }

              if (ref && typeof ref === 'object' && 'current' in ref) {
                const callback = (ref.current as IImageCropper).onCropChange;

                if (callback) {
                  callback({
                    dataUrl,
                    file,
                  });
                }
              }
            }}
          />

          {/* Handle tag Field */}
          <Form.Item
            name={'tag'}
            label="Tag"
            rules={[
              { required: true },
              { type: 'string', warningOnly: true },
              { type: 'string', max: 30 },
            ]}
            initialValue={image?.tag || 'main'}
            hidden
          />

          {/* Submit button */}
          <SubmitButton />
        </Form>
      </>
    );
  }
);

export default EditImage;
