import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Image, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { imageFallback } from '../../utils/constants.utils';
import useSbNotification from '../Notification';
import { NextPageOffset, TableParams } from '../../utils/types.utils';
import { HandleDataType, IHandlesList } from './HandlesList.types';
import { deleteHandle, fetchHandles } from './HandlesList.utils';

type OnChange = NonNullable<TableProps<HandleDataType>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ITEMS_PER_PAGE = 20;

const HandlesList: React.FC<IHandlesList> = ({
  accessToken,
  onDeleteHandle,
  editInfoUrlCallback,
}) => {
  const [handles, setHandles] = useState<HandleDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalHandles, setTotalHandles] = useState(0);
  const [nextPageOffset, setNextPageOffset] = useState<NextPageOffset>({
    1: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    total: ITEMS_PER_PAGE,
    currentPage: 1,
  });
  const [context, openNotification] = useSbNotification();

  const handleDeletionController = new AbortController();
  let handleDeletionTimeout: string | number | NodeJS.Timeout | undefined;

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);

    if (pagination.current !== tableParams.currentPage) {
      setTableParams((old) => ({ ...old, currentPage: pagination.current }));
      setHandles(() => []);
      setSortedInfo({});
    }
  };

  const columns: TableColumnsType<HandleDataType> = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 70,
      render: (text: string) => (
        <>
          <Image
            src={text}
            fallback={imageFallback}
            alt="handle icon"
            style={{ maxWidth: '3rem', height: 'auto', borderRadius: '.3rem' }}
          />
        </>
      ),
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      ellipsis: true,
      key: 'tag',
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.tag.localeCompare(b.tag);
        } else {
          return b.tag.localeCompare(a.tag);
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{record.tag}</>,
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
            title={`Edit ${record.tag}`}
            href={editInfoUrlCallback(record.key as string)}
            icon={<EditOutlined />}
          />

          <Popconfirm
            title={
              <>
                {!record.tag && 'Delete the handle?'}
                {record.tag && (
                  <>
                    Delete{' '}
                    <em style={{ textDecoration: 'underline' }}>
                      {record.tag}
                    </em>{' '}
                    handle?
                  </>
                )}
              </>
            }
            description={'Are you sure to delete this handle?'}
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              handleDeletionTimeout = setTimeout(async () => {
                try {
                  await deleteHandle({
                    accessToken,
                    handleId: record.key as string,
                    signal: handleDeletionController.signal,
                  });

                  openNotification({
                    message: `Handle ${record.tag ? '(' + record.tag + ')' : ''} deleted successfully`,
                    type: 'success',
                  });

                  if (onDeleteHandle) {
                    setTimeout(onDeleteHandle, 1000);
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

  const tableProps: TableProps<HandleDataType> = {
    loading,
    size: 'small',
    scroll,
    title: () => `${totalHandles} Handles`,
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
      // Load my handles
      const { nextPageStart, handles: data } = await fetchHandles({
        accessToken,
        signal: controller.signal,
        offset: nextPageOffset[tableParams.currentPage as number],
      });

      const nextPage = (tableParams.currentPage as number) + 1;

      if (!Object.keys(nextPageOffset).includes(String(nextPage))) {
        setTableParams((old) => ({
          ...old,
          total: nextPageStart ? old.total + data.length : old.total,
        }));

        setTotalHandles((old) => old + data.length);
      }

      if (nextPageStart) {
        setNextPageOffset((old) => ({
          ...old,
          [nextPage]: nextPageStart,
        }));
      }

      setHandles(() => data);
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(handleDeletionTimeout);
      controller.abort();
      handleDeletionController.abort();
    };
  }, [tableParams.currentPage]);

  return (
    <div>
      <Table<HandleDataType>
        {...tableProps}
        columns={columns}
        dataSource={handles}
        scroll={scroll}
      />
    </div>
  );
};

export default HandlesList;
