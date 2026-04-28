import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleHtmlLang } from "@/components/i18n/locale-html-lang";
import { MobileSiteChrome } from "@/components/site/mobile-site-chrome";
import { PortfolioNavProvider } from "@/components/site/portfolio-nav-provider";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import { getSiteContent } from "@/lib/site-content/store";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const t = getMessages(locale);
  return {
    title: {
      default: t.meta.titleDefault,
      template: t.meta.titleTemplate,
    },
    description: t.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const site = await getSiteContent();

  return (
    <>
      <LocaleHtmlLang locale={raw} />
      <PortfolioNavProvider categories={site.portfolio.categoryNav}>
        <MobileSiteChrome />
        {children}
      </PortfolioNavProvider>
    </>
  );
}
