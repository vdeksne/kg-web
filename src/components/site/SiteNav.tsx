"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { NavPortfolioItem } from "@/components/site/NavPortfolioItem";
import {
  PrimaryNavText,
  PRIMARY_NAV_UL_ROW_LAYOUT_CLASS,
  primaryNavItemShellClass,
} from "@/components/site/PrimaryNavText";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import {
  fluidAboutBannerNavCompactMax420,
  fluidNavMenuIconAboutDesktop,
  fluidNavMenuIconMobile,
  fluidNavMenuIconText,
  fluidPrimaryNavGap,
} from "@/lib/fluid-type";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

export type SiteNavIconScale =
  | "header"
  | "aboutBanner"
  | "drawer"
  | "drawerCompact";

function navTypographyClass(scale: SiteNavIconScale) {
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
  compact?: boolean;
  iconScale?: SiteNavIconScale;
}) {
  const pathname = usePathname();
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
  const t = messages[locale].nav;

  const resolvedScale: SiteNavIconScale =
    layout === "col" ? (compact ? "drawerCompact" : "drawer") : iconScale;

  const textScaleClass = navTypographyClass(resolvedScale);
  const aboutBanner = resolvedScale === "aboutBanner";
  const aboutBannerRow = aboutBanner && layout === "row";

  const aboutHref = withLocale("/about", locale);
  const contactHref = withLocale("/contact", locale);

  const inactiveColor =
    layout === "col" && compact ? "text-[#FFFFFF]" : "text-foreground";
  const activeColor = inactiveColor;

  const aboutSel = pathname === aboutHref;
  const contactSel = pathname === contactHref;

  const colShellInactive = primaryNavItemShellClass(
    layout === "col" && compact ? "text-[#FFFFFF]" : "text-foreground",
  );

  return (
    <nav className={cn(className, aboutBannerRow && "overflow-visible")}>
      <ul
        className={
          layout === "row"
            ? cn(
                "flex items-center font-normal leading-none min-w-0 overflow-visible",
                PRIMARY_NAV_UL_ROW_LAYOUT_CLASS,
                aboutBannerRow && "justify-center",
                fluidPrimaryNavGap,
                textScaleClass,
                aboutBannerRow && fluidAboutBannerNavCompactMax420,
              )
            : cn(
                "flex w-max flex-col items-start font-normal uppercase leading-none tracking-[0.06em]",
                compact
                  ? "gap-6 leading-snug tracking-[0.1em]"
                  : "gap-4",
                textScaleClass,
              )
        }
      >
        <li className={layout === "row" ? "shrink-0" : undefined}>
          <Link
            href={aboutHref}
            aria-current={aboutSel ? "page" : undefined}
            className={
              layout === "row"
                ? primaryNavItemShellClass(
                    cn(aboutSel ? activeColor : inactiveColor),
                  )
                : colShellInactive
            }
          >
            <PrimaryNavText selected={aboutSel}>{t.about}</PrimaryNavText>
          </Link>
        </li>
        <NavPortfolioItem
          locale={locale}
          layout={layout}
          compact={compact}
        />
        <li className={layout === "row" ? "shrink-0" : undefined}>
          <Link
            href={contactHref}
            aria-current={contactSel ? "page" : undefined}
            className={
              layout === "row"
                ? primaryNavItemShellClass(
                    cn(contactSel ? activeColor : inactiveColor),
                  )
                : colShellInactive
            }
          >
            <PrimaryNavText selected={contactSel}>{t.contact}</PrimaryNavText>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
