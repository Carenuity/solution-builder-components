import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import EditHandle from '.';
import { Button } from 'antd';
import React from 'react';

const SubmitButton = () => {
  return (
    <Button type="primary" htmlType="submit">
      Submit
    </Button>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Handle/EditHandle',
  component: EditHandle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof EditHandle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CreateForm: Story = {
  args: {
    SubmitButton: SubmitButton,
    mode: 'create',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const UpdateForm: Story = {
  args: {
    SubmitButton: SubmitButton,
    mode: 'update',
    handle: {
      tag: 'linkedin',
      icon: 'https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fsocial_handle%252F1714227168619_icons8-linkedin-30.png%3Falt%3Dmedia%26token%3De86356e5-4011-4729-9a16-b3050084d2a7&w=32&q=75',
    },
  },
};
