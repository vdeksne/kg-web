import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@/components/ui/Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type something…",
    className: "w-64",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "hello@example.com",
    type: "email",
    className: "w-64",
  },
};
