import '../src/styles/global.css';
import type { Preview } from '@storybook/nextjs-vite';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/iu,
        date: /Date$/iu,
      },
    },
    darkMode: {
      darkClass: 'dark',
      lightClass: 'light',
      stylePreview: true,
    },
  },
  decorators: [
    (Story) => {
      // Lắng nghe nút chuyển đổi theme trên thanh công cụ của Storybook
      const isDark = useDarkMode();
      const theme = isDark ? 'dark' : 'light';

      // Dùng React.createElement thay cho JSX để giữ file chuẩn .ts
      return React.createElement(
        ThemeProvider,
        {
          attribute: 'class',
          defaultTheme: theme,
          forcedTheme: theme,
        },
        React.createElement(
          'div',
          { className: theme, style: { padding: '1rem', minHeight: '100vh' } },
          React.createElement(Story),
        ),
      );
    },
  ],
};

export default preview;
