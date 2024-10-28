import { Avatar, Flex, Form, Select, SelectProps } from 'antd';
import React, { PropsWithRef, useLayoutEffect, useState } from 'react';
import { PictureOutlined } from '@ant-design/icons';
import { getApplicationTypes } from '../../../../lib/developer/index.lib';
import { OptionItem } from '../index.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectApplicationType = React.forwardRef<any, PropsWithRef<SelectProps>>(
  (props, ref) => {
    const [options, setOptions] = useState<OptionItem[]>([]);

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
            ref={ref}
            {...props}
            showSearch
            placeholder="Search to Select"
            optionFilterProp="label"
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
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
  }
);

export default SelectApplicationType;
