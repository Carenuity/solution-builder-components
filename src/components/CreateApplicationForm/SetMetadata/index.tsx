import React, { useContext, useEffect, useState } from 'react';
import { Form, FormProps, message } from 'antd';
import { CreateApplicationContext } from '../CreateApplicationProvider';
import EditTag from '../../common/developer/EditTag';
import EditRepository from '../../common/developer/EditRepository';
import { sanitizeTag } from '../../common/developer/index.utils';
import SelectApplicationType from '../../common/developer/SelectApplication';
import { OptionItem } from '../../common/developer/index.types';
import SelectEcosystem from '../../common/developer/SelectEcosystem';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const SetMetadata = () => {
  const [componentVariant] = useState<FormProps['variant']>('filled');
  const [formLayout] = useState<LayoutType>('vertical');
  const { state, dispatch } = useContext(CreateApplicationContext);

  useEffect(() => {
    const { application, ecosystem, repository, tag } = state;
    if (application && ecosystem && repository && tag && !state.canProceed) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, [state]);

  useEffect(() => {
    const { application, ecosystem, repository } = state;
    if (state.canProceed && !application && !ecosystem && !repository) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, []);

  return (
    <>
      <Form
        layout={formLayout}
        variant={componentVariant}
        style={{ maxWidth: 600 }}
        initialValues={{ variant: componentVariant, layout: formLayout }}
      >
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
      </Form>
    </>
  );
};

export default SetMetadata;
