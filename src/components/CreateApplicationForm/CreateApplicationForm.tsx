import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import SelectShields from './SelectShields';

const steps = [
  {
    title: 'Triple',
    content: <SelectShields />,
    description: 'Select what you have',
    percent: 30,
  },
  {
    title: 'Second',
    content: <p>Second-content here</p>,
    description: 'This is the second step, you can do something here.',
    percent: 60,
  },
  {
    title: 'Last',
    content: 'Last-content',
    description: 'This is the last step, you can do something here.',
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
  };

  return (
    <>
      <Steps current={current} percent={steps[current].percent} items={items} />
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
    </>
  );
};

export default CreateApplicationForm;
