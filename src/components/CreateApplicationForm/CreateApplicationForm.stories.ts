import type { Meta, StoryObj } from '@storybook/react';
// import { fn } from "@storybook/test";
import CreateApplicationForm from './CreateApplicationForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/CreateApplicationForm/Steps',
  component: CreateApplicationForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof CreateApplicationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const HelloWorld: Story = {
  args: {
    accessToken: `eyJraWQiOiJIRHBYM3ZsR2NTTGk4dzQyWkRicXNlK2hkXC85VngzVUNDV2E1ajNrOTdPUT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhMzM0YzgyMi0zMDExLTcwNjMtZmNkZi03ODBiZDBkNGFkMzgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2V1LWNlbnRyYWwtMV9CRmd2VTFMYUMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIxYzF0bTY3c2QyNW0xMzhmOGNjbGxyZG9mZSIsIm9yaWdpbl9qdGkiOiIwNjA0ZGYwYy00YjhhLTRmN2EtOTJlNC1hODQ1ZDJmNDliNTAiLCJldmVudF9pZCI6IjRjNWJmYTRiLTlhMTQtNDFjNi04MTYyLTlhM2Y3ZGVlZDQzYyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoib3BlbmlkIiwiYXV0aF90aW1lIjoxNzI5Njg4Mzk5LCJleHAiOjE3Mjk3NzQ3OTksImlhdCI6MTcyOTY4ODM5OSwianRpIjoiYTMyMmRlNGEtODBiMy00ZDk0LTllZjktODJmOTAzMGMxOTdhIiwidXNlcm5hbWUiOiJhMzM0YzgyMi0zMDExLTcwNjMtZmNkZi03ODBiZDBkNGFkMzgifQ.8Evb6EHgxYQntFZC9U4KzlIXaomx_jMBEzK6RgMY_17tn_sEoJ8A-3kO4iGXmqKM4cFIxNudVgb8-NcWCLu2xnbNPj8ePDluV6DqIXDfLxiNhZS_kZg18hmqjdSCQNbnCnrl-yyYfb4K2TJ2apUXKIKg-R3IS3iDxmrCUAWC8IPgFKZ4SwRSAQYnUF0sT9WSNsvQSXmzxx7WL1ni9xCvVaV_SV_hX5fmcR_yISGBaJejDPxzRrTKk8fu8gnNuVcPcrW0c6kzbcTGep9oVciUAmlSBMkyhp9H14TZyMrxA_eD718kKjzemEqAPUzws7x6nG8kPpiqFocLCYT6hwRoXQ`,
  },
};
