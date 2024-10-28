import { Avatar, Flex, Form, Select } from 'antd';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { OptionItem } from './index.types';
import { PictureOutlined } from '@ant-design/icons';
import { UpdateApplicationContext } from '../../UpdateApplicationProvider';
import { getApplicationTypes } from '../../../../lib/developer/index.lib';

const SelectApplication = () => {
  const [options, setOptions] = useState<OptionItem[]>([]);
  const { state, dispatch } = useContext(UpdateApplicationContext);

  useLayoutEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const timeoutId = setTimeout(async () => {
      const applications = await getApplicationTypes({ signal });

      if (applications.length > 0) {
        const _options = applications.map(({ id, name, avatars }) => ({
          value: id,
          image: avatars[0].url,
          label: name,
        }));
        setOptions(() => _options);
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Form.Item label={'Type of Application'} required>
        <Select
          showSearch
          placeholder="Search to Select"
          defaultValue={state.application?.id}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={(value, option) => {
            const { label } = option as OptionItem;

            dispatch({
              type: 'SET',
              category: 'application',
              value: { id: value, name: label },
            });
          }}
          options={options}
          optionRender={({ data: { image, label } }) => (
            <>
              <Flex align={'center'} gap={'middle'}>
                <Avatar
                  src={image}
                  alt="icon"
                  icon={<PictureOutlined />}
                  shape={'square'}
                />
                <span>{label}</span>
              </Flex>
            </>
          )}
        />
      </Form.Item>
    </>
  );
};

export default SelectApplication;
