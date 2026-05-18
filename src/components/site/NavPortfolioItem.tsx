"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import {
  PrimaryNavText,
  primaryNavItemShellClass,
} from "@/components/site/PrimaryNavText";
import { usePortfolioNavCategories } from "@/components/site/PortfolioNavProvider";
import { fluidDropdownText } from "@/lib/fluid-type";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

/** Darbi submenu — layout from design spec (px) */
const DROPDOWN_GAP_TOP = 11.6;
const DROPDOWN_FILL = "#F3C02D";
const DROPDOWN_MIN_W = 139.43;
const DROPDOWN_H = 100.1;
const DROPDOWN_PAD_X = 17.09;
const DROPDOWN_COL_PAD_RIGHT = 60;
const DROPDOWN_COL_PAD_Y = 10;
const DROPDOWN_FONT_PX = 18;
const DROPDOWN_ROW_GAP = 10;

export function NavPortfolioItem({
  locale,
  layout = "row",
  compact = false,
  dropdownOpenUp = false,
  dropdown = true,
  showActiveState = true,
  /** Passed when `dropdown={false}` (e.g. footer row typography). */
  standaloneLinkClassName,
}: {
  locale: Locale;
  layout?: "row" | "col";
  compact?: boolean;
  /** Footer (etc.): open submenu above the label so it stays in view. */
  dropdownOpenUp?: boolean;
  /** `false`: single link to default portfolio category (no hover/tap submenu). */
  dropdown?: boolean;
  /** `false`: never underline / active styling for current route (e.g. footer). */
  showActiveState?: boolean;
  standaloneLinkClassName?: string;
}) {
  const categories = usePortfolioNavCategories();
  const pathname = usePathname();
  const t = messages[locale].nav;
  const portfolioPrefix = withLocale("/portfolio", locale);
  const portfolioRouteActive =
    pathname === portfolioPrefix ||
    categories.some((c) => pathname === `${portfolioPrefix}/${c.slug}`);
  const portfolioActive = showActiveState && portfolioRouteActive;
  const activeSlug =
    categories.find((c) => pathname === `${portfolioPrefix}/${c.slug}`)?.slug ??
    categories[0]?.slug ??
    "logo";

  const rowDropdownMinH = Math.max(
    DROPDOWN_H,
    24 + categories.length * (DROPDOWN_FONT_PX + DROPDOWN_ROW_GAP),
  );
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const menuId = useId();
  const openRef = useRef(open);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    // Flyout belongs to prior route/locale segment.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI on pathname change only
    setOpen(false);
  }, [pathname]);

  const [isMobileRowNav, setIsMobileRowNav] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const sync = () => setIsMobileRowNav(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    function onDoc(e: MouseEvent) {
      if (!openRef.current) return;
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("mousedown", onDoc);
    };
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const colLinkClass = primaryNavItemShellClass(
    compact ? "text-[#FFFFFF]" : "text-foreground",
  );
  const headerRowLinkClass = primaryNavItemShellClass("text-foreground");

  if (layout === "col") {
    return (
      <li
        ref={wrapRef}
        className={cn("flex flex-col", compact ? "gap-2" : "gap-2")}
      >
        <Link
          href={`${portfolioPrefix}/${activeSlug}`}
          aria-expanded={open}
          aria-controls={open ? menuId : undefined}
          className={colLinkClass}
          onClick={(e) => {
            e.preventDefault();
            setOpen((v) => !v);
          }}
        >
          <PrimaryNavText selected={portfolioActive}>
            {t.portfolio}
          </PrimaryNavText>
        </Link>
        {open ? (
          <ul
            id={menuId}
            role="list"
            className={cn(
              "box-border mt-[-2px] flex w-max max-w-full flex-col items-stretch justify-start",
              compact ? "gap-3" : "gap-2",
            )}
            style={{
              backgroundColor: DROPDOWN_FILL,
              paddingLeft: DROPDOWN_PAD_X,
              paddingRight: DROPDOWN_COL_PAD_RIGHT,
              paddingTop: DROPDOWN_COL_PAD_Y,
              paddingBottom: DROPDOWN_COL_PAD_Y,
            }}
          >
            {categories.map((c) => {
              const subActive = pathname === `${portfolioPrefix}/${c.slug}`;
              return (
                <li key={c.slug}>
                  <Link
                    href={`${portfolioPrefix}/${c.slug}`}
                    className={cn(
                      "group/sub block w-full whitespace-nowrap text-justify leading-tight font-light tracking-[0.12em] text-[#FFFFFF] uppercase outline-none",
                      fluidDropdownText,
                    )}
                    onClick={close}
                  >
                    <span className="relative inline-block">
                      <span
                        className={cn(
                          "pointer-events-none absolute top-1/2 right-0 left-0 z-0 h-px -translate-y-1/2 bg-[#FFFFFF] transition-opacity duration-150 ease-out",
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
        ) : null}
      </li>
    );
  }

  if (!dropdown) {
    return (
      <li>
        <Link
          href={`${portfolioPrefix}/${activeSlug}`}
          className={cn(
            "shrink-0 whitespace-nowrap",
            standaloneLinkClassName ?? "text-foreground",
          )}
        >
          {t.portfolio}
        </Link>
      </li>
    );
  }

  return (
    <li ref={wrapRef} className="group relative shrink-0">
      <Link
        href={`${portfolioPrefix}/${activeSlug}`}
        aria-expanded={isMobileRowNav ? open : undefined}
        aria-controls={isMobileRowNav ? menuId : undefined}
        className={headerRowLinkClass}
        onClick={(e) => {
          if (!isMobileRowNav) return;
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        <PrimaryNavText selected={portfolioActive}>
          {t.portfolio}
        </PrimaryNavText>
      </Link>
      <ul
        id={menuId}
        role="list"
        className={cn(
          "absolute left-0 z-50 box-border flex max-w-[calc(100vw-1.5rem)] flex-col items-stretch justify-center gap-[10px] py-3",
          dropdownOpenUp ? "bottom-full" : "top-full",
          dropdownOpenUp
            ? "before:pointer-events-auto before:absolute before:top-full before:left-0 before:h-[11.6px] before:w-full before:content-['']"
            : "before:pointer-events-auto before:absolute before:bottom-full before:left-0 before:h-[11.6px] before:w-full before:content-['']",
          open ? "flex" : "hidden min-[701px]:flex",
          "min-[701px]:invisible min-[701px]:opacity-0 min-[701px]:transition-opacity min-[701px]:duration-150",
          "min-[701px]:group-focus-within:visible min-[701px]:group-focus-within:opacity-100",
          "min-[701px]:group-hover:visible min-[701px]:group-hover:opacity-100",
        )}
        style={{
          ...(dropdownOpenUp
            ? { marginBottom: DROPDOWN_GAP_TOP }
            : { marginTop: DROPDOWN_GAP_TOP }),
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
                className={cn(
                  "group/sub block w-full whitespace-nowrap text-justify leading-tight font-light tracking-[0.12em] text-white uppercase outline-none",
                  fluidDropdownText,
                )}
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
