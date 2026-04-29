import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DotGrid } from "@/components/site/DotGrid";

const meta = {
  title: "Site/DotGrid",
  component: DotGrid,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="bg-muted/30 relative flex min-h-[360px] w-full max-w-lg items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DotGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[200px]",
  },
};
