import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import TagsList from './TagsList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/TagsList',
  component: TagsList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof TagsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloWorld: Story = {
  args: {
    accessToken: ``,
    onDeleteTag: () => {
      window.location.reload();
    },
    editIconUrlCallback(applicationId) {
      return `/profile/binaries/edit/${applicationId}`;
    },
    editInfoUrlCallback(applicationId) {
      return `/profile/binaries/edit/${applicationId}`;
    },
  },
};
