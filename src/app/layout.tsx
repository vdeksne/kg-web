import type { Metadata, Viewport } from "next";
import "./globals.css";

/** `viewport-fit=cover` helps `env(safe-area-inset-*)` and reliable fixed UI on notched phones. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Kaspars Groza",
  description:
    "Graphic design portfolio — identities, branding, and visual communication.",
  icons: {
    icon: "/images/kg.svg",
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
