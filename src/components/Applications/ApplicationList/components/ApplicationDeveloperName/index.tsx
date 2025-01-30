import { Typography } from 'antd';
import React from 'react';
import { ApplicationDeveloperNameProps } from './index.types';
import Link from 'next/link';
import './index.css';
import { LinkOutlined } from '@ant-design/icons';
import { useTheme } from 'antd-style';

const { Text } = Typography;

const ApplicationDeveloperName: React.FC<ApplicationDeveloperNameProps> = ({
  developer,
  label,
  onDispatchDeveloper,
  onResetDeveloperDispatch,
  developerApplicationsUrlGenerator,
}) => {
  const token = useTheme();

  return (
    <>
      <Text
        type={'secondary'}
        ellipsis
        style={{ fontSize: '.7rem' }}
        onMouseEnter={
          onDispatchDeveloper
            ? () => {
                onDispatchDeveloper(developer);
              }
            : undefined
        }
        onMouseLeave={
          onResetDeveloperDispatch
            ? () => {
                onResetDeveloperDispatch();
              }
            : undefined
        }
      >
        {label || 'By'}
        {': '}
        <Link
          href={
            developerApplicationsUrlGenerator
              ? developerApplicationsUrlGenerator(developer.id)
              : '#'
          }
          style={{
            fontSize: '.75rem',
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
          className={'custom-link'}
        >
          <LinkOutlined
            style={{ marginRight: '.15rem', color: token.colorPrimary }}
          />
          <em>{developer.name}</em>
        </Link>
      </Text>
    </>
  );
};

export default ApplicationDeveloperName;
