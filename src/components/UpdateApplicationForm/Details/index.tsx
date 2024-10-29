import React, { useContext, useEffect, useState } from 'react';
import { Flex, Form, FormProps, message, Spin } from 'antd';
import { UpdateApplicationContext } from '../UpdateApplicationProvider';
import SelectApplicationType from '../../common/developer/SelectApplication';
import { OptionItem } from '../../common/developer/index.types';
import SelectEcosystem from '../../common/developer/SelectEcosystem';
import EditRepository from '../../common/developer/EditRepository';
import EditTag from '../../common/developer/EditTag';
import { sanitizeTag } from '../../common/developer/index.utils';
import { getApplicationPreview } from '../../../lib/developer/index.lib';
import { IDetails } from './index.types';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const Details: React.FC<IDetails> = ({ applicationId }) => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const { state, dispatch } = useContext(UpdateApplicationContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { application, ecosystem, repository, tag } = state;
    if (application && ecosystem && repository && tag && !state.canProceed) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, [state]);

  useEffect(() => {
    const { application, ecosystem, repository, tag } = state;
    if (state.canProceed && !application && !ecosystem && !repository && !tag) {
      dispatch({ category: 'proceed', type: 'SET' });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      const applicationPreview = await getApplicationPreview({
        applicationId,
        signal: controller.signal,
      });

      if (applicationPreview) {
        if (!state.application) {
          dispatch({
            category: 'application',
            type: 'SET',
            value: { id: applicationPreview.application_id, name: '' },
          });
        }

        if (!state.ecosystem) {
          dispatch({
            category: 'ecosystem',
            type: 'SET',
            value: { id: applicationPreview.ecosystem_id, name: '' },
          });
        }

        if (!state.repository) {
          dispatch({
            category: 'repository',
            type: 'SET',
            value: applicationPreview.repository,
          });
        }

        if (!state.tag) {
          dispatch({
            category: 'tag',
            type: 'SET',
            value: applicationPreview.tag,
          });
        }

        if (!state.chipFamily) {
          dispatch({
            category: 'chip_family',
            type: 'SET',
            value: applicationPreview.chip_family,
          });
        }
      }

      setIsLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <>
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
              defaultValue={state.tag}
              onBlur={(e) => {
                const { value } = e.target;
                const targetValue = sanitizeTag(value);
                dispatch({
                  type: 'SET',
                  category: 'tag',
                  value: targetValue,
                });
              }}
            />

            <EditRepository
              defaultValue={state.repository}
              onBlur={(e) => {
                const { value } = e.target;
                const valid = /^https:\/\/github\.com\/.*/.test(value);
                if (!valid) {
                  e.target.setCustomValidity('Invalid GitHub repository URL');
                  message.error('Invalid GitHub repository URL');
                } else {
                  e.target.setCustomValidity('');
                  dispatch({
                    type: 'SET',
                    category: 'repository',
                    value,
                  });
                }
              }}
            />

            <SelectApplicationType
              defaultValue={state.application?.id}
              onChange={(value, option) => {
                const { label } = option as OptionItem;

                dispatch({
                  type: 'SET',
                  category: 'application',
                  value: { id: value, name: label },
                });
              }}
            />

            <SelectEcosystem
              defaultValue={state.ecosystem?.id}
              onChange={(value, option) => {
                const { label } = option as OptionItem;

                dispatch({
                  type: 'SET',
                  category: 'ecosystem',
                  value: { id: value, name: label },
                });
              }}
            />
          </>
        )}
      </Form>
    </>
  );
};

export default Details;
