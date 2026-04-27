"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitch } from "@/components/site/language-switch";
import { SiteNav } from "@/components/site/site-nav";
import { SocialLinks } from "@/components/site/social-links";
import { HOME_WIDE_MIN_PX } from "@/lib/site-breakpoints";
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
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-100 hidden max-[430px]:flex max-[430px]:justify-end max-[430px]:px-3",
          "pointer-events-none pt-[calc(44px+env(safe-area-inset-top))] pb-1.5",
          className,
        )}
      >
        <div className="pointer-events-auto flex flex-col items-end gap-1">
          <LanguageSwitch variant="homeMobile" className="shrink-0" />
          <button
            type="button"
            className="text-foreground hover:text-muted-foreground inline-flex h-9 min-h-9 items-center justify-end rounded-md py-0 pr-0 pl-3 transition-colors"
            aria-expanded={open}
            aria-controls="home-mobile-nav-panel"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
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
        </div>
      </header>

      {open ? (
        <div
          id="home-mobile-nav-panel"
          className="fixed inset-0 z-110 flex max-[430px]:flex min-[431px]:hidden flex-col bg-white pt-[env(safe-area-inset-top)]"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex shrink-0 items-center justify-end px-3 pt-1.5 pb-0.5">
            <button
              type="button"
              className="text-foreground hover:text-muted-foreground flex size-10 items-center justify-center rounded-md transition-colors"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-6" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overscroll-contain px-3 py-3 min-[380px]:px-4">
              <SiteNav layout="col" compact className="w-full" />
            </div>
          </div>
          <div className="mt-auto shrink-0 border-t border-border/40 px-3 pt-2 pb-[max(0.875rem,env(safe-area-inset-bottom))] min-[380px]:px-4">
            <SocialLinks className="[&_ul]:max-w-full [&_ul]:flex-wrap [&_ul]:justify-center [&_ul]:gap-[clamp(10px,calc(100vw*14/430),20px)] [&_a]:size-[clamp(2.35rem,calc(100vw*44/430),2.85rem)] [&_img]:size-full!" />
          </div>
        </div>
      ) : null}
    </>
  );
}
