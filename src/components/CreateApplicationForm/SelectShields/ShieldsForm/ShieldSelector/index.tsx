import { Form, Select } from 'antd';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { IShieldSelector, OptionItem } from './index.types';
import { ShieldPreviewContext } from '../../ShieldsPreviewProvider';

const ShieldSelector: React.FC<IShieldSelector> = ({
  label,
  name,
  defaultValue,
  category: cat,
  shields,
}) => {
  const [options, setOptions] = useState<OptionItem[]>([]);
  const { dispatch } = useContext(ShieldPreviewContext);

  useLayoutEffect(() => {
    const defaultOptions = options.filter(
      ({ value }) => value === defaultValue
    );
    if (defaultOptions.length > 0) {
      const defaultOption = defaultOptions[0];
      dispatch({
        type: 'SET',
        shield: {
          category: cat,
          name: defaultOption.label,
          url: defaultOption.image,
          id: defaultOption.value,
        },
      });
    }
  }, [options]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const shieldsFilteredByCategory = shields.filter(
        ({ category }) => category === cat
      );

      const _options = shieldsFilteredByCategory.map(
        ({ id, name, avatars }) => ({
          value: id,
          label: name,
          image: avatars[0]?.url,
        })
      );

      if (_options.length > 0) {
        setOptions(() => _options);
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [shields]);

  return (
    <>
      <Form.Item label={label} name={name} required>
        <Select
          showSearch
          placeholder="Search to Select"
          defaultValue={defaultValue}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '')
              .toLowerCase()
              .localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={(value, option) => {
            const { image, label } = option as OptionItem;

            dispatch({
              type: 'SET',
              shield: { category: cat, name: label, url: image, id: value },
            });
          }}
          options={options}
        />
      </Form.Item>
    </>
  );
};

export default ShieldSelector;
