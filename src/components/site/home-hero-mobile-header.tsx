"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitch } from "@/components/site/language-switch";
import { SiteNav } from "@/components/site/site-nav";
import { SocialLinks } from "@/components/site/social-links";
import { cn } from "@/lib/utils";

export function HomeHeroMobileHeader({ className }: { className?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 401px)");
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
          "fixed top-0 right-0 left-0 z-100 hidden max-[400px]:flex max-[400px]:justify-end max-[400px]:px-4",
          "pointer-events-none pt-[calc(50px+env(safe-area-inset-top))] pb-2",
          className,
        )}
      >
        <div className="pointer-events-auto flex flex-col items-end gap-1.5">
          <LanguageSwitch variant="homeMobile" className="shrink-0" />
          <button
            type="button"
            className="text-foreground hover:text-muted-foreground flex size-10 items-center justify-center rounded-md transition-colors"
            aria-expanded={open}
            aria-controls="home-mobile-nav-panel"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </header>

      {open ? (
        <div
          id="home-mobile-nav-panel"
          className="fixed inset-0 z-110 flex max-[400px]:flex min-[401px]:hidden flex-col bg-white pt-[env(safe-area-inset-top)]"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="flex shrink-0 items-center justify-end px-4 pt-2 pb-1">
            <button
              type="button"
              className="text-foreground hover:text-muted-foreground flex size-11 items-center justify-center rounded-md transition-colors"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-7" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto overscroll-contain px-4 py-4 min-[360px]:px-5">
              <SiteNav layout="col" compact className="w-full" />
            </div>
          </div>
          <div className="mt-auto shrink-0 border-t border-border/40 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] min-[360px]:px-5">
            <SocialLinks className="[&_ul]:max-w-full [&_ul]:flex-wrap [&_ul]:justify-center [&_ul]:gap-[clamp(12px,calc(100vw*16/400),24px)] [&_a]:size-[clamp(2.75rem,calc(100vw*52/400),3.25rem)] [&_img]:size-full!" />
          </div>
        </div>
      ) : null}
    </>
  );
}
