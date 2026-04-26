"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { NavPortfolioItem } from "@/components/site/nav-portfolio-item";
import { SocialLinks } from "@/components/site/social-links";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { withLocale } from "@/lib/i18n-path";

const LOGO_BOTTOM = "/images/logo-bottom.png";
const LOGO_BOTTOM_INTRINSIC_W = 527;
const LOGO_BOTTOM_INTRINSIC_H = 46;
/** Figma display size */
const FOOTER_LOGO_W = 263.063;
const FOOTER_LOGO_H = 22.6;

const FOOTER_BG = "/images/footer-bg.png";

const NEMIZ_SRC = "/icons/nemiz.svg";
const NEMIZ_W = 173;
const NEMIZ_H = 98;
const NEMIZ_DISPLAY_W = 86.45;
const NEMIZ_DISPLAY_H = 48.52;

const FOOTER_ROW_FROM_BOTTOM = 60;
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
    <footer className="relative mt-24 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
      >
        <Image
          src={FOOTER_BG}
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>
      <div
        className="relative z-10 mx-auto flex w-full max-w-[min(100%,1515.211px)] flex-col px-6 pt-16 sm:px-10 md:min-h-[250px]"
      >
        <div className="flex w-full flex-col items-center md:mt-auto">
          <Link
            href={withLocale("/", locale)}
            className="shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image
              src={LOGO_BOTTOM}
              alt="Kaspars Groza"
              width={LOGO_BOTTOM_INTRINSIC_W}
              height={LOGO_BOTTOM_INTRINSIC_H}
              className="mx-auto max-w-full object-contain"
              style={{
                width: `min(100%, ${FOOTER_LOGO_W}px)`,
                aspectRatio: `${FOOTER_LOGO_W} / ${FOOTER_LOGO_H}`,
                height: "auto",
              }}
            />
          </Link>
          <div
            className="text-muted-foreground mt-[29.7px] w-full text-xs tracking-[0.2em] uppercase"
            style={{ paddingBottom: FOOTER_ROW_FROM_BOTTOM }}
          >
          {/* Mobile: stacked */}
          <div className="flex flex-col items-center gap-6 md:hidden">
            <nav className="w-full">
              <ul className="flex flex-wrap justify-center gap-6">
                <li>
                  <Link
                    href={aboutHref}
                    className="hover:text-foreground transition-colors"
                  >
                    {nav.about}
                  </Link>
                </li>
                <NavPortfolioItem locale={locale} layout="row" />
                <li>
                  <Link
                    href={contactHref}
                    className="hover:text-foreground transition-colors"
                  >
                    {nav.contact}
                  </Link>
                </li>
              </ul>
            </nav>
            <SocialLinks className="[&_ul]:gap-[20.09px]!" />
            <div className="flex flex-wrap items-center justify-center gap-y-2">
              <a
                href="mailto:info@kasparsgroza.lv"
                className="shrink-0 whitespace-nowrap hover:text-foreground transition-colors"
              >
                info@kasparsgroza.lv
              </a>
              <a
                href="tel:+37120370077"
                className="shrink-0 whitespace-nowrap hover:text-foreground transition-colors"
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

          {/* md+: icons fixed to true horizontal center; sides anchor inward */}
          <div className="hidden min-h-[40px] w-full items-center md:flex">
            <div
              className="flex min-h-0 min-w-0 flex-1 justify-end"
              style={{ paddingInlineEnd: GAP_SIDE_TO_ICONS }}
            >
              <nav className="shrink-0">
                <ul className="flex flex-nowrap [&>li:nth-child(2)]:ms-[49.87px] [&>li:nth-child(3)]:ms-[49.97px]">
                  <li>
                    <Link
                      href={aboutHref}
                      className="hover:text-foreground transition-colors"
                    >
                      {nav.about}
                    </Link>
                  </li>
                  <NavPortfolioItem locale={locale} layout="row" />
                  <li>
                    <Link
                      href={contactHref}
                      className="hover:text-foreground transition-colors"
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
                className="shrink-0 whitespace-nowrap hover:text-foreground transition-colors"
              >
                info@kasparsgroza.lv
              </a>
              <a
                href="tel:+37120370077"
                className="shrink-0 whitespace-nowrap hover:text-foreground transition-colors"
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
