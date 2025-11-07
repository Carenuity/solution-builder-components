import React, { useEffect, useState } from 'react';
import { Button, Flex, Image, Popconfirm, Space, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { imageFallback } from '../../utils/constants.utils';
import {
  DeleteOutlined,
  FileImageOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import useSbNotification from '../Notification';
import { NextPageOffset, TableParams } from '../../utils/types.utils';
import {
  AdminSolutionGroupDataType,
  FilterListItem,
  IAdminSolutionGroupsList,
} from './AdminSolutionGroupsList.types';
import {
  deleteSolutionGroup,
  fetchSolutionGroups,
} from './AdminSolutionGroupsList.utils';
import { fetchIotComponents } from '../IotComponentsList/IotComponentsList.utils';

type OnChange = NonNullable<TableProps<AdminSolutionGroupDataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ITEMS_PER_PAGE = 10;

const AdminSolutionGroupsList: React.FC<IAdminSolutionGroupsList> = ({
  accessToken,
  editImageUrlCallback,
  onDeleteSolutionGroup,
}) => {
  const [solutionGroups, setSolutionGroups] = useState<
    AdminSolutionGroupDataType[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [microFilters, setMicroFilters] = useState<
    FilterListItem[] | undefined
  >();
  const [sensorFilters, setSensorFilters] = useState<
    FilterListItem[] | undefined
  >();
  const [actuatorFilters, setActuatorFilters] = useState<
    FilterListItem[] | undefined
  >();

  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalSolutionGroups, setTotalSolutionGroups] = useState(0);
  const [nextPageOffset, setNextPageOffset] = useState<NextPageOffset>({
    1: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    total: ITEMS_PER_PAGE,
    currentPage: 1,
  });
  const [shields, setShields] = useState<{
    sensorId?: string;
    microId?: string;
    actuatorId?: string;
  }>({});
  const [context, openNotification] = useSbNotification();

  const solutionDeletionController = new AbortController();
  let solutionDeletionTimeout: string | number | NodeJS.Timeout | undefined;
  let dataLoadTimeout: string | number | NodeJS.Timeout | undefined;

  const handleChange: OnChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);

    const actuatorIds = filters.actuator;
    if (actuatorIds && actuatorIds.length > 0) {
      setShields((old) => ({ ...old, actuatorId: actuatorIds[0] as string }));
    } else {
      setShields((old) => ({ ...old, actuatorId: undefined }));
    }

    const microIds = filters.micro;
    if (microIds && microIds.length > 0) {
      setShields((old) => ({ ...old, microId: microIds[0] as string }));
    } else {
      setShields((old) => ({ ...old, microId: undefined }));
    }

    const sensorIds = filters.sensor;
    if (sensorIds && sensorIds.length > 0) {
      setShields((old) => ({ ...old, sensorId: sensorIds[0] as string }));
    } else {
      setShields((old) => ({ ...old, sensorId: undefined }));
    }

    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);

    if (pagination.current !== tableParams.currentPage) {
      setTableParams((old) => ({ ...old, currentPage: pagination.current }));
      setSolutionGroups(() => []);
      setFilteredInfo({});
      setSortedInfo({});
      setShields({});
    }
  };

  const columns: TableColumnsType<AdminSolutionGroupDataType> = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: 70,
      render: (text: string) => (
        <>
          <Image
            src={text}
            fallback={imageFallback}
            alt="solution image"
            style={{ maxWidth: '3rem', height: 'auto', borderRadius: '.3rem' }}
          />
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ellipsis: true,
      render: (text: string | undefined) => <>{text}</>,
    },
    {
      title: 'Sensor',
      dataIndex: 'sensor',
      ellipsis: true,
      key: 'sensor',
      sortDirections: ['descend', 'ascend'],
      filters: sensorFilters,
      filterMultiple: false,
      filteredValue: filteredInfo.sensor || null,
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.sensor.name.localeCompare(b.sensor.name);
        } else {
          return b.sensor.name.localeCompare(a.sensor.name);
        }
      },
      render: (_, record) => <>{record.sensor.name}</>,
    },
    {
      title: 'Micro',
      dataIndex: 'micro',
      ellipsis: true,
      key: 'micro',
      sortDirections: ['descend', 'ascend'],
      filters: microFilters,
      filterMultiple: false,
      filteredValue: filteredInfo.micro || null,
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.micro.name.localeCompare(b.micro.name);
        } else {
          return b.micro.name.localeCompare(a.micro.name);
        }
      },
      render: (_, record) => <>{record.micro.name}</>,
    },
    {
      title: 'Actuator',
      dataIndex: 'actuator',
      ellipsis: true,
      key: 'actuator',
      sortDirections: ['descend', 'ascend'],
      filters: actuatorFilters,
      filterMultiple: false,
      filteredValue: filteredInfo.actuator || null,
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.actuator.name.localeCompare(b.actuator.name);
        } else {
          return b.actuator.name.localeCompare(a.actuator.name);
        }
      },
      render: (_, record) => <>{record.actuator.name}</>,
    },
    {
      title: 'Actions',
      dataIndex: 'key',
      render: (_, record) => (
        <Space size="middle">
          {context}

          <Button
            type={'link'}
            color={'primary'}
            variant={'outlined'}
            shape="circle"
            title="Replace Image"
            href={editImageUrlCallback(record.key as string)}
            icon={<FileImageOutlined />}
          />

          <Popconfirm
            title={
              <>
                {!record.name && 'Delete the solution group?'}
                {record.name && (
                  <>
                    Delete{' '}
                    <em style={{ textDecoration: 'underline' }}>
                      {record.name}
                    </em>{' '}
                    ?
                  </>
                )}
              </>
            }
            description={'Are you sure to delete this solution group?'}
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              solutionDeletionTimeout = setTimeout(async () => {
                try {
                  await deleteSolutionGroup({
                    accessToken,
                    solutionId: record.key as string,
                    signal: solutionDeletionController.signal,
                  });

                  openNotification({
                    message: `Solution group ${record.name ? '(' + record.name + ')' : ''} deleted successfully`,
                    type: 'success',
                  });

                  if (onDeleteSolutionGroup) {
                    setTimeout(onDeleteSolutionGroup, 1000);
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

  const tableProps: TableProps<AdminSolutionGroupDataType> = {
    loading,
    size: 'small',
    scroll,
    title: () => (
      <>
        <Flex gap={10} vertical={false} align={'center'}>
          <span>{totalSolutionGroups} Solution Groups</span>

          <Button
            variant={'text'}
            shape="circle"
            title="Refresh"
            icon={<ReloadOutlined />}
            onClick={() => {
              setShields({});
            }}
          />
        </Flex>
      </>
    ),
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
    const shieldsController = new AbortController();
    const shouldFilter = Object.keys(shields).length > 0;

    clearTimeout(dataLoadTimeout);

    dataLoadTimeout = setTimeout(
      async () => {
        setLoading(true);

        // Load solution groups
        const { nextPageStart, solutions: data } = await fetchSolutionGroups({
          signal: controller.signal,
          offset: shouldFilter
            ? undefined
            : nextPageOffset[tableParams.currentPage as number],
          actuatorId: shields.actuatorId,
          microId: shields.microId,
          sensorId: shields.sensorId,
        });

        // Set filters
        await (async () => {
          if (shouldFilter || tableParams.currentPage !== 1) {
            return;
          }

          const { iotComponents } = await fetchIotComponents({
            signal: shieldsController.signal,
            limit: 100,
          });

          const sFilters: FilterListItem[] = [];
          const mFilters: FilterListItem[] = [];
          const aFilters: FilterListItem[] = [];

          iotComponents.forEach(({ category, name, key }) => {
            switch (category) {
              case 'actuator':
                aFilters.push({ text: name, value: String(key) });
                break;

              case 'sensor':
                sFilters.push({ text: name, value: String(key) });
                break;

              case 'microcontroller':
                mFilters.push({ text: name, value: String(key) });
                break;
            }
          });

          setSensorFilters(() => sFilters);
          setMicroFilters(() => mFilters);
          setActuatorFilters(() => aFilters);
        })();

        if (!shouldFilter) {
          const nextPage = (tableParams.currentPage as number) + 1;

          if (!Object.keys(nextPageOffset).includes(String(nextPage))) {
            setTableParams((old) => ({
              ...old,
              total: nextPageStart ? old.total + data.length : old.total,
            }));

            setTotalSolutionGroups((old) => old + data.length);
          }

          if (nextPageStart) {
            setNextPageOffset((old) => ({
              ...old,
              [nextPage]: nextPageStart,
            }));
          }
        }

        setSolutionGroups(() => data);
        setLoading(false);
      },
      shouldFilter ? 5000 : 0
    );

    return () => {
      clearTimeout(dataLoadTimeout);
      clearTimeout(solutionDeletionTimeout);
      controller.abort();
      shieldsController.abort();
      solutionDeletionController.abort();
    };
  }, [tableParams.currentPage, JSON.stringify(shields)]);

  return (
    <div>
      <Table<AdminSolutionGroupDataType>
        {...tableProps}
        columns={columns}
        dataSource={solutionGroups}
        scroll={scroll}
      />
    </div>
  );
};

export default AdminSolutionGroupsList;
