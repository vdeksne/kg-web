import Image from "next/image";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeaderInner } from "@/components/site/site-header-inner";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { aspectRatioFromCms } from "@/lib/site-content/aspect";
import { getSiteContent } from "@/lib/site-content/store";

export const dynamic = "force-dynamic";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const site = await getSiteContent();
  const { portfolio } = site;

  return (
    <div className="bg-background min-h-screen">
      <SiteHeaderInner />
      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
        <div className="text-muted-foreground mb-8 flex flex-wrap items-center gap-4 text-xs tracking-[0.25em] uppercase">
          <span>{portfolio.breadcrumb[locale]}</span>
          <span>/</span>
          <span>{portfolio.categoryLogo[locale]}</span>
          <span className="ml-2 bg-[var(--kg-accent)] px-3 py-2 text-[0.6rem] tracking-[0.35em] text-[var(--color-brand-foreground)]">
            {portfolio.tagline[locale]}
          </span>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {portfolio.items.map((item) => (
            <article
              key={item.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-sm bg-neutral-100"
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: aspectRatioFromCms(item.ratioClass) }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  unoptimized={
                    item.src.startsWith("/uploads/") || item.src.endsWith(".svg")
                  }
                />
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
