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
  serverExternalPackages: ["sharp"],
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    // Legacy Nemiz asset paths (Unicode filename + old PNG). Avoids 404/400 from cached HTML or bookmarks.
    const nemizSvg = "/icons/nemiz.svg";
    return [
      { source: "/images/nemiz.png", destination: nemizSvg, permanent: false },
      // NFD: nemi + combining macron (matches older deployments / macOS filenames)
      { source: "/images/nemi\u0304z.png", destination: nemizSvg, permanent: false },
      // NFC: n + precomposed macron i
      { source: "/images/nem\u012bz.png", destination: nemizSvg, permanent: false },
    ];
  },
  images: {
    // Avoid Vercel `INVALID_IMAGE_OPTIMIZE_REQUEST` / flaky `/_next/image` for local + CMS assets.
    // Images are served directly from `public/` or remote URLs; sizes are already reasonable for this site.
    unoptimized: true,
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
