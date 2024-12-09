import { MailOutlined } from '@ant-design/icons';
import { Button, List, Result, Typography } from 'antd';
import React from 'react';
import { SolutionTemplateNotFoundProps, TripleItem } from './index.types';
import QueryString from 'qs';

const generateMailContent = ({
  actuator,
  board,
  sensor,
}: {
  sensor?: string;
  board?: string;
  actuator?: string;
}) => {
  const mailQuery = QueryString.stringify({
    subject: `Missing Solution Template for (${sensor}_${board}_${actuator})`,
    body: `Dear sir/madam,
  
      I am writing to request the missing solution template for my triple setup as illustrated below:
      Sensor: ${sensor}
      Micro-controller: ${board}
      Actuator: ${actuator}
  
      Looking forward to your positive feedback. 
      I can't wait to feature my application on the Solution Builder.
  
      Regards
      `,
  });

  return mailQuery;
};

const SolutionTemplateNotFound: React.FC<SolutionTemplateNotFoundProps> = ({
  actuator,
  microcontroller,
  sensor,
}) => {
  const tripleItems: TripleItem[] = [
    { id: 'Sensor', name: sensor },
    { id: 'Micro-controller', name: microcontroller },
    { id: 'Actuator', name: actuator },
  ];

  return (
    <>
      <Result
        status={'404'}
        title="Solution Group Not Found!"
        subTitle={
          <>
            <p>
              We could not find a solution group to your hardware setup as
              selected in <strong>step 1</strong>:
              <List
                header={<div>Hardware setup</div>}
                dataSource={tripleItems}
                renderItem={({ id, name }) => (
                  <List.Item>
                    <Typography.Text style={{ fontWeight: 'bold' }}>
                      {id}:{' '}
                    </Typography.Text>{' '}
                    {name}
                  </List.Item>
                )}
              />
              <br />
              This is required to proceed creating your application.
            </p>
            To request it, click on the button below. We are truly sorry for
            this inconvenience.
          </>
        }
        extra={[
          <Button
            type={'link'}
            variant={'solid'}
            color={'primary'}
            key="add"
            icon={<MailOutlined />}
            href={`mailto:max.mergenthaler@chipglobe.com,paul.otieno@chipglobe.com,timothy.mwala@chipglobe.com?${generateMailContent({ actuator: actuator, board: microcontroller, sensor: sensor })}`}
          >
            Request Solution Group
          </Button>,
        ]}
      />
    </>
  );
};

export default SolutionTemplateNotFound;
