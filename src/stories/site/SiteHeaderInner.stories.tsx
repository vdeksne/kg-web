import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteHeaderInner } from "@/components/site/site-header-inner";

const meta = {
  title: "Site/SiteHeaderInner",
  component: SiteHeaderInner,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SiteHeaderInner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const About: Story = {
  args: {
    variant: "about",
    locale: "lv",
  },
};
