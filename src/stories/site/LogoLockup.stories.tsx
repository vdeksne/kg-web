import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogoLockup } from "@/components/site/LogoLockup";

const meta = {
  title: "Site/LogoLockup",
  component: LogoLockup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LogoLockup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
