import React, { useState } from 'react';
import { Alert, Button, Flex, Steps, theme } from 'antd';
import SelectShields from './SelectShields';
import { CreateApplicationProvider } from './CreateApplicationProvider';
import SelectSolutionTemplate from './SelectSolutionTemplate';
import SetMetadata from './SetMetadata';
import SetBinaryFileType from './SetBinaryFileType';
import UploadBinaries from './UploadBinaries';
import CreateButton from './CreateButton';
import { ICreateApplicationForm } from './CreateApplication.types';
import NextButton from './NextButton';
import { ExportOutlined } from '@ant-design/icons';

const steps = [
  {
    title: 'Triple',
    content: <SelectShields />,
    description: `What's your setup?`,
    percent: 20,
  },
  {
    title: 'Solution',
    content: <SelectSolutionTemplate />,
    description: 'Choose grouping',
    percent: 40,
  },
  {
    title: 'Metadata',
    content: <SetMetadata />,
    description: 'Assign details',
    percent: 60,
  },
  {
    title: 'Prepare',
    content: <SetBinaryFileType />,
    description: 'Select what you have',
    percent: 80,
  },
  {
    title: 'Share',
    content: <UploadBinaries />,
    description: 'Upload binaries',
    percent: 100,
  },
];

const CreateApplicationForm: React.FC<ICreateApplicationForm> = ({
  accessToken,
}) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    padding: '2rem',
  };

  return (
    <>
      <CreateApplicationProvider>
        <Alert
          message={
            <Flex justify={'end'} align={'center'}>
              <div className="">
                Feeling stuck?
                <Button
                  type={'link'}
                  href={
                    'https://www.hackster.io/Mwala/deploy-your-next-iot-application-on-solutions-carenuity-com-cc98f5'
                  }
                  target={'_blank'}
                  referrerPolicy={'no-referrer'}
                  style={{ padding: '.2rem' }}
                  icon={<ExportOutlined />}
                  iconPosition={'end'}
                >
                  Find help here
                </Button>
              </div>
            </Flex>
          }
          type="info"
          showIcon
          style={{
            borderRadius: 0,
            borderTop: 0,
            borderBottom: 0,
            marginBottom: '.7rem',
          }}
        />

        <div
          style={{
            maxHeight: '30rem',
            overflowY: 'scroll',
            paddingRight: '1.5rem',
          }}
        >
          <Steps
            current={current}
            percent={steps[current].percent}
            items={items}
          />
          <div style={contentStyle}>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <NextButton onClick={() => next()} />
            )}
            {current === steps.length - 1 && (
              <CreateButton accessToken={accessToken} />
            )}
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </CreateApplicationProvider>
    </>
  );
};

export default CreateApplicationForm;
