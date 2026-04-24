import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KgLogoLink } from "@/components/site/kg-logo-link";

const meta = {
  title: "Site/KgLogoLink",
  component: KgLogoLink,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof KgLogoLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Latvian: Story = {
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
