import React, { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { Avatar, Button, message, Popconfirm, Space, Table } from 'antd';
import qs from 'qs';
import {
  EcosystemsListColumnsType,
  EcosystemsListDataType,
  ManageEcosystemsListProps,
  ManageEcosystemsListPropsCallbacks,
  TableParams,
} from './ManageEcosystemsList.types';
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  FileJpgOutlined,
} from '@ant-design/icons';

const generateColumns = ({
  deleteDispatch,
  editUrlCallback,
  editAvatarCallback,
  editBannerCallback,
}: ManageEcosystemsListPropsCallbacks) => {
  const columns: EcosystemsListColumnsType<EcosystemsListDataType> = [
    {
      title: 'Image',
      dataIndex: 'avatars',
      render: (avatars) => (
        <>
          {avatars?.[0]?.url && (
            <Avatar
              src={avatars[0].url}
              shape={'circle'}
              alt={'ecosystem logo'}
            />
          )}

          {!avatars?.[0]?.url && (
            <Avatar
              icon={<FileImageOutlined />}
              shape={'circle'}
              alt={'ecosystem logo'}
            />
          )}
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => `${name}`,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (_, record) => (
        <Space size="middle">
          {editAvatarCallback && (
            <Button
              variant={'outlined'}
              color={'default'}
              shape={'circle'}
              title="Edit avatar"
              href={editAvatarCallback(record.id)}
              icon={<FileJpgOutlined />}
            />
          )}

          {editBannerCallback && (
            <Button
              variant={'outlined'}
              color={'default'}
              shape={'circle'}
              title="Edit banner"
              href={editBannerCallback(record.id)}
              icon={<FileImageOutlined />}
            />
          )}

          {editUrlCallback && (
            <Button
              variant={'outlined'}
              color={'primary'}
              shape={'circle'}
              title="Edit ecosystem"
              href={editUrlCallback(record.id)}
              icon={<EditOutlined />}
            />
          )}

          {deleteDispatch && (
            <Popconfirm
              title={`Delete ecosystem '${record.name}'?`}
              description={'Are you sure to delete this ecosystem?'}
              okText="Confirm"
              cancelText="Cancel"
              onConfirm={() => {
                const formData = new FormData();
                formData.set('ecosystemId', record.id);

                setTimeout(async () => {
                  try {
                    await deleteDispatch(formData);
                  } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const err = error as any;
                    message.error(err.message);
                  }
                }, 0);
              }}
            >
              <Button
                type={'link'}
                color={'danger'}
                variant={'outlined'}
                shape="circle"
                title="Delete ecosystem"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];
  return columns;
};

const getEcosystemParams = (params: TableParams) => ({
  offset: params.offset,
  limit: params.pagination?.pageSize,
  mode: 'full',
  props: 'id,name,avatars',
});

const ManageEcosystemsList: React.FC<ManageEcosystemsListProps> = ({
  url,
  limit,
  deleteDispatch,
  editAvatarCallback,
  editBannerCallback,
  editUrlCallback,
}) => {
  const [data, setData] = useState<EcosystemsListDataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: limit,
      total: 0,
    },
  });

  const columns = generateColumns({
    deleteDispatch,
    editAvatarCallback,
    editBannerCallback,
    editUrlCallback,
  });

  const fetchData = () => {
    setLoading(true);
    const requestUrl = `${url}?${qs.stringify(getEcosystemParams(tableParams))}`;

    fetch(requestUrl)
      .then((res) => res.json())
      .then(({ data: { offset: serverOffset, total, items } }) => {
        setLoading(false);
        let _offset = serverOffset;

        // reset offset to undefined if last page
        if (
          tableParams.pagination?.current &&
          tableParams.pagination?.pageSize &&
          total &&
          tableParams.pagination.current * tableParams.pagination.pageSize >=
            total
        ) {
          _offset = undefined;
        }

        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: total,
          },
          offset: _offset,
        });

        setData(items);
      })
      .catch(() => {
        setLoading(false);
        setData(undefined);
      });
  };

  useEffect(fetchData, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange: TableProps<EcosystemsListDataType>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
      offset: tableParams.offset,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <Table<EcosystemsListDataType>
      title={() => `Total ecosystems: ${tableParams.pagination?.total}`}
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default ManageEcosystemsList;
