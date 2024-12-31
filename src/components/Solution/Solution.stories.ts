import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import Solution from '.';
import { sliderProps } from '../common/Slider/index.mock';
import { InstallButton } from '../Applications/ApplicationList/ApplicationsList.stories';
import { generateApplicationsData } from '../Applications/ApplicationList/ApplicationsList.mock';

const sensorImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fiot_component%252Favatars%252FBw2OFYjZDgrDmFmRhC3B%252F1719586250894_S_BMP180.png%3Falt%3Dmedia%26token%3Da056fd8d-65c6-4e40-8b5a-977c3f1b205a&w=256&q=75`;
const boardImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fiot_component%252Favatars%252F4OQQy4edGswvbN6boCKw%252F1719656936332_c3-mini_carenuity.png%3Falt%3Dmedia%26token%3D054555e4-e04b-466f-aef7-1c257c533b33&w=256&q=75`;
const actuatorImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fiot_component%252Favatars%252Fb0A3sJ4VNoi9brJB7eR4%252F1719585948570_OLED.png%3Falt%3Dmedia%26token%3Dbb2567e3-2ea8-40bf-b365-162cb1a64905&w=256&q=75`;
const ecosystemImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fecosystem%252Favatars%252FmxPH5kGodhJBicKPFXwx%252F1719573578337_Cloudfree_Profile-Preview_transp.PNG%3Falt%3Dmedia%26token%3D01a79023-fedd-4b0c-a758-b6a08019890d&w=32&q=75`;
const companyImage = `https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fcompany%252Favatars%252FZpPTBErPqSiOwSxON6t5%252F1719655090636_carenuity.png%3Falt%3Dmedia%26token%3D41ced7d7-4d43-4e3f-9bc3-d3d441fa8e73&w=384&q=75`;
const solutionImage =
  'https://solutions.carenuity.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fsolution-builder-421307.appspot.com%2Fo%2Fimages%252Fsolution_template%252Favatars%252FeieQlkAmwh1LUePfYXmW%252F1723542605619_SGP30_C3-Mini_0.66-OLED_couldfree.png%3Falt%3Dmedia%26token%3D47a6d73a-8f26-4659-bbd0-3f5ec4a90979&w=640&q=75';

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
  args: {
    id: '1',
    defaultView: 'preview',
    applicationCategories: sliderProps.items,
    name: `Air-Quality-Meter: Air Quality (VOCs, CO2 and Humidity) by SGP30
              (SENSIRION) - C3-Mini`,
    imageUrl: solutionImage,
    sensor: {
      name: 'BMP180',
      id: '2',
      logo: sensorImage,
      shopUrl: '#',
      manufacturer: { id: '1', logo: companyImage, name: 'Carenuity' },
    },
    microcontroller: {
      name: 'C3-Mini',
      id: '1',
      logo: boardImage,
      shopUrl: '#',
      manufacturer: { id: '1', logo: companyImage, name: 'Carenuity' },
    },
    actuator: {
      name: '0.66 OLED',
      id: '3',
      logo: actuatorImage,
      shopUrl: '#',
      manufacturer: { id: '1', logo: companyImage, name: 'Carenuity' },
    },
    ecosystem: {
      name: 'Cloudfree Applications',
      logo: ecosystemImage,
    },
    contributors: 10,
    rating: 5,
    totalApplications: 20,
    shopUrl: '#',
    setApplicationPageUrl: (id) => `/applications/${id}`,
    setManufacturerSolutionsPageUrl: (id, type) => {
      switch (type) {
        case 'sensor':
          return `sensors/${id}`;

        case 'micro-controller':
          return `boards/${id}`;

        case 'actuator':
          return `actuators/${id}`;
      }
    },
    generateSolutionPageUrl: (solutionId) =>
      `https://solutions.carenuity.com/solutions/${solutionId}`,
    generateEmbedding(solutionId) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/l--a30OOf8k?si=qdLrk7g2qM7al6eD&id=${solutionId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    },
    limit: 5,
    InstallButton: InstallButton,
    onInitialApplicationsLoad: async (solutionId, { limit }) => {
      return generateApplicationsData({ count: limit, page: 1 });
    },
    generateCreateApplicationUrl: (solutionId) =>
      `/${solutionId}/applications/create`,
  },
};
