"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  MainNavAboutIcon,
  MainNavContactIcon,
} from "@/components/site/menu-nav-icons";
import { NavPortfolioItem } from "@/components/site/nav-portfolio-item";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import {
  fluidNavMenuIconAboutDesktop,
  fluidNavMenuIconMobile,
  fluidNavMenuIconText,
  fluidPrimaryNavGap,
} from "@/lib/fluid-type";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

export type SiteNavIconScale = "header" | "aboutBanner" | "drawer" | "drawerCompact";

function navIconTextClass(scale: SiteNavIconScale) {
  switch (scale) {
    case "aboutBanner":
      return fluidNavMenuIconAboutDesktop;
    case "drawerCompact":
      return fluidNavMenuIconMobile;
    case "drawer":
      return fluidNavMenuIconText;
    default:
      return fluidNavMenuIconText;
  }
}

export function SiteNav({
  className,
  layout = "row",
  compact = false,
  iconScale = "header",
}: {
  className?: string;
  layout?: "row" | "col";
  /** Smaller type (home mobile drawer). */
  compact?: boolean;
  /** Match language switch: `header` default, `aboutBanner` on about desktop, drawer variants for column nav. */
  iconScale?: SiteNavIconScale;
}) {
  const pathname = usePathname();
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
  const t = messages[locale].nav;

  const resolvedScale: SiteNavIconScale =
    layout === "col"
      ? compact
        ? "drawerCompact"
        : "drawer"
      : iconScale;

  const iconText = navIconTextClass(resolvedScale);
  const aboutBanner = resolvedScale === "aboutBanner";

  const aboutHref = withLocale("/about", locale);
  const contactHref = withLocale("/contact", locale);

  return (
    <nav className={className}>
      <ul
        className={
          layout === "row"
            ? cn(
                "flex flex-wrap items-center font-normal leading-none",
                fluidPrimaryNavGap,
                iconText,
              )
            : cn(
                "flex flex-col font-normal leading-none uppercase",
                compact
                  ? "gap-4 leading-snug tracking-[0.16em]"
                  : "gap-4",
                iconText,
              )
        }
      >
        <li>
          <Link
            href={aboutHref}
            aria-label={t.about}
            className={cn(
              "inline-flex items-center leading-none transition-colors",
              pathname === aboutHref
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
              compact && "block w-full py-1",
            )}
          >
            <MainNavAboutIcon
              locale={locale}
              selected={pathname === aboutHref}
              aboutBanner={aboutBanner}
            />
          </Link>
        </li>
        <NavPortfolioItem
          locale={locale}
          layout={layout}
          compact={compact}
          aboutBanner={aboutBanner}
        />
        <li>
          <Link
            href={contactHref}
            aria-label={t.contact}
            className={cn(
              "inline-flex items-center leading-none transition-colors",
              pathname === contactHref
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
              compact && "block w-full py-1",
            )}
          >
            <MainNavContactIcon
              locale={locale}
              selected={pathname === contactHref}
              aboutBanner={aboutBanner}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
