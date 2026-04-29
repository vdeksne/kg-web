import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";

const meta = {
  title: "Site/LanguageSwitch",
  component: LanguageSwitch,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LanguageSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FromLatvianPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/lv/portfolio",
        segments: [["locale", "lv"]],
      },
    },
  },
};

export const FromEnglishPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/en/contact",
        segments: [["locale", "en"]],
      },
    },
  },
};
