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
import { ISchoolsList, SchoolDataType } from './SchoolsList.types';
import { NextPageOffset, TableParams } from '../../utils/types.utils';
import { deleteSchool, fetchSchools } from './SchoolsList.utils';

type OnChange = NonNullable<TableProps<SchoolDataType>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ITEMS_PER_PAGE = 10;

const SchoolsList: React.FC<ISchoolsList> = ({
  accessToken,
  onDeleteSchool,
  editLogoUrlCallback,
  editBannersUrlCallback,
  editInfoUrlCallback,
}) => {
  const [schools, setSchools] = useState<SchoolDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalSchools, setTotalSchools] = useState(0);
  const [nextPageOffset, setNextPageOffset] = useState<NextPageOffset>({
    1: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    total: ITEMS_PER_PAGE,
    currentPage: 1,
  });
  const [context, openNotification] = useSbNotification();

  const schoolDeletionController = new AbortController();
  let schoolDeletionTimeout: string | number | NodeJS.Timeout | undefined;

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);

    if (pagination.current !== tableParams.currentPage) {
      setTableParams((old) => ({ ...old, currentPage: pagination.current }));
      setSchools(() => []);
      setSortedInfo({});
    }
  };

  const columns: TableColumnsType<SchoolDataType> = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      width: 70,
      render: (text: string) => (
        <>
          <Image
            src={text}
            fallback={imageFallback}
            alt="school logo"
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
      render: (_, record) => (
        <>
          <a
            title={record.name}
            href={record.website}
            target={'_blank'}
            rel="noreferrer"
          >
            {record.name}
          </a>
        </>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      ellipsis: true,
      key: 'country',
      sorter: (a, b) => {
        if (sortedInfo.order === 'ascend') {
          return a.country?.localeCompare(b.country);
        } else {
          return b.country?.localeCompare(a.country);
        }
      },
      sortDirections: ['descend', 'ascend'],
      render: (_, record) => <>{record.country}</>,
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
            title={`Edit School`}
            href={editInfoUrlCallback(record.key as string)}
            icon={<EditOutlined />}
          />

          <Button
            type={'link'}
            color={'primary'}
            variant={'outlined'}
            shape="circle"
            title="Replace Logo"
            href={editLogoUrlCallback(record.key as string)}
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
                {!record.name && 'Delete the school?'}
                {record.name && (
                  <>
                    Delete{' '}
                    <em style={{ textDecoration: 'underline' }}>
                      {record.name}
                    </em>{' '}
                    school?
                  </>
                )}
              </>
            }
            description={'Are you sure to delete this school?'}
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              schoolDeletionTimeout = setTimeout(async () => {
                try {
                  await deleteSchool({
                    accessToken,
                    schoolId: record.key as string,
                    signal: schoolDeletionController.signal,
                  });

                  openNotification({
                    message: `School ${record.name ? '(' + record.name + ')' : ''} deleted successfully`,
                    type: 'success',
                  });

                  if (onDeleteSchool) {
                    setTimeout(onDeleteSchool, 1000);
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

  const tableProps: TableProps<SchoolDataType> = {
    loading,
    size: 'small',
    scroll,
    title: () => `${totalSchools} Schools`,
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
      // Load my schools
      const { nextPageStart, schools: data } = await fetchSchools({
        signal: controller.signal,
        offset: nextPageOffset[tableParams.currentPage as number],
      });

      const nextPage = (tableParams.currentPage as number) + 1;

      if (!Object.keys(nextPageOffset).includes(String(nextPage))) {
        setTableParams((old) => ({
          ...old,
          total: nextPageStart ? old.total + data.length : old.total,
        }));

        setTotalSchools((old) => old + data.length);
      }

      if (nextPageStart) {
        setNextPageOffset((old) => ({
          ...old,
          [nextPage]: nextPageStart,
        }));
      }

      setSchools(() => data);
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(schoolDeletionTimeout);
      controller.abort();
      schoolDeletionController.abort();
    };
  }, [tableParams.currentPage]);

  return (
    <div>
      <Table<SchoolDataType>
        {...tableProps}
        columns={columns}
        dataSource={schools}
        scroll={scroll}
      />
    </div>
  );
};

export default SchoolsList;
