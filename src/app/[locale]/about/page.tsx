import Image from "next/image";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeaderInner } from "@/components/site/site-header-inner";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getSiteContent } from "@/lib/site-content/store";

export const dynamic = "force-dynamic";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const site = await getSiteContent();
  const { about } = site;
  const portrait = about.portraitUrl;

  return (
    <div className="bg-background relative flex min-h-dvh flex-col">
      <div className="pointer-events-none absolute bottom-32 -left-20 h-72 w-72 rounded-[35%] bg-neutral-200/40 blur-3xl" />

      <SiteHeaderInner variant="about" locale={locale} />
      <main className="mx-auto w-full max-w-[1920px] flex-1 px-[clamp(1.5rem,calc(100vw*202/1920),202px)] pb-16 pt-0">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <h1 className="font-sans text-[65.55px] leading-normal font-bold not-italic text-black max-w-full">
              {about.title[locale]}
            </h1>
            <div
              className="w-[789px] max-w-full shrink-0 space-y-6 text-justify font-sans text-[20.01px] font-light leading-[179%] text-black not-italic"
            >
              {about.body[locale]
                .split(/\n\n+/)
                .map((block) => block.trim())
                .filter(Boolean)
                .map((text, i) => (
                  <p key={i}>{text}</p>
                ))}
            </div>
            <Image
              src="/images/Signature.png"
              alt={about.portraitAlt[locale]}
              width={210}
              height={142}
              className="ml-auto block h-auto w-[210px] max-w-full"
            />
          </div>
          <div className="relative mx-auto w-full max-w-[673.749px] shrink-0 lg:mx-0">
            <div
              className="relative w-full overflow-hidden rounded-sm bg-neutral-900 shadow-2xl"
              style={{ aspectRatio: "673.749 / 561.1" }}
            >
              <Image
                src={portrait}
                alt={about.portraitAlt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 674px"
                priority
                unoptimized={
                  portrait.startsWith("/uploads/") || portrait.endsWith(".svg")
                }
              />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
