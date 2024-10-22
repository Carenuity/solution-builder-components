import { PictureOutlined } from '@ant-design/icons';
import { Avatar, Flex, Form, Select } from 'antd';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { CreateApplicationContext } from '../../CreateApplicationProvider';
import { OptionItem } from './index.types';
import { getEcosystems } from './index.utils';

const SelectEcosystem = () => {
  const [options, setOptions] = useState<OptionItem[]>([]);
  const { state, dispatch } = useContext(CreateApplicationContext);

  useLayoutEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const timeoutId = setTimeout(async () => {
      const ecosystems = await getEcosystems({ signal });

      if (ecosystems.length > 0) {
        const _options = ecosystems.map(({ id, name, avatars }) => ({
          value: id,
          label: name,
          image: avatars[0].url,
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
      <Form.Item label={'EcoSystem'} required>
        <Select
          placeholder="Select Ecosystem"
          defaultValue={state.ecosystem?.id}
          onChange={(value, option) => {
            const { label } = option as OptionItem;

            dispatch({
              type: 'SET',
              category: 'ecosystem',
              data: { id: value, name: label },
            });
          }}
          options={options}
          optionRender={({ data: { label, image } }) => {
            return (
              <>
                <Flex align={'center'} gap={'middle'}>
                  <Avatar src={image} alt="icon" icon={<PictureOutlined />} />
                  <span>{label}</span>
                </Flex>
              </>
            );
          }}
        />
      </Form.Item>
    </>
  );
};

export default SelectEcosystem;
