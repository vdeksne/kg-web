import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { HeaderBannerLogo } from "@/components/site/HeaderBannerLogo";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { LogoLockup } from "@/components/site/LogoLockup";
import { SiteNav } from "@/components/site/SiteNav";
import { SocialLinks } from "@/components/site/SocialLinks";
import { fluidHomeMobileLangCompactMax420 } from "@/lib/fluid-type";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

const SHAPES_SRC = "/images/header_shapes_V2.png";

/** Subpage header: mobile raster below `lg`; desktop banner + in-flow lang from `lg`. */
const MOBILE_SUBPAGE_HEADER_SRC = "/images/mobite - header.png";
/** CSS `url()` must encode spaces; Next/Image handled this implicitly. */
const MOBILE_SUBPAGE_HEADER_URL = encodeURI(MOBILE_SUBPAGE_HEADER_SRC);
const MOBILE_SUBPAGE_HEADER_W = 720;
const MOBILE_SUBPAGE_HEADER_H = 260;

export function SiteHeaderInner({
  variant = "default",
  locale = defaultLocale,
  contentGapBelowNavPx,
}: {
  variant?: "default" | "about";
  locale?: Locale;
  /** About header only: padding below primary nav (`px`). Omit for fluid spacing (≈110px @ 1920). */
  contentGapBelowNavPx?: number;
}) {
  const isAbout = variant === "about";
  const belowNavPx = isAbout ? contentGapBelowNavPx : undefined;

  return (
    <header className={cn("relative box-border w-full", !isAbout && "pb-6")}>
      <div className="relative z-20 flex w-full justify-end px-[22px] pt-[calc(68px+env(safe-area-inset-top,0))] pb-3 sm:px-9 md:px-12 lg:hidden pointer-events-none">
        <nav aria-label="Language" className="pointer-events-auto">
          <LanguageSwitch
            variant="homeMobile"
            className={cn("shrink-0", fluidHomeMobileLangCompactMax420)}
          />
        </nav>
      </div>
      {isAbout ? (
        <div
          className="pointer-events-none absolute top-0 z-0 hidden bg-contain bg-right-top bg-no-repeat select-none lg:block"
          style={{
            right: "clamp(48px, calc(203 * 100vw / 1920), 203px)",
            height: "clamp(160px, calc(407 * 100vw / 1920), 407px)",
            width:
              "min(980px, calc(100vw - 2 * clamp(1.5rem, 100vw * 202 / 1920, 202px) - clamp(48px, 100vw * 203 / 1920, 203px)))",
            backgroundImage: `url('${SHAPES_SRC}')`,
          }}
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col",
          isAbout
            ? "max-lg:gap-7 lg:gap-[clamp(32px,calc(107.5*100vw/1920),107.5px)]"
            : "gap-6",
          isAbout
            ? "max-w-[1920px] px-[clamp(1.5rem,calc(100vw*202/1920),202px)] max-lg:px-[22px] sm:max-lg:px-9 md:max-lg:px-12"
            : "max-w-6xl px-6 sm:px-10",
          !isAbout && "pt-8 max-lg:pt-0",
          isAbout &&
            "max-lg:pt-0 lg:pt-[clamp(56px,calc(206*100vw/1920),206px)]",
        )}
        style={
          isAbout
            ? {
                paddingBottom:
                  belowNavPx !== undefined
                    ? `${belowNavPx}px`
                    : "clamp(40px, calc(110 * 100vw / 1920), 110px)",
              }
            : undefined
        }
      >
        {isAbout ? (
          <>
            <div
              className={cn(
                "relative hidden w-full max-lg:block",
                "max-lg:mx-[-22px] max-lg:w-[calc(100%+44px)]",
                "sm:max-lg:-mx-9 sm:max-lg:w-[calc(100%+4.5rem)]",
                "md:max-lg:-mx-12 md:max-lg:w-[calc(100%+6rem)]",
                "pt-0",
              )}
            >
              <Link
                href={withLocale("/", locale)}
                aria-label="Kaspars Groza — portfolio"
                className="relative block w-full max-w-none rounded-none border-0 bg-contain bg-left bg-no-repeat outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 max-lg:-mt-28"
                style={{
                  aspectRatio: `${MOBILE_SUBPAGE_HEADER_W} / ${MOBILE_SUBPAGE_HEADER_H}`,
                  backgroundImage: `url('${MOBILE_SUBPAGE_HEADER_URL}')`,
                }}
              />
            </div>
            <div className="hidden lg:grid w-full grid-cols-[minmax(0,1fr)_auto] items-stretch gap-x-[clamp(1rem,calc(24*100vw/1920),1.5rem)]">
              <div className="min-w-0 self-start">
                <HeaderBannerLogo locale={locale} />
              </div>
              <div className="flex h-full min-h-0 w-max max-w-full flex-col items-end justify-between justify-self-end">
                <LanguageSwitch variant="aboutDesktop" className="shrink-0" />
                <SocialLinks fluid className="shrink-0" />
              </div>
            </div>
          </>
        ) : (
          <div
            className={cn(
              "flex justify-between gap-6",
              /* One row on desktop so LV/ENG can’t change header height by wrapping. */
              "max-lg:flex-wrap max-lg:items-start",
              "lg:flex-nowrap lg:items-center lg:min-h-0",
            )}
          >
            <LogoLockup />
            <div className="flex min-h-0 shrink-0 flex-col items-end gap-4">
              <LanguageSwitch className="hidden lg:flex" />
              <div className="flex w-full justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        )}
        <SiteNav
          iconScale={isAbout ? "aboutBanner" : "header"}
          className={
            isAbout
              ? "flex w-full max-lg:justify-center lg:justify-start"
              : undefined
          }
        />
      </div>
    </header>
  );
}
