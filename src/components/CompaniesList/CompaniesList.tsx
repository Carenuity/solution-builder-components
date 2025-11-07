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
import { NextPageOffset, TableParams } from '../../utils/types.utils';
import { CompanyDataType, ICompaniesList } from './CompaniesList.types';
import { deleteCompany, fetchCompanies } from './CompaniesList.utils';

type OnChange = NonNullable<TableProps<CompanyDataType>['onChange']>;

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const ITEMS_PER_PAGE = 10;

const CompaniesList: React.FC<ICompaniesList> = ({
  accessToken,
  onDeleteCompany,
  editLogoUrlCallback,
  editBannersUrlCallback,
  editInfoUrlCallback,
}) => {
  const [companies, setCompanies] = useState<CompanyDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [nextPageOffset, setNextPageOffset] = useState<NextPageOffset>({
    1: undefined,
  });
  const [tableParams, setTableParams] = useState<TableParams>({
    total: ITEMS_PER_PAGE,
    currentPage: 1,
  });
  const [context, openNotification] = useSbNotification();

  const companyDeletionController = new AbortController();
  let companyDeletionTimeout: string | number | NodeJS.Timeout | undefined;

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter as Sorts);

    if (pagination.current !== tableParams.currentPage) {
      setTableParams((old) => ({ ...old, currentPage: pagination.current }));
      setCompanies(() => []);
      setSortedInfo({});
    }
  };

  const columns: TableColumnsType<CompanyDataType> = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      width: 70,
      render: (text: string) => (
        <>
          <Image
            src={text}
            fallback={imageFallback}
            alt="company logo"
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
            title={`Edit Company`}
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
                {!record.name && 'Delete the company?'}
                {record.name && (
                  <>
                    Delete{' '}
                    <em style={{ textDecoration: 'underline' }}>
                      {record.name}
                    </em>{' '}
                    company?
                  </>
                )}
              </>
            }
            description={'Are you sure to delete this company?'}
            okText="Confirm"
            cancelText="Cancel"
            onConfirm={() => {
              companyDeletionTimeout = setTimeout(async () => {
                try {
                  await deleteCompany({
                    accessToken,
                    companyId: record.key as string,
                    signal: companyDeletionController.signal,
                  });

                  openNotification({
                    message: `Company ${record.name ? '(' + record.name + ')' : ''} deleted successfully`,
                    type: 'success',
                  });

                  if (onDeleteCompany) {
                    setTimeout(onDeleteCompany, 1000);
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

  const tableProps: TableProps<CompanyDataType> = {
    loading,
    size: 'small',
    scroll,
    title: () => `${totalCompanies} Companies`,
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
      // Load my companies
      const { nextPageStart, companies: data } = await fetchCompanies({
        signal: controller.signal,
        offset: nextPageOffset[tableParams.currentPage as number],
      });

      const nextPage = (tableParams.currentPage as number) + 1;

      if (!Object.keys(nextPageOffset).includes(String(nextPage))) {
        setTableParams((old) => ({
          ...old,
          total: nextPageStart ? old.total + data.length : old.total,
        }));

        setTotalCompanies((old) => old + data.length);
      }

      if (nextPageStart) {
        setNextPageOffset((old) => ({
          ...old,
          [nextPage]: nextPageStart,
        }));
      }

      setCompanies(() => data);
      setLoading(false);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(companyDeletionTimeout);
      controller.abort();
      companyDeletionController.abort();
    };
  }, [tableParams.currentPage]);

  return (
    <div>
      <Table<CompanyDataType>
        {...tableProps}
        columns={columns}
        dataSource={companies}
        scroll={scroll}
      />
    </div>
  );
};

export default CompaniesList;
