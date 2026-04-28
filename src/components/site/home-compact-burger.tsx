"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/site/site-nav";
import { HOME_WIDE_MIN_PX } from "@/lib/site-breakpoints";
import { cn } from "@/lib/utils";

/** Home-only menu; visible ≤480px. Drawer stays `fixed` as an overlay. */
export function HomeCompactBurger() {
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
            className="fixed inset-0 z-10050 cursor-default max-[480px]:block min-[481px]:hidden"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
          />
          <div
            id="home-mobile-nav-panel"
            className={cn(
              "fixed z-10100 flex max-h-[min(85dvh,calc(100dvh-6rem))] w-max max-w-[calc(100vw-44px)] flex-col overflow-hidden bg-brand text-[#FFFFFF] shadow-xl",
              "right-[22px]",
              "top-[calc(68px+env(safe-area-inset-top,0px)+5.5rem)]",
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
