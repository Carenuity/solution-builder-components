import React, { useState } from 'react';
import { Button, Steps, theme } from 'antd';
import { IUpdateApplicationForm } from './UpdateApplication.types';
import NextButton from './NextButton';
import Details from './Details';
import BinaryFileType from './BinaryFileType';
import Binaries from './Binaries';
import UpdateButton from './UpdateButton';
import { UpdateApplicationProvider } from './UpdateApplicationProvider';

const steps = [
  // {
  //   title: 'Triple',
  //   content: <SelectShields />,
  //   description: `What's your setup?`,
  //   percent: 20,
  // },
  // {
  //   title: 'Solution',
  //   content: <SelectSolutionTemplate />,
  //   description: 'Choose grouping',
  //   percent: 40,
  // },
  {
    title: 'Metadata',
    content: <Details />,
    description: 'Assign details',
    percent: 30,
  },
  {
    title: 'Prepare',
    content: <BinaryFileType />,
    description: 'Select what you have',
    percent: 60,
  },
  {
    title: 'Share',
    content: <Binaries />,
    description: 'Upload binaries',
    percent: 100,
  },
];

const UpdateApplicationForm: React.FC<IUpdateApplicationForm> = ({
  accessToken,
  applicationId,
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
      <UpdateApplicationProvider>
        <Steps
          current={current}
          percent={steps[current].percent}
          items={items}
        />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && <NextButton onClick={() => next()} />}
          {current === steps.length - 1 && (
            <UpdateButton accessToken={accessToken} id={applicationId} />
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </UpdateApplicationProvider>
    </>
  );
};

export default UpdateApplicationForm;
