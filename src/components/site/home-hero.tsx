import { DotGrid } from "@/components/site/dot-grid";
import { LanguageSwitch } from "@/components/site/language-switch";
import { LogoGrid } from "@/components/site/logo-grid";
import { SiteNav } from "@/components/site/site-nav";
import { SocialLinks } from "@/components/site/social-links";
import type { Messages } from "@/i18n/messages";

export function HomeHero({ home }: { home: Messages["home"] }) {
  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-white">
      <div className="relative mx-auto min-h-dvh w-full max-w-[1920px]">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-no-repeat"
          style={{
            backgroundImage: "url('/images/main-background.png')",
            backgroundSize: "100% auto",
            backgroundPosition: "calc(50% - 10px) bottom",
          }}
          aria-hidden
        />
        <span className="sr-only">{home.heroImageAlt}</span>

        <div className="relative z-10 flex h-full min-h-dvh w-full flex-col px-[clamp(1.5rem,calc(100vw*202/1920),202px)] pb-10">
          <DotGrid className="pointer-events-none absolute top-[calc(33*100vw/1920)] right-[calc(369*100vw/1920)] z-20 hidden w-[clamp(140px,calc(231.48*100vw/1920),231.48px)] lg:block" />
          <div className="flex items-start justify-between pt-[146px]">
            <LogoGrid />
            <LanguageSwitch />
          </div>

          <div className="grid flex-1 gap-10 pt-10 lg:items-center lg:pt-0">
            <div className="relative flex min-h-0 flex-col items-start justify-center text-left lg:min-h-[60vh]">
              {/* Reserve space where the hero lockup sits inside the raster (keeps nav aligned). */}
              <div
                className="w-full max-w-[1011px] shrink-0"
                aria-hidden
                style={{ aspectRatio: "1011 / 350" }}
              />
              <SiteNav
                layout="row"
                className="mt-[90px] flex w-full justify-start"
              />
            </div>
          </div>

          <div className="mt-auto flex justify-center pt-16 lg:pt-10">
            <SocialLinks className="shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
