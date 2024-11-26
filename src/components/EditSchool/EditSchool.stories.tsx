import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import EditSchool from '.';
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
  title: 'Components/School/EditSchool',
  component: EditSchool,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof EditSchool>;

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
    school: {
      description: `<p>Some text</p>`,
      name: 'Co-operative University',
      country: 'Kenya',
      url: 'https://cuk.ac.ke',
    },
  },
};
