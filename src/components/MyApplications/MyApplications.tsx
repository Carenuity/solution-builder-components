import React, { useEffect, useState } from 'react';
import { Button, Image, Popconfirm, Space, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { FilterListItem, MyApplicationDataType } from './MyApplications.types';
import { imageFallback } from '../../utils/constants.utils';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import WebInstallButtonHoc from '../WebInstallButton';
import { getMyApplications } from './MyApplications.utils';

type OnChange = NonNullable<TableProps<MyApplicationDataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const MyApplications: React.FC<{ developerId: string }> = ({ developerId }) => {
  const [applications, setApplications] = useState<MyApplicationDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [ecosystemFilters, setEcosystemFilters] = useState<
    FilterListItem[] | undefined
  >();
  const [typeFilters, setTypeFilters] = useState<
    FilterListItem[] | undefined
  >();
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalApplications, setTotalApplications] = useState(0);
  const { InstallButton } = WebInstallButtonHoc();

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
      fixed: 'left',
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
      render: (_, record) => (
        <>
          <a title={record.name} href={record.repository}>
            {record.name}
          </a>
        </>
      ),
    },
    {
      title: 'Ecosystem',
      dataIndex: 'ecosystem',
      width: 200,
      ellipsis: true,
      filters: ecosystemFilters,
      filteredValue: filteredInfo.ecosystem || null,
      onFilter: (value, record) => record.ecosystem.includes(value as string),
      // render: ({ image, name }: MyApplicationDataItem) => (
      //   <>
      //     <Flex align={'center'} gap={'small'}>
      //       <Avatar src={image} alt="solution image" />
      //       <span>{name}</span>
      //     </Flex>
      //   </>
      // ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 250,
      ellipsis: true,
      filters: typeFilters,
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.includes(value as string),
      // render: ({ image, name }: MyApplicationDataItem) => (
      //   <>
      //     <Flex align={'center'} gap={'small'}>
      //       <Avatar src={image} alt="application image" />
      //       <span>{name}</span>
      //     </Flex>
      //   </>
      // ),
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      ellipsis: true,
      width: 150,
      render: (text: string | undefined) => (
        <>
          {text && <Tag color={'green'}>text</Tag>}
          {!text && <span>-</span>}
        </>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      ellipsis: true,
      width: 150,
      render: (text: string | undefined) => {
        if (text) {
          const date = new Date(text);
          const dateString = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
          });
          return <>{dateString}</>;
        }
        return (
          <>
            <span>-</span>
          </>
        );
      },
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
              title="Delete"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
          <Button
            type={'link'}
            color={'primary'}
            variant={'outlined'}
            shape="circle"
            title="Edit"
            href={`/${record.key}`}
            icon={<EditOutlined />}
          />
          <InstallButton
            manifest={record.manifest}
            type={'primary'}
            shape={'circle'}
          />
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
    title: () => `${totalApplications} Applications`,
    showHeader: true,
    pagination: { position: ['none', 'bottomRight'] },
    onChange: handleChange,
  };

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      const ecoFilters: FilterListItem[] = [];
      const typeFilters: FilterListItem[] = [];

      setLoading(true);
      // Load my applications
      const data = await getMyApplications({
        developerId,
        signal: controller.signal,
      });

      const ecosystemSet: Set<string> = new Set();
      const typeSet: Set<string> = new Set();

      data.forEach(({ ecosystem, type }) => {
        if (!ecosystemSet.has(ecosystem)) {
          ecoFilters.push({ text: ecosystem, value: ecosystem });
          ecosystemSet.add(ecosystem);
        }

        if (!typeSet.has(type)) {
          typeFilters.push({ text: type, value: type });
          typeSet.add(type);
        }
      });
      setTotalApplications(data.length);
      setApplications(() => data);
      setEcosystemFilters(() => ecoFilters);
      setTypeFilters(() => typeFilters);
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
        columns={columns}
        dataSource={applications}
        scroll={scroll}
      />
    </div>
  );
};

export default MyApplications;
