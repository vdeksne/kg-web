"use client";

import { HomeCompactBurger } from "@/components/site/home-compact-burger";
import { LanguageSwitch } from "@/components/site/language-switch";

/** Below `lg`: LV/ENG + compact burger in normal document flow at the top of the home page. */
export function HomeHeaderMobile() {
  return (
    <header className="relative z-20 w-full lg:hidden pointer-events-none">
      <div className="flex w-full flex-col items-end gap-3 px-[22px] pt-[calc(68px+env(safe-area-inset-top,0))] pb-3">
        <nav aria-label="Language" className="pointer-events-auto">
          <LanguageSwitch variant="homeMobile" className="shrink-0" />
        </nav>
        <div className="pointer-events-auto">
          <HomeCompactBurger />
        </div>
      </div>
    </header>
  );
}
