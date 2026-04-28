import type { Metadata, Viewport } from "next";
import "./globals.css";

function metadataBaseUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    const base = raw.endsWith("/") ? raw.slice(0, -1) : raw;
    return new URL(base);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

const siteTitle = "Kaspars Groza — Portfolio";
const siteDescription =
  "Grafiskā dizaina portfolio — zīmoli, identitātes un vizuālā komunikācija.";

/** `viewport-fit=cover` helps `env(safe-area-inset-*)` and reliable fixed UI on notched phones. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: siteTitle,
    template: "%s | Kaspars Groza",
  },
  description: siteDescription,
  icons: {
    icon: [
      { url: "/api/brand-icon", sizes: "512x512", type: "image/png" },
      { url: "/images/kg.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/api/brand-icon", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Kaspars Groza",
    locale: "lv_LV",
    type: "website",
    images: [
      {
        url: "/api/og-image",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/api/og-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lv" className="h-full antialiased">
      <body className="bg-background text-foreground min-h-full font-sans">
        {children}
      </body>
    </html>
  );
}
