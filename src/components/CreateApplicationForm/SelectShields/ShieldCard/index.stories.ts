import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import ShieldCard from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/CreateApplicationForm/Step-1/ShieldCard',
  component: ShieldCard,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ShieldCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloWorld: Story = {
  args: {
    imageUrl: '',
    name: 'C3-Mini',
    title: 'Microcontroller',
  },
};
