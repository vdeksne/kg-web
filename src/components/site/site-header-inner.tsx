import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import { HeaderBannerLogo } from "@/components/site/header-banner-logo";
import { LanguageSwitch } from "@/components/site/language-switch";
import { LogoLockup } from "@/components/site/logo-lockup";
import { SiteNav } from "@/components/site/site-nav";
import { SocialLinks } from "@/components/site/social-links";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

const SHAPES_SRC = "/images/header_shapes_V2.png";
const SHAPES_INTRINSIC_W = 1961;
const SHAPES_INTRINSIC_H = 814;

/** Subpage header: raster + compact lang ≤700px; desktop banner ≥701px. */
const SUBPAGE_HEADER_MOBILE_MAX_PX = 700;
const MOBILE_SUBPAGE_HEADER_SRC = "/images/mobite - header.png";
const MOBILE_SUBPAGE_HEADER_W = 720;
const MOBILE_SUBPAGE_HEADER_H = 260;

/** Mobile header raster frame 360×130 @ 360px ref; scales with row width. */
const MOBILE_SUBPAGE_REF_W = 360;
const MOBILE_SUBPAGE_LOGO_W = 360;

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
      {isAbout ? (
        <div
          className="pointer-events-none absolute top-0 z-0 hidden min-[701px]:block select-none"
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
            ? "max-[700px]:gap-4 min-[701px]:gap-[clamp(32px,calc(107.5*100vw/1920),107.5px)]"
            : "gap-6",
          isAbout
            ? "max-w-[1920px] px-[clamp(1.5rem,calc(100vw*202/1920),202px)] max-[700px]:px-[22px]"
            : "max-w-6xl px-6 sm:px-10",
          !isAbout && "pt-8",
          isAbout &&
            "max-[700px]:pt-0 min-[701px]:pt-[clamp(56px,calc(206*100vw/1920),206px)]",
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
            <div className="relative hidden w-full max-[700px]:block pt-[env(safe-area-inset-top)]">
              <Link
                href={withLocale("/", locale)}
                className="block aspect-360/130 w-full max-w-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Image
                  src={MOBILE_SUBPAGE_HEADER_SRC}
                  alt="Kaspars Groza — portfolio"
                  width={MOBILE_SUBPAGE_HEADER_W}
                  height={MOBILE_SUBPAGE_HEADER_H}
                  className="h-full w-full object-contain object-left"
                  sizes={`(max-width: ${SUBPAGE_HEADER_MOBILE_MAX_PX}px) ${Math.round((MOBILE_SUBPAGE_LOGO_W / MOBILE_SUBPAGE_REF_W) * SUBPAGE_HEADER_MOBILE_MAX_PX)}px, 400px`}
                  priority
                />
              </Link>
              <div className="pointer-events-none absolute top-[calc(52px+env(safe-area-inset-top))] right-0">
                <div className="pointer-events-auto">
                  <LanguageSwitch variant="homeMobile" className="shrink-0" />
                </div>
              </div>
            </div>
            <div className="hidden min-[701px]:grid w-full grid-cols-[minmax(0,1fr)_auto] items-stretch gap-x-[clamp(1rem,calc(24*100vw/1920),1.5rem)]">
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
              <LanguageSwitch />
              <div className="flex w-full justify-center">
                <SocialLinks />
              </div>
            </div>
          </div>
        )}
        <SiteNav
          className={
            isAbout
              ? "flex w-full max-[700px]:justify-center min-[701px]:justify-start"
              : undefined
          }
        />
      </div>
    </header>
  );
}
