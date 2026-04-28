import { notFound } from "next/navigation";
import {
  PortfolioGalleryProvider,
  PortfolioGalleryTile,
} from "@/components/site/portfolio-gallery";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeaderInner } from "@/components/site/site-header-inner";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { LOGO_GALLERY_TOTAL } from "@/data/portfolio";
import { distributePortfolioItemsToColumns } from "@/lib/portfolio-gallery-columns";
import { getSiteContent } from "@/lib/site-content/store";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
  const desktopColumnCount = items.length <= 1 ? 1 : items.length === 2 ? 2 : 3;
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
          "max-lg:px-[22px] lg:px-[clamp(1.5rem,calc(100vw*202/1920),202px)]",
        )}
      >
        <PortfolioGalleryProvider items={items} locale={locale}>
          <div className="text-muted-foreground mb-[35.01px] hidden lg:flex flex-wrap items-center gap-x-1 gap-y-1 text-xs tracking-[0.18em] uppercase">
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
        </PortfolioGalleryProvider>
      </main>
      <SiteFooter />
    </div>
  );
}
