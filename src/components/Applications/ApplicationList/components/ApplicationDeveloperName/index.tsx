import { Typography } from 'antd';
import React from 'react';
import { ApplicationDeveloperNameProps } from './index.types';

const { Text, Link } = Typography;

const ApplicationDeveloperName: React.FC<ApplicationDeveloperNameProps> = ({
  developer,
  dispatchDeveloper,
}) => {
  return (
    <>
      <Text
        type={'secondary'}
        ellipsis
        style={{ fontSize: '.7rem' }}
        onMouseEnter={
          dispatchDeveloper
            ? () => {
                dispatchDeveloper(developer);
              }
            : undefined
        }
      >
        By{' '}
        <Link
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
