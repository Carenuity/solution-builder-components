import { Typography } from 'antd';
import React from 'react';
import { ApplicationDeveloperNameProps } from './index.types';

const { Text, Link } = Typography;

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
              : undefined
          }
          type={'secondary'}
          strong
          underline
          italic
          style={{ fontSize: '.75rem' }}
        >
          {developer.name}
        </Link>
      </Text>
    </>
  );
};

export default ApplicationDeveloperName;
