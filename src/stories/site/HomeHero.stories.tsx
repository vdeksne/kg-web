import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HomeHero } from "@/components/site/HomeHero";
import { getMessages } from "@/i18n/messages";

const meta = {
  title: "Site/HomeHero",
  component: HomeHero,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/lv",
        segments: [["locale", "lv"]],
      },
    },
  },
} satisfies Meta<typeof HomeHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Latvian: Story = {
  args: {
    home: getMessages("lv").home,
  },
};

export const English: Story = {
  args: {
    home: getMessages("en").home,
  },
};
