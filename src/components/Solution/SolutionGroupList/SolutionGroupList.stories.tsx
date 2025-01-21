import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import React, { useRef } from 'react';
import { InstallButton } from '../../Applications/ApplicationList/ApplicationsList.stories';
import { generateApplicationsData } from '../../Applications/ApplicationList/ApplicationsList.mock';
import {
  fetchApplications,
  generateSolutionGroupData,
} from '../SolutionGroup/SolutionGroup.mock';
import SolutionGroupList from './SolutionGroupList';
import { fetchSolutionGroups, IFilter } from './SolutionGroupList.mocks';

const SolutionGroups = ({
  filter,
  filterId,
}: {
  filter: IFilter;
  filterId: string;
}) => {
  const offsetRef = useRef<number>(1);
  const cursorRef = useRef<string>();

  return (
    <SolutionGroupList
      defaultView={'preview'}
      limit={5}
      InstallButton={InstallButton}
      onInitialApplicationsLoad={async (solutionId, { limit }) => {
        try {
          return await fetchApplications({ solutionId, limit });
        } catch (error) {
          console.debug(error);
          const data = generateApplicationsData({ count: limit, page: 0 });
          return { data, cursor: String(data.length) };
        }
      }}
      onLoadMoreSolutionGroups={async ({ limit }) => {
        if (navigator.onLine) {
          const { data, offset } = await fetchSolutionGroups({
            limit,
            offset: cursorRef.current,
            filter, // : 'microcontroller',
            filterId, // : '4tiaoJOa4F54jiwbAhwj', // 'IRlvP0nds3LbQAhA1XS6', '4OQQy4edGswvbN6boCKw'
          });
          cursorRef.current = offset;

          return data;
        }

        return await new Promise((resolve, reject) => {
          try {
            if (offsetRef.current >= 20) {
              resolve([]);
              return;
            }

            setTimeout(() => {
              const data = Array.from({ length: limit }).map((_, index) => {
                return generateSolutionGroupData({
                  id: index + offsetRef.current,
                });
              });

              offsetRef.current = offsetRef.current + data.length;
              resolve(data);
            }, 1500);
          } catch (error) {
            reject(error);
          }
        });
      }}
      createApplicationUrlGenerator={(solutionId) =>
        `/applications/create?solution=${solutionId}`
      }
      solutionUrlGenerator={(solutionId) => `/solutions/${solutionId}`}
    />
  );
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Solution/SolutionGroupList',
  component: SolutionGroups,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof SolutionGroups>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloWorld: Story = {
  args: {
    filter: 'microcontroller',
    filterId: '4OQQy4edGswvbN6boCKw',
  },
};
