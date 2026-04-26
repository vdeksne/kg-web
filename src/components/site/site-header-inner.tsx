import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { HeaderBannerLogo } from "@/components/site/header-banner-logo";
import { LanguageSwitch } from "@/components/site/language-switch";
import { LogoLockup } from "@/components/site/logo-lockup";
import { SiteNav } from "@/components/site/site-nav";
import { SocialLinks } from "@/components/site/social-links";
import { cn } from "@/lib/utils";

const SHAPES_SRC = "/images/header_shapes_V2.png";
const SHAPES_INTRINSIC_W = 1961;
const SHAPES_INTRINSIC_H = 814;

const ABOUT_NAV_TO_CONTENT_DEFAULT_PX = 110;

export function SiteHeaderInner({
  variant = "default",
  locale = defaultLocale,
  contentGapBelowNavPx,
}: {
  variant?: "default" | "about";
  locale?: Locale;
  /** About header only: padding below primary nav before `<main>` (default 110). */
  contentGapBelowNavPx?: number;
}) {
  const isAbout = variant === "about";
  const belowNavPx = isAbout
    ? (contentGapBelowNavPx ?? ABOUT_NAV_TO_CONTENT_DEFAULT_PX)
    : undefined;

  return (
    <header
      className={cn("relative box-border w-full", !isAbout && "pb-6")}
    >
      {isAbout ? (
        <div
          className="pointer-events-none absolute top-0 right-[203px] z-0 h-[407px] w-[min(980px,calc(100vw-2rem-203px))] lg:w-[min(980px,calc(100vw-404px-203px))] select-none"
          aria-hidden
        >
          <Image
            src={SHAPES_SRC}
            alt=""
            width={SHAPES_INTRINSIC_W}
            height={SHAPES_INTRINSIC_H}
            className="h-full w-full object-contain object-top-right"
            sizes="(max-width: 1024px) 100vw, 980px"
            priority
          />
        </div>
      ) : null}

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col",
          isAbout ? "gap-[107.5px]" : "gap-6",
          isAbout
            ? "max-w-[1920px] px-[clamp(1.5rem,calc(100vw*202/1920),202px)]"
            : "max-w-6xl px-6 sm:px-10",
          !isAbout && "pt-8",
        )}
        style={
          isAbout
            ? {
                paddingTop: 206,
                paddingBottom: belowNavPx,
              }
            : undefined
        }
      >
        {isAbout ? (
          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-stretch gap-x-4 sm:gap-x-6">
            <div className="min-w-0 self-start">
              <HeaderBannerLogo locale={locale} />
            </div>
            <div className="flex min-h-0 flex-col justify-between items-end">
              <LanguageSwitch className="shrink-0" />
              <div className="flex w-full justify-center">
                <SocialLinks className="shrink-0 -translate-y-1.5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-start justify-between gap-6">
            <LogoLockup />
            <div className="flex flex-col items-end gap-4">
              <LanguageSwitch />
              <div className="flex w-full justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        )}
        <SiteNav />
      </div>
    </header>
  );
}
