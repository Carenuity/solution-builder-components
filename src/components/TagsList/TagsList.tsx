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
import { deleteTag, fetchTags } from './TagsList.utils';
import { TagDataType, ITagsList } from './TagsList.types';
import { NextPageOffset, TableParams } from '../../utils/types.utils';

type OnChange = NonNullable<TableProps<TagDataType>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ITEMS_PER_PAGE = 10;

const TagsList: React.FC<ITagsList> = ({
  accessToken,
  onDeleteTag,
  editIconUrlCallback,
  editInfoUrlCallback,
}) => {
  const [tags, setTags] = useState<TagDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalTags, setTotalTags] = useState(0);
  const [nextPageOffset, setNextPageOffset] = useState<NextPageOffset>({
    1: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    total: ITEMS_PER_PAGE,
    currentPage: 1,
  });
  const [context, openNotification] = useSbNotification();

  const tagDeletionController = new AbortController();
  let tagDeletionTimeout: string | number | NodeJS.Timeout | undefined;

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);

    if (pagination.current !== tableParams.currentPage) {
      setTableParams((old) => ({ ...old, currentPage: pagination.current }));
      setTags(() => []);
      setSortedInfo({});
    }
  };

  const columns: TableColumnsType<TagDataType> = [
    {
      title: 'Icon',
      dataIndex: 'icon',
      width: 70,
      render: (text: string) => (
        <>
          <Image
            src={text}
            fallback={imageFallback}
            alt="tag icon"
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

          <Popconfirm
            title={
              <>
                {!record.name && 'Delete the tag?'}
                {record.name && (
                  <>
                    Delete{' '}
                    <em style={{ textDecoration: 'underline' }}>
                      {record.name}
                    </em>{' '}
                    tag?
                  </>
                )}
              </>
            }
            description={'Are you sure to delete this tag?'}
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              tagDeletionTimeout = setTimeout(async () => {
                try {
                  await deleteTag({
                    accessToken,
                    tagId: record.key as string,
                    signal: tagDeletionController.signal,
                  });

                  openNotification({
                    message: `Tag ${record.name ? '(' + record.name + ')' : ''} deleted successfully`,
                    type: 'success',
                  });

                  if (onDeleteTag) {
                    setTimeout(onDeleteTag, 1000);
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

  const tableProps: TableProps<TagDataType> = {
    loading,
    size: 'small',
    scroll,
    title: () => `${totalTags} Tags`,
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
      // Load my tags
      const { nextPageStart, tags: data } = await fetchTags({
        signal: controller.signal,
        offset: nextPageOffset[tableParams.currentPage as number],
      });

      const nextPage = (tableParams.currentPage as number) + 1;

      if (!Object.keys(nextPageOffset).includes(String(nextPage))) {
        setTableParams((old) => ({
          ...old,
          total: nextPageStart ? old.total + data.length : old.total,
        }));

        setTotalTags((old) => old + data.length);
      }

      if (nextPageStart) {
        setNextPageOffset((old) => ({
          ...old,
          [nextPage]: nextPageStart,
        }));
      }

      setTags(() => data);
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(tagDeletionTimeout);
      controller.abort();
      tagDeletionController.abort();
    };
  }, [tableParams.currentPage]);

  return (
    <div>
      <Table<TagDataType>
        {...tableProps}
        columns={columns}
        dataSource={tags}
        scroll={scroll}
      />
    </div>
  );
};

export default TagsList;
