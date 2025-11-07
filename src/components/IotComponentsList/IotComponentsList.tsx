import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Image, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { imageFallback } from '../../utils/constants.utils';
import useSbNotification from '../Notification';
import { NextPageOffset, TableParams } from '../../utils/types.utils';
import {
  IIotComponentsList,
  IotComponentDataType,
} from './IotComponentsList.types';
import {
  deleteIotComponent,
  fetchIotComponents,
} from './IotComponentsList.utils';

type OnChange = NonNullable<TableProps<IotComponentDataType>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ITEMS_PER_PAGE = 10;

const IotComponentsList: React.FC<IIotComponentsList> = ({
  accessToken,
  onDeleteIotComponent,
  editIconUrlCallback,
  editInfoUrlCallback,
}) => {
  const [iotComponents, setIotComponents] = useState<IotComponentDataType[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalIotComponents, setTotalIotComponents] = useState(0);
  const [nextPageOffset, setNextPageOffset] = useState<NextPageOffset>({
    1: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    total: ITEMS_PER_PAGE,
    currentPage: 1,
  });
  const [context, openNotification] = useSbNotification();

  const iotComponentDeletionController = new AbortController();
  let iotComponentDeletionTimeout: string | number | NodeJS.Timeout | undefined;

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);

    if (pagination.current !== tableParams.currentPage) {
      setTableParams((old) => ({ ...old, currentPage: pagination.current }));
      setIotComponents(() => []);
      setSortedInfo({});
    }
  };

  const columns: TableColumnsType<IotComponentDataType> = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 70,
      render: (text: string) => (
        <>
          <Image
            src={text}
            fallback={imageFallback}
            alt="component icon"
            style={{ maxWidth: '3rem', height: 'auto', borderRadius: '.3rem' }}
          />
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      key: 'name',
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{record.name}</>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      ellipsis: true,
      key: 'category',
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.category.localeCompare(b.category);
        } else {
          return b.category.localeCompare(a.category);
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{record.category}</>,
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      ellipsis: true,
      key: 'manufacturer',
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.manufacturer.localeCompare(b.manufacturer);
        } else {
          return b.manufacturer.localeCompare(a.manufacturer);
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{record.manufacturer}</>,
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      // fixed: 'right',
      // width: 100,
      render: (_, record) => (
        <Space size="middle">
          {context}

          <Button
            type={'link'}
            color={'primary'}
            variant={'outlined'}
            shape="circle"
            title={`Edit ${record.name}`}
            href={editInfoUrlCallback(record.key as string)}
            icon={<EditOutlined />}
          />

          <Button
            type={'link'}
            color={'primary'}
            variant={'outlined'}
            shape="circle"
            title="Replace Icon"
            href={editIconUrlCallback(record.key as string)}
            icon={<FileImageOutlined />}
          />

          <Popconfirm
            title={
              <>
                {!record.name && 'Delete the IoT Component?'}
                {record.name && (
                  <>
                    Delete{' '}
                    <em style={{ textDecoration: 'underline' }}>
                      {record.name}
                    </em>{' '}
                    component?
                  </>
                )}
              </>
            }
            description={'Are you sure to delete this IoT component?'}
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              iotComponentDeletionTimeout = setTimeout(async () => {
                try {
                  await deleteIotComponent({
                    accessToken,
                    iotComponentId: record.key as string,
                    signal: iotComponentDeletionController.signal,
                  });

                  openNotification({
                    message: `IoT component ${record.name ? '(' + record.name + ')' : ''} deleted successfully`,
                    type: 'success',
                  });

                  if (onDeleteIotComponent) {
                    setTimeout(onDeleteIotComponent, 1000);
                  }
                } catch (error) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const err = error as any;
                  openNotification({
                    message: err.message,
                    type: 'error',
                  });
                }
              }, 0);
            }}
          >
            <Button
              type={'default'}
              color={'danger'}
              variant={'outlined'}
              shape="circle"
              title="Delete"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const scroll: { x?: number | string; y?: number | string } = {};
  scroll.y = '23rem';
  // scroll.x = '100vw';

  const tableProps: TableProps<IotComponentDataType> = {
    loading,
    size: 'small',
    scroll,
    title: () => `${totalIotComponents} IoT Components`,
    showHeader: true,
    pagination: {
      position: ['none', 'bottomRight'],
      total: tableParams.total,
      showSizeChanger: false,
    },
    onChange: handleChange,
  };

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      // Load my IoT Components
      const { nextPageStart, iotComponents: data } = await fetchIotComponents({
        signal: controller.signal,
        offset: nextPageOffset[tableParams.currentPage as number],
      });

      const nextPage = (tableParams.currentPage as number) + 1;

      if (!Object.keys(nextPageOffset).includes(String(nextPage))) {
        setTableParams((old) => ({
          ...old,
          total: nextPageStart ? old.total + data.length : old.total,
        }));

        setTotalIotComponents((old) => old + data.length);
      }

      if (nextPageStart) {
        setNextPageOffset((old) => ({
          ...old,
          [nextPage]: nextPageStart,
        }));
      }

      setIotComponents(() => data);
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(iotComponentDeletionTimeout);
      controller.abort();
      iotComponentDeletionController.abort();
    };
  }, [tableParams.currentPage]);

  return (
    <div>
      <Table<IotComponentDataType>
        {...tableProps}
        columns={columns}
        dataSource={iotComponents}
        scroll={scroll}
      />
    </div>
  );
};

export default IotComponentsList;
