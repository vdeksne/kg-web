"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NavPortfolioItem } from "@/components/site/NavPortfolioItem";
import { SocialLinks } from "@/components/site/SocialLinks";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

const LOGO_BOTTOM = "/images/logo-bottom.png";

/** Footer wordmark (<1267px): at this viewport CSS width, rendered box is exactly {W,H} px below. Scales × (100vw / ref). */
const FOOTER_MOBILE_LOGO_VW_REF = 360;
const FOOTER_MOBILE_LOGO_CSS_W_AT_REF_PX = 156;
/** Keep ~107.64/9.225 proportions (wordmark geometry). */
const FOOTER_MOBILE_LOGO_CSS_H_AT_REF_PX =
  FOOTER_MOBILE_LOGO_CSS_W_AT_REF_PX * (9.225 / 107.64);

const FOOTER_MOBILE_LOGO_IMG_STYLE = {
  width: `min(100%, calc(${FOOTER_MOBILE_LOGO_CSS_W_AT_REF_PX}px * 100vw / ${FOOTER_MOBILE_LOGO_VW_REF}))`,
  height: `calc(${FOOTER_MOBILE_LOGO_CSS_H_AT_REF_PX}px * 100vw / ${FOOTER_MOBILE_LOGO_VW_REF})`,
} as const;

/** Nemiz SVG in stacked footer (<1267px): px @360 ref; scaled from 24.015×9.844 (slightly below 3×). */
const FOOTER_MOBILE_NEMIZ_W_AT_REF_PX = 64.84;
const FOOTER_MOBILE_NEMIZ_H_AT_REF_PX =
  FOOTER_MOBILE_NEMIZ_W_AT_REF_PX * (9.844 / 24.015);

const FOOTER_MOBILE_NEMIZ_IMG_STYLE = {
  width: `min(100%, calc(${FOOTER_MOBILE_NEMIZ_W_AT_REF_PX}px * 100vw / ${FOOTER_MOBILE_LOGO_VW_REF}))`,
  height: `calc(${FOOTER_MOBILE_NEMIZ_H_AT_REF_PX}px * 100vw / ${FOOTER_MOBILE_LOGO_VW_REF})`,
} as const;

/** Space before Nemiz: always ≥12px, targets ~17px @360vw ref, caps 18px (avoids collapsing `1fr`). */
const FOOTER_MOBILE_PAD_CONTACT_PAIR_TO_NEMIZ = `clamp(12px, max(13px, calc(17.04px * 100vw / ${FOOTER_MOBILE_LOGO_VW_REF})), 18px)`;

const FOOTER_BG = "/images/footer-bg.png";

const NEMIZ_SRC = "/icons/nemiz.svg";
const NEMIZ_W = 173;
const NEMIZ_H = 98;
const NEMIZ_DISPLAY_W = 86.45;
const NEMIZ_DISPLAY_H = 48.52;

/** Menu + contact: Gotham light caps; scales from 8px @ 360px width — lh 300%; logo / icons unchanged. */
const FOOTER_LINK_TEXT_CLASS =
  "font-sans font-light not-italic uppercase leading-[3] tracking-[0.031px] text-black text-[length:clamp(11px,calc(8*100vw/360),16px)]";

const GAP_EMAIL_TO_PHONE = 27.19;
const GAP_SIDE_TO_ICONS = 35.98;
const GAP_PHONE_TO_NEMIZ = 28;

export function SiteFooter() {
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
  const t = messages[locale];
  const nav = t.nav;

  const aboutHref = withLocale("/about", locale);
  const contactHref = withLocale("/contact", locale);

  return (
    <footer className="relative mt-24 w-full">
      {/* Background: inset inside padded column + object-contain (no crop). */}
      <div
        className={cn(
          "relative isolate mx-auto flex w-full max-w-[min(100%,1515.211px)] flex-col pt-16",
          /* Mobile stack: narrower gutters @360 (“info” row + Nemiz); wide row keeps airy padding */
          "max-[1266px]:px-3 sm:max-[1266px]:px-5 min-[1267px]:px-10",
          "min-[1267px]:min-h-[250px]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute top-3 right-3 left-3 bottom-0 z-0 overflow-hidden",
            "sm:top-4 sm:right-4 sm:left-4",
            "min-[1267px]:top-5 min-[1267px]:right-5 min-[1267px]:left-5",
          )}
          aria-hidden
        >
          <div className="relative size-full">
            <Image
              src={FOOTER_BG}
              alt=""
              fill
              className="object-contain object-bottom-left"
              sizes="(max-width: 639px) calc(100vw - 24px), (max-width: 1266px) calc(100vw - 40px), (max-width: 1515px) calc(100vw - 2.5rem), 1455px"
            />
          </div>
        </div>
        <div className="relative z-10 flex w-full flex-col items-center min-[1267px]:mt-auto">
          <Link
            href={withLocale("/", locale)}
            className={cn(
              "flex w-full shrink-0 justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            {/* Mobile (<1267px): `FOOTER_MOBILE_LOGO_CSS_*` set rendered box @ 360px viewport (below) */}
            {/* eslint-disable-next-line @next/next/no-img-element -- exact CSS box; avoids Next `fill` in ~9px-tall layouts */}
            <img
              src={LOGO_BOTTOM}
              alt="Kaspars Groza"
              className={cn(
                "mx-auto hidden max-w-full shrink-0 select-none object-contain",
                "max-[1266px]:block",
              )}
              draggable={false}
              loading="lazy"
              decoding="async"
              width={Math.round(FOOTER_MOBILE_LOGO_CSS_W_AT_REF_PX)}
              height={Math.round(FOOTER_MOBILE_LOGO_CSS_H_AT_REF_PX)}
              style={{ ...FOOTER_MOBILE_LOGO_IMG_STYLE }}
            />
            <div
              className={cn(
                "relative mx-auto hidden max-w-full shrink-0 overflow-visible",
                "min-[1267px]:block",
              )}
              style={{ width: "min(100%, 263.063px)" }}
            >
              <Image
                src={LOGO_BOTTOM}
                alt="Kaspars Groza"
                width={527}
                height={46}
                sizes="263px"
                className="block h-auto w-full max-w-full object-contain"
              />
            </div>
          </Link>
          <div
            className={cn(
              "w-full max-[1266px]:mt-3 min-[1267px]:mt-[29.7px]",
              "max-[1266px]:pb-6 min-[1267px]:pb-10",
            )}
          >
            {/* Mobile (<1267px): logo stays above this block; order = socials → menu → contact → Nemiz */}
            <div className="flex flex-col items-center gap-0 min-[1267px]:hidden">
              <SocialLinks
                compact
                className="mb-[14.6px] flex w-full justify-center"
              />
              <nav className="mb-[8px] w-full shrink-0 [&_a]:leading-none!">
                <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-1">
                  <li>
                    <Link
                      href={aboutHref}
                      className={cn(
                        "inline-flex shrink-0 whitespace-nowrap",
                        FOOTER_LINK_TEXT_CLASS,
                      )}
                    >
                      {nav.about}
                    </Link>
                  </li>
                  <NavPortfolioItem
                    locale={locale}
                    layout="row"
                    dropdown={false}
                    showActiveState={false}
                    standaloneLinkClassName={FOOTER_LINK_TEXT_CLASS}
                  />
                  <li>
                    <Link
                      href={contactHref}
                      className={cn(
                        "inline-flex shrink-0 whitespace-nowrap",
                        FOOTER_LINK_TEXT_CLASS,
                      )}
                    >
                      {nav.contact}
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* Duo centered as a pair; Nemiz isolated on the trailing rail (still one visual row) */}
              <div
                className={cn(
                  "w-full max-w-full overflow-x-auto px-1 [scrollbar-width:none] md:overflow-x-visible [&::-webkit-scrollbar]:hidden",
                  "max-[1266px]:mt-[-10px]",
                )}
              >
                <div className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(min(88px,22vw),1fr)] items-center">
                  <div aria-hidden className="min-h-0 min-w-0" />
                  <div className="flex shrink-0 flex-nowrap items-center gap-x-[0.7rem]">
                    <a
                      href="mailto:info@kasparsgroza.lv"
                      className={cn(
                        "shrink-0 whitespace-nowrap",
                        FOOTER_LINK_TEXT_CLASS,
                      )}
                    >
                      info@kasparsgroza.lv
                    </a>
                    <a
                      href="tel:+37120370077"
                      className={cn(
                        "shrink-0 whitespace-nowrap",
                        FOOTER_LINK_TEXT_CLASS,
                      )}
                    >
                      +371 20370077
                    </a>
                  </div>
                  <div
                    className="flex min-h-0 min-w-0 items-center justify-end"
                    style={{
                      paddingInlineStart: FOOTER_MOBILE_PAD_CONTACT_PAIR_TO_NEMIZ,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- fluid box */}
                    <img
                      src={NEMIZ_SRC}
                      alt={t.footer.tagline}
                      width={65}
                      height={27}
                      className="block shrink-0 object-contain"
                      style={{ ...FOOTER_MOBILE_NEMIZ_IMG_STYLE }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Wide (≥1267px): icons fixed to true horizontal center; sides anchor inward */}
            <div className="hidden min-h-[40px] w-full items-center min-[1267px]:flex">
              <div
                className="flex min-h-0 min-w-0 flex-1 justify-end"
                style={{ paddingInlineEnd: GAP_SIDE_TO_ICONS }}
              >
                <nav className="shrink-0">
                  <ul className="flex flex-nowrap gap-x-[3.87rem]">
                    <li>
                      <Link
                        href={aboutHref}
                        className={cn(
                          "shrink-0 whitespace-nowrap",
                          FOOTER_LINK_TEXT_CLASS,
                        )}
                      >
                        {nav.about}
                      </Link>
                    </li>
                    <NavPortfolioItem
                      locale={locale}
                      layout="row"
                      dropdown={false}
                      showActiveState={false}
                      standaloneLinkClassName={FOOTER_LINK_TEXT_CLASS}
                    />
                    <li>
                      <Link
                        href={contactHref}
                        className={cn(
                          "shrink-0 whitespace-nowrap",
                          FOOTER_LINK_TEXT_CLASS,
                        )}
                      >
                        {nav.contact}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="shrink-0">
                <SocialLinks className="[&_ul]:gap-[20.09px]!" />
              </div>
              <div
                className="flex min-h-0 min-w-0 flex-1 flex-nowrap items-center"
                style={{ paddingInlineStart: GAP_SIDE_TO_ICONS }}
              >
                <a
                  href="mailto:info@kasparsgroza.lv"
                  className={cn(
                    "shrink-0 whitespace-nowrap",
                    FOOTER_LINK_TEXT_CLASS,
                  )}
                >
                  info@kasparsgroza.lv
                </a>
                <a
                  href="tel:+37120370077"
                  className={cn(
                    "shrink-0 whitespace-nowrap",
                    FOOTER_LINK_TEXT_CLASS,
                  )}
                  style={{ marginInlineStart: GAP_EMAIL_TO_PHONE }}
                >
                  +371 20370077
                </a>
                <Image
                  src={NEMIZ_SRC}
                  alt={t.footer.tagline}
                  width={NEMIZ_W}
                  height={NEMIZ_H}
                  className="h-auto shrink-0 object-contain"
                  style={{
                    marginInlineStart: GAP_PHONE_TO_NEMIZ,
                    width: `min(100%, ${NEMIZ_DISPLAY_W}px)`,
                    aspectRatio: `${NEMIZ_DISPLAY_W} / ${NEMIZ_DISPLAY_H}`,
                  }}
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
