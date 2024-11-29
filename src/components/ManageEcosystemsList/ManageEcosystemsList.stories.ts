import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import ManageEcosystemsList from '.';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Ecosystem/ManageEcosystemsList',
  component: ManageEcosystemsList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ManageEcosystemsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const CreateForm: Story = {
  args: {
    url: 'https://solutions-api.carenuity.com/v1/ecosystems',
    limit: 10,
    deleteDispatch: async (formData) => {
      const id = formData.get('ecosystemId');
      // Simulate asynchronous deletion
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Ecosystem deleted successfully`, id);
    },
    editAvatarCallback: (id) => `/avatars/${id}`,
    editBannerCallback: (id) => `/banners/${id}`,
    editUrlCallback: (id) => `/edit/${id}`,
  },
};
