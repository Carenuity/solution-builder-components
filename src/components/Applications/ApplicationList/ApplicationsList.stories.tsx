import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import ApplicationsList from '.';
import { generateApplicationsData } from './ApplicationsList.mock';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';

export const InstallButton = ({ manifest }: { manifest: string }) => {
  return (
    <Button
      href={manifest}
      type={'primary'}
      shape={'round'}
      size={'small'}
      icon={<DownloadOutlined />}
    >
      Install
    </Button>
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/ApplicationsList',
  component: ApplicationsList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ApplicationsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloWorld: Story = {
  args: {
    solutionId: '1',
    limit: 5,
    InstallButton: InstallButton,
    onInitialApplicationsLoad: async (solutionId, { limit }) => {
      return generateApplicationsData({ count: limit, page: 1 });
    },
    onLoadMoreApplications: async (solutionId, { limit, offset }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            generateApplicationsData({
              count: limit,
              page: offset?.page || 1,
            })
          );
        }, 5000);
      });
    },
    // setSolutionPageUrl: (solutionId) => `/solutions/${solutionId}`,
  },
};
