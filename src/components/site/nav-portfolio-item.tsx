"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { withLocale } from "@/lib/i18n-path";
import { GoldStrike } from "@/components/site/gold-strike";
import { usePortfolioNavCategories } from "@/components/site/portfolio-nav-provider";
import { cn } from "@/lib/utils";

/** Darbi submenu — layout from design spec (px) */
const DROPDOWN_GAP_TOP = 11.6;
const DROPDOWN_FILL = "#F3C02D";
/** Minimum width from design; panel grows with longest label */
const DROPDOWN_MIN_W = 139.43;
const DROPDOWN_H = 100.1;
const DROPDOWN_PAD_X = 17.09;
const DROPDOWN_FONT_PX = 14;
const DROPDOWN_ROW_GAP = 10;

export function NavPortfolioItem({
  locale,
  layout = "row",
}: {
  locale: Locale;
  layout?: "row" | "col";
}) {
  const categories = usePortfolioNavCategories();
  const pathname = usePathname();
  const t = messages[locale].nav;
  const portfolioPrefix = withLocale("/portfolio", locale);
  const portfolioActive =
    pathname === portfolioPrefix ||
    categories.some((c) => pathname === `${portfolioPrefix}/${c.slug}`);
  const activeSlug =
    categories.find((c) => pathname === `${portfolioPrefix}/${c.slug}`)
      ?.slug ?? categories[0]?.slug ?? "logo";

  const rowDropdownMinH = Math.max(
    DROPDOWN_H,
    24 + categories.length * (DROPDOWN_FONT_PX + DROPDOWN_ROW_GAP),
  );

  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  if (layout === "col") {
    return (
      <li className="flex flex-col gap-2">
        <Link
          href={`${portfolioPrefix}/${activeSlug}`}
          className="text-muted-foreground hover:text-foreground w-fit transition-colors"
          onClick={close}
        >
          <GoldStrike active={portfolioActive}>
            <span>{t.portfolio}</span>
          </GoldStrike>
        </Link>
        <ul className="border-border flex flex-col gap-1 border-l-2 pl-4">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`${portfolioPrefix}/${c.slug}`}
                className={cn(
                  "hover:text-foreground text-muted-foreground block text-[0.7rem] tracking-[0.18em] transition-colors",
                  pathname === `${portfolioPrefix}/${c.slug}` &&
                    "text-foreground font-medium",
                )}
                onClick={close}
              >
                {c.label[locale]}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li ref={wrapRef} className="group relative">
      <div className="flex items-center gap-0.5">
        <Link
          href={`${portfolioPrefix}/${activeSlug}`}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <GoldStrike active={portfolioActive}>
            <span>{t.portfolio}</span>
          </GoldStrike>
        </Link>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground -me-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-sm transition-colors md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${t.portfolio} submenu`}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-[0.6rem] leading-none" aria-hidden>
            ▾
          </span>
        </button>
      </div>
      <ul
        id={menuId}
        role="list"
        className={cn(
          "absolute top-full left-0 z-50 box-border flex max-w-[calc(100vw-1.5rem)] flex-col items-stretch justify-center gap-[10px] py-3",
          /* Bridge the margin gap so :hover isn’t lost between “Darbi” and the panel */
          "before:pointer-events-auto before:absolute before:bottom-full before:left-0 before:h-[11.6px] before:w-full before:content-['']",
          open ? "flex" : "hidden md:flex",
          "md:invisible md:opacity-0 md:transition-opacity md:duration-150",
          "md:group-focus-within:visible md:group-focus-within:opacity-100",
          "md:group-hover:visible md:group-hover:opacity-100",
        )}
        style={{
          marginTop: DROPDOWN_GAP_TOP,
          minWidth: DROPDOWN_MIN_W,
          width: "max-content",
          minHeight: rowDropdownMinH,
          height: "auto",
          backgroundColor: DROPDOWN_FILL,
          paddingLeft: DROPDOWN_PAD_X,
          paddingRight: DROPDOWN_PAD_X,
        }}
      >
        {categories.map((c) => {
          const subActive = pathname === `${portfolioPrefix}/${c.slug}`;
          return (
            <li key={c.slug}>
              <Link
                href={`${portfolioPrefix}/${c.slug}`}
                className="group/sub block w-full whitespace-nowrap text-left font-light tracking-[0.2em] text-white uppercase outline-none"
                style={{
                  fontSize: DROPDOWN_FONT_PX,
                  lineHeight: `${DROPDOWN_FONT_PX}px`,
                }}
                onClick={close}
              >
                <span className="relative inline-block">
                  <span
                    className={cn(
                      "pointer-events-none absolute top-1/2 right-0 left-0 z-0 h-px -translate-y-1/2 bg-muted-foreground transition-opacity duration-150 ease-out",
                      subActive
                        ? "opacity-100"
                        : "opacity-0 group-hover/sub:opacity-100 group-focus-visible/sub:opacity-100",
                    )}
                    aria-hidden
                  />
                  <span className="relative z-10">{c.label[locale]}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}
