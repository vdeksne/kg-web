import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteFooter } from "@/components/site/SiteFooter";

const meta = {
  title: "Site/SiteFooter",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Latvian: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/lv",
        segments: [["locale", "lv"]],
      },
    },
  },
};

export const English: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/en",
        segments: [["locale", "en"]],
      },
    },
  },
};
