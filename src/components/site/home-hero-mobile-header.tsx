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
          <div className="flex items-center justify-end px-4 py-2">
            <button
              type="button"
              className="text-foreground hover:text-muted-foreground flex size-10 items-center justify-center rounded-md transition-colors"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-6" strokeWidth={1.5} aria-hidden />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-2 pb-6">
            <SiteNav layout="col" compact className="w-full" />
          </div>
          <div className="mt-auto shrink-0 px-[clamp(1rem,4vw,1.5rem)] pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <SocialLinks className="[&_ul]:max-w-full [&_ul]:flex-wrap [&_ul]:justify-center [&_ul]:gap-[clamp(10px,calc(100vw*14/400),22px)] [&_a]:size-[clamp(2.5rem,calc(100vw*48/400),3rem)] [&_img]:size-full!" />
          </div>
        </div>
      ) : null}
    </>
  );
}
