import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import SelectShields from './SelectShields';
import { CreateApplicationProvider } from './CreateApplicationProvider';
import SelectSolutionTemplate from './SelectSolutionTemplate';
import SetMetadata from './SetMetadata';

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
    description: 'Select relevant template',
    percent: 40,
  },
  {
    title: 'Metadata',
    content: <SetMetadata />,
    description: 'Application metadata',
    percent: 60,
  },
  {
    title: 'Category',
    content: 'Last-content',
    description:
      'Select what you have (merged binary, accompanying binaries from Arduino IDE)',
    percent: 80,
  },
  {
    title: 'Binaries',
    content: 'Last-content',
    description: 'Application metadata (ecosystemm & repository)',
    percent: 100,
  },
];

const CreateApplicationForm: React.FC = () => {
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
    textAlign: 'center',
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
        <Steps
          current={current}
          percent={steps[current].percent}
          items={items}
        />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </CreateApplicationProvider>
    </>
  );
};

export default CreateApplicationForm;
