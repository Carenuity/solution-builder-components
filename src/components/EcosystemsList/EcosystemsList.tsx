import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Image, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { imageFallback } from '../../utils/constants.utils';
import useSbNotification from '../Notification';
import { EcosystemDataType, IEcosystemsList } from './EcosystemsList.types';
import { deleteEcosystem, fetchEcosystems } from './EcosystemsList.utils';
import { NextPageOffset, TableParams } from '../../utils/types.utils';

type OnChange = NonNullable<TableProps<EcosystemDataType>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ITEMS_PER_PAGE = 10;

const EcosystemsList: React.FC<IEcosystemsList> = ({
  accessToken,
  onDeleteEcosystem,
  editIconUrlCallback,
  editBannersUrlCallback,
  editInfoUrlCallback,
}) => {
  const [ecosystems, setEcosystems] = useState<EcosystemDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalEcosystems, setTotalEcosystems] = useState(0);
  const [nextPageOffset, setNextPageOffset] = useState<NextPageOffset>({
    1: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    total: ITEMS_PER_PAGE,
    currentPage: 1,
  });
  const [context, openNotification] = useSbNotification();

  const ecosystemDeletionController = new AbortController();
  let ecosystemDeletionTimeout: string | number | NodeJS.Timeout | undefined;

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);

    if (pagination.current !== tableParams.currentPage) {
      setTableParams((old) => ({ ...old, currentPage: pagination.current }));
      setEcosystems(() => []);
      setSortedInfo({});
    }
  };

  const columns: TableColumnsType<EcosystemDataType> = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 70,
      render: (text: string) => (
        <>
          <Image
            src={text}
            fallback={imageFallback}
            alt="ecosystem icon"
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

          <Button
            type={'link'}
            color={'primary'}
            variant={'outlined'}
            shape="circle"
            title="Edit Banners"
            href={editBannersUrlCallback(record.key as string)}
            icon={<UploadOutlined />}
          />

          <Popconfirm
            title={
              <>
                {!record.name && 'Delete the ecosystem?'}
                {record.name && (
                  <>
                    Delete{' '}
                    <em style={{ textDecoration: 'underline' }}>
                      {record.name}
                    </em>{' '}
                    ecosystem?
                  </>
                )}
              </>
            }
            description={'Are you sure to delete this ecosystem?'}
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              ecosystemDeletionTimeout = setTimeout(async () => {
                try {
                  await deleteEcosystem({
                    accessToken,
                    ecosystemId: record.key as string,
                    signal: ecosystemDeletionController.signal,
                  });

                  openNotification({
                    message: `Ecosystem ${record.name ? '(' + record.name + ')' : ''} deleted successfully`,
                    type: 'success',
                  });

                  if (onDeleteEcosystem) {
                    setTimeout(onDeleteEcosystem, 1000);
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

  const tableProps: TableProps<EcosystemDataType> = {
    loading,
    size: 'small',
    scroll,
    title: () => `${totalEcosystems} Ecosystems`,
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
      // Load my ecosystems
      const { nextPageStart, ecosystems: data } = await fetchEcosystems({
        signal: controller.signal,
        offset: nextPageOffset[tableParams.currentPage as number],
      });

      const nextPage = (tableParams.currentPage as number) + 1;

      if (!Object.keys(nextPageOffset).includes(String(nextPage))) {
        setTableParams((old) => ({
          ...old,
          total: nextPageStart ? old.total + data.length : old.total,
        }));

        setTotalEcosystems((old) => old + data.length);
      }

      if (nextPageStart) {
        setNextPageOffset((old) => ({
          ...old,
          [nextPage]: nextPageStart,
        }));
      }

      setEcosystems(() => data);
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(ecosystemDeletionTimeout);
      controller.abort();
      ecosystemDeletionController.abort();
    };
  }, [tableParams.currentPage]);

  return (
    <div>
      <Table<EcosystemDataType>
        {...tableProps}
        columns={columns}
        dataSource={ecosystems}
        scroll={scroll}
      />
    </div>
  );
};

export default EcosystemsList;
