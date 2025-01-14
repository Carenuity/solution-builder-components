import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import Solution from '.';
import { defaultSolutionData, fetchSolution } from './Solution.mock';
import { SolutionProps } from './Solution.types';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/Solution',
  component: Solution,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Solution>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloWorld: Story = {
  args: { ...defaultSolutionData },
};

const solution = (await fetchSolution({
  id: 'GKSSP4Zxs7svuDAqbTP3',
})) as SolutionProps;

export const API: Story = {
  args: { ...solution },
};
