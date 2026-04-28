"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitch } from "@/components/site/language-switch";
import { SiteNav } from "@/components/site/site-nav";
import { isLocale } from "@/i18n/config";
import {
  HOME_WIDE_MIN_PX,
  MOBILE_HEADER_LANG_TOP_CLASS,
} from "@/lib/site-breakpoints";
import { cn } from "@/lib/utils";

function pathIsLocaleHome(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const parts = normalized.split("/").filter(Boolean);
  return parts.length === 1 && isLocale(parts[0]!);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** Home burger + drawer only for compact hero (≤480px). */
function HomeCompactBurger() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${HOME_WIDE_MIN_PX}px)`);
    const onMq = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative hidden max-[480px]:block shrink-0">
      <button
        type="button"
        className="text-foreground hover:text-muted-foreground inline-flex h-9 min-h-9 items-center justify-end rounded-md py-0 pr-0 pl-3 transition-colors"
        aria-expanded={open}
        aria-controls="home-mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <Image
          src="/icons/burger.svg"
          alt=""
          width={30}
          height={18}
          className="pointer-events-none h-4.5 w-auto"
          aria-hidden
          unoptimized
        />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-105 cursor-default max-[480px]:block min-[481px]:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
          />
          <div
            id="home-mobile-nav-panel"
            className={cn(
              "fixed z-110 flex max-h-[min(85dvh,calc(100dvh-6rem))] w-max max-w-[calc(100vw-44px)] flex-col overflow-hidden bg-brand text-[#FFFFFF] shadow-xl",
              "right-[22px]",
              /* Below lang + gap; pulled up slightly so hero/header SVG doesn’t show above the panel */
              "top-[calc(68px+env(safe-area-inset-top)+0.75rem+0.75rem+9px-8px)]",
              "max-[480px]:flex min-[481px]:hidden",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overscroll-contain px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] min-[380px]:px-4">
                <SiteNav layout="col" compact className="w-max" />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

/**
 * Single fixed slot for mobile LV/ENG (≤700px) so position matches across home and subpages.
 * Home compact (≤480px) stacks the burger under the same column; wide home (481–700) uses in-hero lang only.
 */
export function MobileSiteChrome() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isHome = pathIsLocaleHome(pathname);
  const max700 = useMediaQuery("(max-width: 700px)");
  const min481 = useMediaQuery(`(min-width: ${HOME_WIDE_MIN_PX}px)`);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showChrome =
    mounted && max700 && !(isHome && min481);

  if (!showChrome) return null;

  return (
    <header
      className="pointer-events-none fixed top-0 right-0 left-0 z-100"
      aria-hidden={false}
    >
      <div
        className={cn(
          "pointer-events-auto absolute right-[22px] z-10 flex w-max max-w-full flex-col items-end gap-3",
          MOBILE_HEADER_LANG_TOP_CLASS,
        )}
      >
        <LanguageSwitch variant="homeMobile" className="shrink-0" />
        {isHome ? <HomeCompactBurger /> : null}
      </div>
    </header>
  );
}
