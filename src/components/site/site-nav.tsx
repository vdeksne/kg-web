"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { GoldStrike } from "@/components/site/gold-strike";
import { NavPortfolioItem } from "@/components/site/nav-portfolio-item";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import {
  fluidHomeMobileMenu,
  fluidPrimaryNavGap,
  fluidPrimaryText,
} from "@/lib/fluid-type";
import { withLocale } from "@/lib/i18n-path";

export function SiteNav({
  className,
  layout = "row",
  compact = false,
}: {
  className?: string;
  layout?: "row" | "col";
  /** Smaller type (home mobile drawer). */
  compact?: boolean;
}) {
  const pathname = usePathname();
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
  const t = messages[locale].nav;

  const aboutHref = withLocale("/about", locale);
  const contactHref = withLocale("/contact", locale);

  return (
    <nav className={className}>
      <ul
        className={
          layout === "row"
            ? `flex flex-wrap items-center font-normal tracking-[0.25em] uppercase ${fluidPrimaryNavGap} ${fluidPrimaryText}`
            : compact
              ? `flex flex-col uppercase ${fluidHomeMobileMenu}`
              : `flex flex-col gap-4 font-normal tracking-[0.15em] uppercase ${fluidPrimaryText}`
        }
      >
        <li>
          <Link
            href={aboutHref}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GoldStrike active={pathname === aboutHref}>
              <span>{t.about}</span>
            </GoldStrike>
          </Link>
        </li>
        <NavPortfolioItem
          locale={locale}
          layout={layout}
          compact={compact}
        />
        <li>
          <Link
            href={contactHref}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GoldStrike active={pathname === contactHref}>
              <span>{t.contact}</span>
            </GoldStrike>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
