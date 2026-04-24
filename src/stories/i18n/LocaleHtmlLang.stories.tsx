import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LocaleHtmlLang } from "@/components/i18n/locale-html-lang";

const meta = {
  title: "i18n/LocaleHtmlLang",
  component: LocaleHtmlLang,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LocaleHtmlLang>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Renders nothing visible; sets `document.documentElement.lang` in an effect. */
export const Latvian: Story = {
  args: { locale: "lv" },
  render: (args) => (
    <div className="text-muted-foreground max-w-md space-y-2 text-center text-sm">
      <LocaleHtmlLang {...args} />
      <p>
        Open the canvas iframe’s <code className="text-foreground">&lt;html&gt;</code>{" "}
        in devtools — <code className="text-foreground">lang</code> should be{" "}
        <strong className="text-foreground">lv</strong>.
      </p>
    </div>
  ),
};

export const English: Story = {
  args: { locale: "en" },
  render: (args) => (
    <div className="text-muted-foreground max-w-md space-y-2 text-center text-sm">
      <LocaleHtmlLang {...args} />
      <p>
        <code className="text-foreground">lang</code> should be{" "}
        <strong className="text-foreground">en</strong>.
      </p>
    </div>
  ),
};
