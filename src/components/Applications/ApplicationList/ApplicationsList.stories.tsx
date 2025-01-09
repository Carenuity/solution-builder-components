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
    solution: {
      id: '1',
      name: `Air-Quality-Meter: Air Quality (VOCs, CO2 and Humidity) by SGP30 (SENSIRION)`,
    },
    limit: 5,
    InstallButton: InstallButton,
    onInitialApplicationsLoad: async (solutionId, { limit }) => {
      const data = generateApplicationsData({ count: limit, page: 0 });

      return { data, cursor: String(data.length) };
    },
    onLoadMoreApplications: async (solutionId, { limit, cursor }) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const page = Number(cursor);
          const data = generateApplicationsData({
            count: limit,
            page,
          });

          resolve({ data, cursor: String(data.length + page) });
        }, 5000);
      });
    },
    dispatchDeveloper: ({ name }) => {
      alert(name);
    },
    // setSolutionPageUrl: (solutionId) => `/solutions/${solutionId}`,
  },
};
