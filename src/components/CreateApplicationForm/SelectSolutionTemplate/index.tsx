import React, { useContext, useEffect, useState } from 'react';
import { Image, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { DataType } from './index.types';
import { CreateApplicationContext } from '../CreateApplicationProvider';
import { getSolutionTemplates } from './index.utils';
import SolutionTemplateNotFound from './index.not-found';

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    render: (text: string) => (
      <>
        {/* <Avatar
          src={text}
          alt="solution image"
          shape={'square'}
          size={'large'}
        /> */}
        <Image
          src={text}
          alt="solution image"
          style={{ maxWidth: '3rem', height: 'auto', borderRadius: '.3rem' }}
        />
      </>
    ),
  },
];

const defaultTitle = () => 'Groups of solutions';

const SelectSolutionTemplate: React.FC = () => {
  const [solutions, setSolutions] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectionType] = useState<'checkbox' | 'radio'>('radio');
  const { state, dispatch } = useContext(CreateApplicationContext);

  // rowSelection object indicates the need for row selection
  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      if (selectedRows[0]) {
        const id = selectedRowKeys[0] as string;
        dispatch({
          type: 'SET',
          category: 'solution',
          value: {
            id,
            name: selectedRows[0].name,
          },
        });
      }
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  const tableProps: TableProps<DataType> = {
    loading,
    size: 'small',
    title: defaultTitle,
    showHeader: true,
    pagination: { position: ['none', 'none'] },
  };

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      if (state.actuator && state.microcontroller && state.sensor) {
        setLoading(true);
        const data = await getSolutionTemplates({
          actuatorId: state.actuator.id,
          microcontrollerId: state.microcontroller.id,
          sensorId: state.sensor.id,
          signal: controller.signal,
        });
        setSolutions(() => data);
        setLoading(false);
      }
    }, 0);

    // check to allow proceeding
    const { solution } = state;
    if (solution && !state.canProceed) {
      dispatch({ category: 'proceed', type: 'SET' });
    }

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [state]);

  useEffect(() => {
    // set can proceed flag to false
    const { solution } = state;
    if (state.canProceed && !solution) {
      dispatch({ category: 'proceed', type: 'SET' });
    }
  }, []);

  return (
    <>
      <div>
        {!loading && solutions.length === 0 && (
          <SolutionTemplateNotFound
            actuator={state.actuator?.name}
            microcontroller={state.microcontroller?.name}
            sensor={state.sensor?.name}
          />
        )}

        {(loading || solutions.length > 0) && (
          <Table<DataType>
            {...tableProps}
            rowSelection={{
              type: selectionType,
              ...rowSelection,
              defaultSelectedRowKeys: state.solution?.id
                ? [state.solution.id]
                : undefined,
            }}
            columns={columns}
            dataSource={solutions}
          />
        )}
      </div>
    </>
  );
};

export default SelectSolutionTemplate;
