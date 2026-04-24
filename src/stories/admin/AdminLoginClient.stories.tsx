import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import { AdminLoginClient } from "@/app/admin/login/login-client";

function MockLoginApi({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const orig = window.fetch.bind(window);
    window.fetch = async (
      input: RequestInfo | URL,
      init?: RequestInit,
    ): Promise<Response> => {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.href
            : input.url;
      if (url.includes("/api/admin/login") && init?.method === "POST") {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
      return orig(input, init);
    };
    return () => {
      window.fetch = orig;
    };
  }, []);
  return <>{children}</>;
}

const meta = {
  title: "Admin/AdminLoginClient",
  component: AdminLoginClient,
  decorators: [
    (Story) => (
      <div className="min-h-dvh bg-zinc-950 text-zinc-100 antialiased [--kg-accent:#F3C02D]">
        <MockLoginApi>
          <Story />
        </MockLoginApi>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/admin/login",
        segments: [],
        query: { next: "/admin" },
      },
    },
  },
} satisfies Meta<typeof AdminLoginClient>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
