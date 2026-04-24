import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogoGrid } from "@/components/site/logo-grid";

const meta = {
  title: "Site/LogoGrid",
  component: LogoGrid,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LogoGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
