import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SocialLinks } from "@/components/site/SocialLinks";

const meta = {
  title: "Site/SocialLinks",
  component: SocialLinks,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof SocialLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
