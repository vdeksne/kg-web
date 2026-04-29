import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KgLogo } from "@/components/site/KgLogo";

const meta = {
  title: "Site/KgLogo",
  component: KgLogo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof KgLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Priority: Story = {
  args: { priority: true },
};
