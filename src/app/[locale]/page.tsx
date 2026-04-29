import { HomeHero } from "@/components/site/HomeHero";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const t = getMessages(isLocale(raw) ? raw : defaultLocale);

  return <HomeHero home={t.home} />;
}
