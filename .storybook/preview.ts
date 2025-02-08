import type { Preview } from '@storybook/react';
const BREAKPOINTS_INT = {
  xs: 575.98, // 479.98, // 320,
  sm: 767.98, // 575.98, // 400,
  md: 991.98, // 767.98, // 800,
  lg: 1199.98, // 991.98, // 1199.98,
  xl: 1199.98, // 1399.98, // 1199.98,
  xxl: 1920, // 1530, // 1920,
};

const customViewPorts = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    console.log(val);
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: { viewports: customViewPorts },
  },
};

export default preview;
