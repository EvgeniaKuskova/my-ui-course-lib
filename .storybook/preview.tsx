
import type { Preview } from '@storybook/react-vite';

import { ThemeProvider } from '../src';
import {
  LocaleContext,
  ruRU,
} from '../src';

const preview: Preview = {
  decorators: [
    (Story) => (
        <ThemeProvider theme="light">
          <LocaleContext.Provider value={ruRU}>
            <Story />
          </LocaleContext.Provider>
        </ThemeProvider>
    ),
  ],

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    actions: {
      argTypesRegex: '^on.*',
    },
  },
};

export default preview;
