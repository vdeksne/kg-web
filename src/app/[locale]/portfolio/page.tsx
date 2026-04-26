import { redirect } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { withLocale } from "@/lib/i18n-path";
import { getSiteContent } from "@/lib/site-content/store";

export default async function PortfolioIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const site = await getSiteContent();
  const first = site.portfolio.categoryNav[0]?.slug ?? "logo";
  redirect(withLocale(`/portfolio/${first}`, locale));
}
