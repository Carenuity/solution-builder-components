import { Avatar, Flex, Form, Select } from 'antd';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { OptionItem } from './index.types';
import { getEcosystems } from './index.utils';
import { PictureOutlined } from '@ant-design/icons';
import { CreateApplicationContext } from '../../CreateApplicationProvider';

const SelectEcosystem = () => {
  const [options, setOptions] = useState<OptionItem[]>([]);
  const { dispatch } = useContext(CreateApplicationContext);

  useLayoutEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const timeoutId = setTimeout(async () => {
      const ecosystems = await getEcosystems({ signal });

      if (ecosystems.length > 0) {
        const _options = ecosystems.map(({ id, name, avatars }) => ({
          value: id,
          name,
          label: (
            <>
              <Flex align={'center'} gap={'middle'}>
                <Avatar
                  src={avatars[0]?.url}
                  alt="icon"
                  icon={<PictureOutlined />}
                />
                <span>{name}</span>
              </Flex>
            </>
          ),
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
      <Form.Item label={'Ecosystems'} required>
        <Select
          placeholder="Select Ecosystem"
          onChange={(value, option) => {
            const { name } = option as OptionItem;

            dispatch({
              type: 'SET',
              category: 'ecosystem',
              data: { id: value, name },
            });
          }}
          options={options}
        />
      </Form.Item>
    </>
  );
};

export default SelectEcosystem;
