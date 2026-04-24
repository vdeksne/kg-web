import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContactForm } from "@/components/site/contact-form";
import { getMessages } from "@/i18n/messages";

const meta = {
  title: "Site/ContactForm",
  component: ContactForm,
  decorators: [
    (Story) => (
      <div className="bg-background mx-auto max-w-3xl p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Latvian: Story = {
  args: {
    copy: getMessages("lv").contact,
  },
};

export const English: Story = {
  args: {
    copy: getMessages("en").contact,
  },
};
