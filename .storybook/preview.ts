import type { Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/lv",
        // App router mock iterates `segments` with `[...segments]` — use tuples, not a plain object.
        segments: [["locale", "lv"]],
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;