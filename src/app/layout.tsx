import type { Metadata } from "next";
import "./globals.css";

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
