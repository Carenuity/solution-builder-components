import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import React, { useRef } from 'react';
import SolutionGroupListHoc from '.';
import { InstallButton } from '../../Applications/ApplicationList/ApplicationsList.stories';
import { generateApplicationsData } from '../../Applications/ApplicationList/ApplicationsList.mock';
import { generateSolutionGroupData } from '../SolutionGroup/SolutionGroup.mock';

const SolutionGroups = () => {
  const offsetRef = useRef<number>(1);

  const { SolutionGroupList } = SolutionGroupListHoc({
    defaultView: 'preview',
    limit: 5,
    InstallButton: InstallButton,
    onInitialApplicationsLoad: async (solutionId, { limit }) => {
      const data = generateApplicationsData({ count: limit, page: 0 });
      return { data, cursor: String(data.length) };
    },
    onLoadMoreSolutionGroups: async ({ limit }) => {
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
            // setOffset((old) => old + data.length);
            offsetRef.current = offsetRef.current + data.length;
            resolve(data);
          }, 1500);
        } catch (error) {
          reject(error);
        }
      });
    },
    createApplicationUrlGenerator: (solutionId) =>
      `/applications/create?solution=${solutionId}`,
    solutionUrlGenerator: (solutionId) => `/solutions/${solutionId}`,
  });

  // useEffect(() => {
  //   const data = Array.from({ length: 5 }).map((_, index) => {
  //     return generateSolutionGroupData({ id: index });
  //   });
  //   // const data = [generateSolutionGroupData({ id: 1 })];
  //   setData((old) => [...old, ...data]);
  //   setInitialLoading(false);
  // }, []);

  return <SolutionGroupList />;
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
  args: {},
};
