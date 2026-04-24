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
    <div className="bg-background relative min-h-screen">
      <div className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full bg-neutral-200/60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-32 -left-20 h-72 w-72 rounded-[35%] bg-neutral-200/40 blur-3xl" />

      <SiteHeaderInner />
      <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {about.title[locale]}
            </h1>
            <div className="text-muted-foreground max-w-xl space-y-6 text-base leading-relaxed text-justify">
              <p>{about.p1[locale]}</p>
              <p>{about.p2[locale]}</p>
            </div>
            <p className="font-serif text-3xl text-neutral-800 italic">
              Kaspars Groza
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-neutral-900 shadow-2xl">
              <Image
                src={portrait}
                alt={about.portraitAlt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
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
