import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Flex,
  Image,
  Popconfirm,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import {
  FilterListItem,
  MyApplicationDataItem,
  MyApplicationDataType,
} from './MyApplications.types';
import { imageFallback } from '../../utils/constants.utils';
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';

type OnChange = NonNullable<TableProps<MyApplicationDataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const defaultTitle = () => 'My Applications';

const _applications: MyApplicationDataType[] = [
  {
    key: '1',
    tag: 'version 1',
    name: 'Solution 1 with some other long word',
    image: imageFallback,
    ecosystem: {
      id: '1',
      image: imageFallback,
      name: 'Cloudfree applications',
    },
    microcontroller: {
      id: '2',
      image: imageFallback,
      name: 'Microcontroller 2',
    },
    type: { id: '1', image: imageFallback, name: 'Type 1' },
  },
  {
    key: '2',
    name: 'Solution 2',
    image: imageFallback,
    ecosystem: { id: '2', image: imageFallback, name: 'Ecosystem 2' },
    microcontroller: {
      id: '1',
      image: imageFallback,
      name: 'Microcontroller 1',
    },
    type: { id: '2', image: imageFallback, name: 'Type 2' },
  },
  {
    key: '3',
    name: 'Solution 1',
    image: imageFallback,
    ecosystem: { id: '1', image: imageFallback, name: 'Ecosystem 1' },
    microcontroller: {
      id: '3',
      image: imageFallback,
      name: 'Microcontroller 3',
    },
    type: { id: '3', image: imageFallback, name: 'Type 3' },
  },
];

const MyApplications: React.FC = () => {
  const [applications, setApplications] =
    useState<MyApplicationDataType[]>(_applications);
  const [loading, setLoading] = useState<boolean>(false);
  const [ecosystemFilters, setEcosystemFilters] = useState<
    FilterListItem[] | undefined
  >();
  const [boardFilters, setBoardFilters] = useState<
    FilterListItem[] | undefined
  >();
  const [typeFilters, setTypeFilters] = useState<
    FilterListItem[] | undefined
  >();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  //   const [yScroll, setYScroll] = useState(false);
  //   const [xScroll, setXScroll] = useState<string>();

  //   const [selectionType] = useState<'checkbox' | 'radio'>('radio');

  // rowSelection object indicates the need for row selection
  //   const rowSelection: TableProps<DataType>['rowSelection'] = {
  //     onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
  //       if (selectedRows[0]) {
  //         const id = selectedRowKeys[0] as string;
  //       }
  //     },
  //     getCheckboxProps: (record: DataType) => ({
  //       disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //       name: record.name,
  //     }),
  //   };

  const handleChange: OnChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const columns: TableColumnsType<MyApplicationDataType> = [
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
      title: 'Solution',
      dataIndex: 'name',
      ellipsis: true,
      width: 200,
      key: 'name',
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      },
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ecosystem',
      dataIndex: 'ecosystem',
      width: 200,
      ellipsis: true,
      filters: ecosystemFilters,
      filteredValue: filteredInfo.ecosystem || null,
      onFilter: (value, record) =>
        record.ecosystem.name.includes(value as string),
      render: ({ image, name }: MyApplicationDataItem) => (
        <>
          <Flex align={'center'} gap={'small'}>
            <Avatar src={image} alt="solution image" />
            <span>{name}</span>
          </Flex>
        </>
      ),
    },
    {
      title: 'Board',
      dataIndex: 'microcontroller',
      ellipsis: true,
      width: 200,
      filters: boardFilters,
      filteredValue: filteredInfo.microcontroller || null,
      onFilter: (value, record) =>
        record.microcontroller.name.includes(value as string),
      render: ({ image, name }: MyApplicationDataItem) => (
        <>
          <Flex align={'center'} gap={'small'}>
            <Avatar src={image} alt="microcontroller image" />
            <span>{name}</span>
          </Flex>
        </>
      ),
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      //   ellipsis: true,
      width: 150,
      render: (text: string | undefined) => (
        <>
          <Flex align={'center'} justify={'center'}>
            {text && <Tag color={'green'}>text</Tag>}
            {!text && <span>-</span>}
          </Flex>
        </>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 250,
      ellipsis: true,
      filters: typeFilters,
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.name.includes(value as string),
      render: ({ image, name }: MyApplicationDataItem) => (
        <>
          <Flex align={'center'} gap={'small'}>
            <Avatar src={image} alt="application image" />
            <span>{name}</span>
          </Flex>
        </>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'key',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the application"
            description="Are you sure to delete this application?"
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button
              type={'default'}
              color={'danger'}
              variant={'outlined'}
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
          <Tooltip title={'edit'}>
            <Button
              type={'link'}
              color={'primary'}
              variant={'outlined'}
              shape="circle"
              href={`/${record.key}`}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <a>
            <Space>
              More actions
              <DownOutlined />
            </Space>
          </a>
        </Space>
      ),
    },
  ];

  const scroll: { x?: number | string; y?: number | string } = {};
  scroll.y = '100vh';
  scroll.x = '100vw';

  const tableProps: TableProps<MyApplicationDataType> = {
    loading,
    size: 'small',
    scroll,
    title: defaultTitle,
    showHeader: true,
    pagination: { position: ['none', 'none'] },
    onChange: handleChange,
  };

  useEffect(() => {
    const controller = new AbortController();

    const ecoFilters: FilterListItem[] = [];
    const boardFilters: FilterListItem[] = [];
    const typeFilters: FilterListItem[] = [];

    _applications.forEach(({ ecosystem, microcontroller, type }) => {
      ecoFilters.push({ text: ecosystem.name, value: ecosystem.name });
      boardFilters.push({
        text: microcontroller.name,
        value: microcontroller.name,
      });
      typeFilters.push({ text: type.name, value: type.name });
    });

    setEcosystemFilters(() => ecoFilters);
    setBoardFilters(() => boardFilters);
    setTypeFilters(() => typeFilters);

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      // Load my applications
      // const data = await getMyApplications({
      //   signal: controller.signal,
      // });
      // setApplications(() => data);
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return (
    <div>
      <Table<MyApplicationDataType>
        {...tableProps}
        // rowSelection={{
        //   type: selectionType,
        //   ...rowSelection,
        //   defaultSelectedRowKeys: state.solution?.id
        //     ? [state.solution.id]
        //     : undefined,
        // }}
        columns={columns}
        dataSource={applications}
        scroll={scroll}
      />
    </div>
  );
};

export default MyApplications;
