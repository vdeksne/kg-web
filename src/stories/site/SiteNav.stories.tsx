import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteNav } from "@/components/site/site-nav";

const meta = {
  title: "Site/SiteNav",
  component: SiteNav,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SiteNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RowLatvian: Story = {
  args: { layout: "row" },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/lv/about",
        segments: [["locale", "lv"]],
      },
    },
  },
};

export const RowEnglish: Story = {
  args: { layout: "row" },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/en/portfolio",
        segments: [["locale", "en"]],
      },
    },
  },
};

export const Column: Story = {
  args: { layout: "col", className: "max-w-xs" },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/lv/contact",
        segments: [["locale", "lv"]],
      },
    },
  },
};
