import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeaderInner } from "@/components/site/site-header-inner";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import {
  GALLERY_OBJECT_CONTAIN_IDS,
  GALLERY_TILE_PRESETS,
  aspectRatioCssFromTileSize,
} from "@/lib/gallery-tile-sizes";
import { distributePortfolioItemsToColumns } from "@/lib/portfolio-gallery-columns";
import { LOGO_GALLERY_TOTAL } from "@/data/portfolio";
import { getSiteContent } from "@/lib/site-content/store";
import type { PortfolioItem } from "@/lib/site-content/types";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const galleryImageHover =
  "transition-transform duration-[1.15s] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none motion-reduce:duration-0 group-hover:scale-[1.035] motion-reduce:group-hover:scale-100";

function PortfolioGalleryTile({ item }: { item: PortfolioItem }) {
  const frame = GALLERY_TILE_PRESETS[item.tileSize];
  const isContain = GALLERY_OBJECT_CONTAIN_IDS.has(item.id);
  return (
    <article
      className="group w-full max-md:self-center overflow-hidden bg-neutral-100"
      style={{ maxWidth: `${frame.width}px` }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: aspectRatioCssFromTileSize(item.tileSize),
        }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className={cn(
            galleryImageHover,
            isContain
              ? "origin-center object-contain object-center"
              : "origin-top object-cover object-top",
          )}
          unoptimized={
            item.src.startsWith("/uploads/") || item.src.endsWith(".svg")
          }
        />
      </div>
    </article>
  );
}

export default async function PortfolioCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale: raw, category: categoryParam } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const site = await getSiteContent();
  const { portfolio } = site;
  const navSlugs = new Set(portfolio.categoryNav.map((c) => c.slug));
  if (!navSlugs.has(categoryParam)) notFound();
  const categoryTitle =
    portfolio.categoryNav.find((c) => c.slug === categoryParam)?.label[
      locale
    ] ?? categoryParam;
  const items = portfolio.items.filter((item) =>
    item.categories.includes(categoryParam),
  );
  const desktopColumnCount =
    items.length <= 1 ? 1 : items.length === 2 ? 2 : 3;
  const desktopColumns = distributePortfolioItemsToColumns(
    items,
    desktopColumnCount,
    categoryParam === "logo" && items.length === LOGO_GALLERY_TOTAL
      ? { logoBottomRowEmptyFirstColumn: true }
      : undefined,
  );
  const tabletColumnCount = items.length <= 1 ? 1 : 2;
  const tabletColumns = distributePortfolioItemsToColumns(
    items,
    tabletColumnCount,
  );

  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <SiteHeaderInner
        variant="about"
        locale={locale}
        contentGapBelowNavPx={0}
      />
      <main
        className={cn(
          "mx-auto w-full max-w-[1920px] flex-1 pb-12 pt-[76px]",
          "max-[700px]:px-[22px] min-[701px]:px-[clamp(1.5rem,calc(100vw*202/1920),202px)]",
        )}
      >
        <div className="text-muted-foreground mb-[35.01px] hidden min-[701px]:flex flex-wrap items-center gap-x-1 gap-y-1 text-xs tracking-[0.18em] uppercase">
          <span>{portfolio.breadcrumb[locale]}</span>
          <span>/</span>
          <span>{categoryTitle}</span>
        </div>

        {/* Mobile: one column, document order. */}
        <div className="flex flex-col items-center gap-4 md:hidden">
          {items.map((item) => (
            <PortfolioGalleryTile key={item.id} item={item} />
          ))}
        </div>
        {/* Tablet: two masonry columns (md–lg). */}
        <div className="hidden gap-[23px] md:flex lg:hidden md:items-start">
          {tabletColumns.map((colItems, colIndex) => (
            <div
              key={colIndex}
              className="flex min-w-0 flex-1 flex-col gap-[23px]"
            >
              {colItems.map((item) => (
                <PortfolioGalleryTile key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
        {/* Desktop lg+: Figma-style three stacks (or fewer if few items). */}
        <div className="hidden gap-[23px] lg:flex lg:items-start">
          {desktopColumns.map((colItems, colIndex) => (
            <div
              key={colIndex}
              className="flex min-w-0 flex-1 flex-col gap-[23px]"
            >
              {colItems.map((item) => (
                <PortfolioGalleryTile key={item.id} item={item} />
              ))}
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
