import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, FormProps, message, Spin } from 'antd';
import SelectApplicationType from '../../common/developer/SelectApplication';
import SelectEcosystem from '../../common/developer/SelectEcosystem';
import EditRepository from '../../common/developer/EditRepository';
import EditTag from '../../common/developer/EditTag';
import { sanitizeTag } from '../../common/developer/index.utils';
import { getApplicationPreview } from '../../../lib/developer/index.lib';
import { ApplicationMetadata, IEditApplicationMetadata } from './index.types';
import { handleUpdateApplicationDetails } from './index.utils';
import useSbNotification from '../../Notification';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const EditApplicationMetadata: React.FC<IEditApplicationMetadata> = ({
  applicationId,
  accessToken,
}) => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<ApplicationMetadata>({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [context, openNotification] = useSbNotification();

  let updateTimeoutId: string | number | NodeJS.Timeout | undefined;
  const updateController = new AbortController();

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      const applicationPreview = await getApplicationPreview({
        applicationId,
        signal: controller.signal,
      });
      setPreview((old) => ({ ...old, ...applicationPreview }));

      setIsLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(updateTimeoutId);
      controller.abort();
      updateController.abort();
    };
  }, []);

  return (
    <>
      {context}

      <Form
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
        {isLoading && (
          <Flex align={'center'} justify={'center'}>
            <Spin tip="Loading" size="large" />
          </Flex>
        )}

        {!isLoading && (
          <>
            <EditTag
              defaultValue={preview.tag}
              onBlur={(e) => {
                const { value } = e.target;
                const targetValue = sanitizeTag(value);
                setPreview((old) => ({ ...old, tag: targetValue }));
              }}
            />

            <EditRepository
              defaultValue={preview.repository}
              onBlur={(e) => {
                const { value } = e.target;
                const valid = /^https:\/\/github\.com\/.*/.test(value);
                if (!valid) {
                  e.target.setCustomValidity('Invalid GitHub repository URL');
                  message.error('Invalid GitHub repository URL');
                } else {
                  e.target.setCustomValidity('');
                  setPreview((old) => ({ ...old, repository: value }));
                }
              }}
            />

            <SelectApplicationType
              defaultValue={preview.application_id}
              onChange={(value) => {
                setPreview((old) => ({ ...old, application_id: value }));
              }}
            />

            <SelectEcosystem
              defaultValue={preview.ecosystem_id}
              onChange={(value) => {
                setPreview((old) => ({ ...old, ecosystem_id: value }));
              }}
            />

            <Button
              style={{ margin: '0 8px' }}
              type={'primary'}
              shape={'round'}
              disabled={isDisabled}
              onClick={() => {
                updateTimeoutId = setTimeout(async () => {
                  setIsDisabled(true);
                  try {
                    const response = await handleUpdateApplicationDetails({
                      signal: updateController.signal,
                      id: applicationId,
                      tag: preview.tag,
                      access_token: accessToken,
                      application_id: preview.application_id,
                      ecosystem_id: preview.ecosystem_id,
                      repository: preview.repository,
                    });

                    openNotification({
                      message: 'Application successfully updated',
                      description: `Tag: ${response?.tag}`,
                      type: 'success',
                    });
                  } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const err = error as any;
                    openNotification({
                      message: err.message,
                      type: 'error',
                    });
                  }
                  setIsDisabled(false);
                }, 0);
              }}
            >
              Update
            </Button>
          </>
        )}
      </Form>
    </>
  );
};

export default EditApplicationMetadata;
