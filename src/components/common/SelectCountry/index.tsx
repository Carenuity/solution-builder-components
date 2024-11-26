import { Flex, Select, SelectProps } from 'antd';
import React, { PropsWithRef, useLayoutEffect, useState } from 'react';
import { CountryOptionItem } from './index.types';
import { getCountryList } from './index.uttils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectCountry = React.forwardRef<any, PropsWithRef<SelectProps>>(
  (props, ref) => {
    const [options, setOptions] = useState<CountryOptionItem[]>([]);

    useLayoutEffect(() => {
      const timeoutId = setTimeout(async () => {
        const countries = getCountryList();

        setOptions(() => countries);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

    return (
      <>
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
          optionRender={({ data: { emoji, label } }) => (
            <>
              <Flex align={'center'} gap={'middle'}>
                <span>{emoji}</span>
                <span>{label}</span>
              </Flex>
            </>
          )}
        />
      </>
    );
  }
);

export default SelectCountry;
