import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { DEFAULT_SITE_CONTENT } from "@/lib/site-content/defaults";

function MockAdminApi({ children }: { children: React.ReactNode }) {
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
      if (
        url.includes("/api/admin/content") &&
        (!init?.method || init.method === "GET")
      ) {
        return new Response(JSON.stringify(DEFAULT_SITE_CONTENT), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/api/admin/content") && init?.method === "POST") {
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }
      if (url.includes("/api/admin/upload") && init?.method === "POST") {
        return new Response(JSON.stringify({ url: "/images/kg.svg" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("/api/admin/logout") && init?.method === "POST") {
        return new Response(null, { status: 200 });
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
  title: "Admin/AdminDashboard",
  component: AdminDashboard,
  decorators: [
    (Story) => (
      <div className="admin-root min-h-dvh bg-zinc-950 text-zinc-100 antialiased [--kg-accent:#F3C02D]">
        <div
          className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-25%,color-mix(in_srgb,var(--kg-accent)_18%,transparent),transparent_55%)]"
          aria-hidden
        />
        <MockAdminApi>
          <Story />
        </MockAdminApi>
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/admin",
        segments: [],
      },
    },
  },
} satisfies Meta<typeof AdminDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
