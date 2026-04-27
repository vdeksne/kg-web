"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitch } from "@/components/site/language-switch";
import { SiteNav } from "@/components/site/site-nav";
import { HOME_WIDE_MIN_PX, MOBILE_HOME_LANG_TOP_CLASS } from "@/lib/site-breakpoints";
import { cn } from "@/lib/utils";

export function HomeHeroMobileHeader({ className }: { className?: string }) {
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
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-100 hidden max-[480px]:block",
          "pointer-events-none",
          className,
        )}
      >
        <div
          className={cn(
            "pointer-events-auto absolute right-[22px] z-10",
            MOBILE_HOME_LANG_TOP_CLASS,
            "flex w-max max-w-full flex-col items-end gap-3",
          )}
        >
          <LanguageSwitch variant="homeMobile" className="shrink-0" />
          <div className="relative shrink-0">
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
                    "absolute top-[9px] right-0 z-110 flex max-h-[min(85dvh,calc(100dvh-6rem))] w-[min(calc(100vw-2rem),16rem)] flex-col overflow-hidden bg-brand text-[#231F20] shadow-xl",
                    "max-[480px]:flex min-[481px]:hidden",
                  )}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                >
                  <div className="flex shrink-0 items-center justify-end px-2 py-1.5">
                    <button
                      type="button"
                      className="flex size-10 items-center justify-center rounded-md text-[#231F20] transition-colors hover:text-[#231F20]/75"
                      aria-label="Close menu"
                      onClick={() => setOpen(false)}
                    >
                      <X className="size-6" strokeWidth={1.5} aria-hidden />
                    </button>
                  </div>
                  <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                    <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overscroll-contain px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] min-[380px]:px-4">
                      <SiteNav layout="col" compact className="w-full" />
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
}
