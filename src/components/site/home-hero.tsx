import type { CSSProperties } from "react";
import Image from "next/image";
import { DotGrid } from "@/components/site/dot-grid";
import { LanguageSwitch } from "@/components/site/language-switch";
import { HomeHeroMobileHeader } from "@/components/site/home-hero-mobile-header";
import { SiteNav } from "@/components/site/site-nav";
import { SocialLinks } from "@/components/site/social-links";
import type { Messages } from "@/i18n/messages";

/**
 * Fixed Figma frame — all hero layout is authored in this box, then uniformly scaled to fit
 * the viewport (max scale 1). Awkward sizes (tall/narrow, 1920×700, etc.) match 1920×1255 proportions.
 */
const HERO_DESIGN_W = 1920;
const HERO_DESIGN_H = 1255;

/** Same horizontal inset as nav / About; `--hero-vw` / `--hero-vh` are design px on the canvas. */
const HERO_CONTENT_X = `clamp(1.5rem, calc(var(--hero-vw) * 202 / ${HERO_DESIGN_W}), 202px)`;

/** Vertical offset so the raster top lines up with the language tabs row. */
const HERO_ALIGN_TOP_PX = 140;

/** Horizontal reference for divisions (matches design width). */
const HERO_REF_W = 1920;

/**
 * Lockup reserve + side strip scale (<1 keeps type/nav block compact on real viewports).
 * Background uses `HERO_BG_SCALE` separately so the yellow raster can read larger.
 */
const HERO_ART_SCALE = 0.78;

/** Main PNG frame at reference (1 = full 1717×1109); single aspect box scales with vw + dvh. */
const HERO_BG_SCALE = 1;
const HERO_BG_MAX_W = Math.round(1717 * HERO_BG_SCALE);
const HERO_BG_MAX_H = Math.round(1109 * HERO_BG_SCALE);

/** Desktop hero raster */
const HERO_BG_DESKTOP_SRC = "/images/main-background.png";

/** Compact phones only (≤430px). Wider viewports use desktop hero art + chrome. */
const HERO_BG_MOBILE_SRC = "/images/main_bg_mobil.png";

/** "Create" strip after -90°; Figma max 644.7×23.29 @ 1920 (fluid); scaled vs lockup, then nudged smaller. */
const HERO_CREATE_RELATIVE = 0.9;
const HERO_SIDE_TEXT_LENGTH =
  Math.round(644.7 * HERO_ART_SCALE * HERO_CREATE_RELATIVE * 100) / 100;
const HERO_SIDE_TEXT_THICK =
  Math.round(23.29 * HERO_ART_SCALE * HERO_CREATE_RELATIVE * 100) / 100;

/** Lockup reserve (was 1011×350 at scale 1). */
const HERO_LOCKUP_W = Math.round(1011 * HERO_ART_SCALE);
const HERO_LOCKUP_H = Math.round(350 * HERO_ART_SCALE);

/** Space between lockup band and About / Portfolio / Contact (1920 reference, fluid). */
const HERO_NAV_TOP_GAP = 300;
/** Distance from viewport bottom to footer rule / icons row (Figma ~148px at 1920). */
const HERO_FOOTER_BOTTOM = 148;
const HERO_FOOTER_ICON_GAP = 10.9;

/** Uniform scale so the whole 1920×1255 frame fits in the viewport (never scales up past 1). */
const heroViewportCssVars = {
  "--hero-scale": `min(1, min(100vw / ${HERO_DESIGN_W}px, 100dvh / ${HERO_DESIGN_H}px))`,
} as CSSProperties;

const heroDesignCssVars = {
  "--hero-vw": `${HERO_DESIGN_W}px`,
  "--hero-vh": `${HERO_DESIGN_H}px`,
} as CSSProperties;

export function HomeHero({ home }: { home: Messages["home"] }) {
  return (
    <div
      className="relative isolate flex min-h-dvh w-full items-center justify-center overflow-x-hidden overflow-y-visible bg-white px-0"
      style={heroViewportCssVars}
    >
      {/*
        Mobile raster (≤430px): contain within viewport (no crop); bottom + horizontal
        center keeps signature / type readable; safe-area inset avoids home indicator.
      */}
      <div
        className="pointer-events-none fixed inset-0 z-1 hidden max-[430px]:block min-h-dvh w-full overflow-hidden bg-white pb-[env(safe-area-inset-bottom)]"
        aria-hidden
      >
        <Image
          src={HERO_BG_MOBILE_SRC}
          alt=""
          fill
          sizes="100vw"
          className="object-contain object-bottom"
          priority
        />
      </div>
      <HomeHeroMobileHeader />
      {/*
        Clip box size = scaled design size (transform does not affect layout).
      */}
      <div
        className="relative z-10 max-[430px]:overflow-x-hidden max-[430px]:overflow-y-visible min-[431px]:overflow-hidden"
        style={{
          width: `calc(${HERO_DESIGN_W}px * var(--hero-scale))`,
          height: `calc(${HERO_DESIGN_H}px * var(--hero-scale))`,
        }}
      >
        <div
          className="relative"
          style={{
            width: HERO_DESIGN_W,
            height: HERO_DESIGN_H,
            transform: "scale(var(--hero-scale))",
            transformOrigin: "top left",
            ...heroDesignCssVars,
          }}
        >
          <div
            className="pointer-events-none absolute right-0 bottom-0 z-0 hidden min-[431px]:block bg-contain bg-no-repeat"
            style={{
              left: HERO_CONTENT_X,
              aspectRatio: `${HERO_BG_MAX_W} / ${HERO_BG_MAX_H}`,
              height: "auto",
              maxHeight: `calc(var(--hero-vh) - ${HERO_ALIGN_TOP_PX}px)`,
              backgroundImage: `url('${HERO_BG_DESKTOP_SRC}')`,
              backgroundPosition: "right bottom",
            }}
            aria-hidden
          />
          <div className="relative z-10 flex h-full min-h-0 w-full flex-col max-[430px]:pt-[calc(44px+3rem+env(safe-area-inset-top))] px-[clamp(1.5rem,calc(var(--hero-vw)*202/1920),202px)]">
            <span className="sr-only">{home.heroImageAlt}</span>
            <DotGrid className="pointer-events-none absolute z-20 hidden min-[431px]:block w-[clamp(140px,calc(231.48*var(--hero-vw)/1920),231.48px)] min-[431px]:top-[calc(33*var(--hero-vw)/1920)] min-[431px]:right-[calc(369*var(--hero-vw)/1920)] min-[431px]:left-auto" />
            <div
              className="hidden min-[431px]:flex min-[431px]:items-start min-[431px]:justify-end"
              style={{ paddingTop: HERO_ALIGN_TOP_PX }}
            >
              <LanguageSwitch />
            </div>

            <div
              className="pointer-events-none absolute top-0 bottom-0 left-0 z-30 hidden min-[431px]:flex min-[431px]:overflow-visible min-[431px]:right-[clamp(1.5rem,calc(var(--hero-vw)*202/1920),202px)] min-[431px]:items-center min-[431px]:justify-end min-[431px]:pt-0"
              aria-hidden
            >
              <div
                className="shrink-0 overflow-visible"
                style={{
                  transform: `translateY(calc(-0.5 * min(${HERO_SIDE_TEXT_LENGTH}px, calc(var(--hero-vw) * ${HERO_SIDE_TEXT_LENGTH} / ${HERO_REF_W}))))`,
                }}
              >
                <div
                  className="block overflow-visible"
                  style={{
                    transform: `translateX(calc(-1 * min(${HERO_SIDE_TEXT_THICK}px, calc(var(--hero-vw) * ${HERO_SIDE_TEXT_THICK} / ${HERO_REF_W}))))`,
                  }}
                >
                  <div className="origin-top-right -rotate-90">
                    <Image
                      src="/icons/create.svg"
                      alt=""
                      width={449}
                      height={17}
                      className="block h-auto brightness-0"
                      style={{
                        width: `min(${HERO_SIDE_TEXT_LENGTH}px, calc(var(--hero-vw) * ${HERO_SIDE_TEXT_LENGTH} / ${HERO_REF_W}))`,
                      }}
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
            <span className="sr-only">{home.sideTextAlt}</span>

            <div className="grid flex-1 gap-10 pt-10 max-[430px]:pt-5 lg:items-center lg:pt-0">
              <div className="relative flex min-h-0 flex-col items-start justify-center text-left max-[430px]:min-h-[36vh] lg:min-h-[753px]">
                <div
                  className="w-full shrink-0"
                  aria-hidden
                  style={{
                    maxWidth: `min(${HERO_LOCKUP_W}px, calc(var(--hero-vw) * ${HERO_LOCKUP_W} / ${HERO_REF_W}))`,
                    aspectRatio: `${HERO_LOCKUP_W} / ${HERO_LOCKUP_H}`,
                  }}
                />
                <div
                  className="max-[430px]:hidden"
                  style={{
                    marginTop: `max(2rem, calc(var(--hero-vw) * ${HERO_NAV_TOP_GAP} / ${HERO_REF_W}))`,
                  }}
                >
                  <SiteNav layout="row" className="flex w-full justify-start" />
                </div>
              </div>
            </div>

            <div
              className="mt-auto hidden min-[431px]:flex w-full items-end gap-3 pt-16 lg:pt-10"
              style={{
                paddingBottom: `max(1rem, calc(var(--hero-vw) * ${HERO_FOOTER_BOTTOM} / ${HERO_REF_W}))`,
              }}
            >
              <div
                className="h-px min-h-px min-w-0 flex-1 bg-[#231F20]"
                aria-hidden
              />
              <SocialLinks
                className={`shrink-0 [&_ul]:gap-[clamp(12px,calc(var(--hero-vw)*${HERO_FOOTER_ICON_GAP}/${HERO_REF_W}),${HERO_FOOTER_ICON_GAP}px)] [&_a]:size-[clamp(2rem,calc(var(--hero-vw)*40/${HERO_REF_W}),2.5rem)] [&_img]:size-full!`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
