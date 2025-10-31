import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import MyApplication from './MyApplications';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/MyApplications',
  component: MyApplication,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof MyApplication>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloWorld: Story = {
  args: {
    developerId: 'a334c822-3011-7063-fcdf-780bd0d4ad38',
    accessToken: ``,
    onDeleteApplication: () => {
      window.location.reload();
    },
    editBinariesUrlCallback(applicationId) {
      return `/profile/binaries/edit/${applicationId}`;
    },
    editMetadataUrlCallback(applicationId) {
      return `/profile/binaries/edit/${applicationId}`;
    },
    manifestCallback(manifest) {
      alert(manifest);
    },
  },
};
