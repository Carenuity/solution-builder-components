import { Typography } from 'antd';
import React from 'react';
import { ApplicationDeveloperNameProps } from './index.types';
import Link from 'next/link';
import './index.css';

const { Text } = Typography;

const ApplicationDeveloperName: React.FC<ApplicationDeveloperNameProps> = ({
  developer,
  onDispatchDeveloper,
  onResetDeveloperDispatch,
  developerApplicationsUrlGenerator,
}) => {
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
        By{' '}
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
          <em>{developer.name}</em>
        </Link>
      </Text>
    </>
  );
};

export default ApplicationDeveloperName;
