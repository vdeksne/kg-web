import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GoldStrike } from "@/components/site/gold-strike";

const meta = {
  title: "Site/GoldStrike",
  component: GoldStrike,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof GoldStrike>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inactive: Story = {
  args: {
    active: false,
    children: <span className="text-sm font-medium uppercase">Label</span>,
  },
};

export const Active: Story = {
  args: {
    active: true,
    children: <span className="text-sm font-medium uppercase">Active</span>,
  },
};
