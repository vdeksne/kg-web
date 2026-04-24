import type { NextConfig } from "next";

function supabaseImagePattern():
  | { protocol: "https"; hostname: string; pathname: string }
  | undefined {
  try {
    const u = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!u) return undefined;
    return {
      protocol: "https",
      hostname: new URL(u).hostname,
      pathname: "/**",
    };
  } catch {
    return undefined;
  }
}

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      ...(supabaseImagePattern() ? [supabaseImagePattern()!] : []),
    ],
  },
};

export default nextConfig;
