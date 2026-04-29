import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { HeaderBannerLogo } from "@/components/site/HeaderBannerLogo";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { LogoLockup } from "@/components/site/LogoLockup";
import { SiteNav } from "@/components/site/SiteNav";
import { SocialLinks } from "@/components/site/SocialLinks";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

const SHAPES_SRC = "/images/header_shapes_V2.png";
const SHAPES_INTRINSIC_W = 1961;
const SHAPES_INTRINSIC_H = 814;

/** Subpage header: mobile raster below `lg`; desktop banner + in-flow lang from `lg`. */
const SUBPAGE_HEADER_MOBILE_MAX_PX = 1023;
const MOBILE_SUBPAGE_HEADER_SRC = "/images/mobite - header.png";
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
    <header
      className={cn("relative box-border w-full", !isAbout && "pb-6")}
    >
      <div className="relative z-20 flex w-full justify-end px-[22px] pt-[calc(68px+env(safe-area-inset-top,0))] pb-3 lg:hidden pointer-events-none">
        <nav aria-label="Language" className="pointer-events-auto">
          <LanguageSwitch variant="homeMobile" className="shrink-0" />
        </nav>
      </div>
      {isAbout ? (
        <div
          className="pointer-events-none absolute top-0 z-0 hidden lg:block select-none"
          style={{
            right: "clamp(48px, calc(203 * 100vw / 1920), 203px)",
            height: "clamp(160px, calc(407 * 100vw / 1920), 407px)",
            width:
              "min(980px, calc(100vw - 2 * clamp(1.5rem, 100vw * 202 / 1920, 202px) - clamp(48px, 100vw * 203 / 1920, 203px)))",
          }}
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
          isAbout
            ? "max-lg:gap-7 lg:gap-[clamp(32px,calc(107.5*100vw/1920),107.5px)]"
            : "gap-6",
          isAbout
            ? "max-w-[1920px] px-[clamp(1.5rem,calc(100vw*202/1920),202px)] max-lg:px-[22px]"
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
                "relative hidden w-full max-lg:block max-lg:mx-[-22px] max-lg:w-[calc(100%+44px)]",
                "pt-0",
              )}
            >
              <Link
                href={withLocale("/", locale)}
                className="relative block w-full max-w-none rounded-none border-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Image
                  src={MOBILE_SUBPAGE_HEADER_SRC}
                  alt="Kaspars Groza — portfolio"
                  width={MOBILE_SUBPAGE_HEADER_W}
                  height={MOBILE_SUBPAGE_HEADER_H}
                  className="h-auto w-full max-lg:-mt-28 object-contain object-left"
                  sizes={`(max-width: ${SUBPAGE_HEADER_MOBILE_MAX_PX}px) 100vw, 400px`}
                  priority
                />
              </Link>
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
          <div className="flex flex-wrap items-start justify-between gap-6">
            <LogoLockup />
            <div className="flex flex-col items-end gap-4">
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
