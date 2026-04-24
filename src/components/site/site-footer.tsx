"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { SocialLinks } from "@/components/site/social-links";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { withLocale } from "@/lib/i18n-path";

export function SiteFooter() {
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
  const t = messages[locale];
  const nav = t.nav;

  const LINKS = [
    { href: withLocale("/about", locale), label: nav.about },
    { href: withLocale("/portfolio", locale), label: nav.portfolio },
    { href: withLocale("/contact", locale), label: nav.contact },
  ] as const;

  return (
    <footer className="from-muted/40 relative mt-24 bg-gradient-to-b to-transparent pt-16 pb-12">
      <div className="bg-muted/30 absolute inset-x-0 top-0 h-32 -skew-y-2" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-6 sm:px-10">
        <p className="text-center text-sm font-bold tracking-[0.35em] uppercase">
          Kaspars Groza
        </p>
        <div className="text-muted-foreground flex w-full flex-wrap items-center justify-center gap-6 text-xs tracking-[0.2em] uppercase">
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-foreground transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <SocialLinks />
          <div className="flex flex-col gap-1 text-[0.65rem] tracking-normal normal-case sm:text-left">
            <a
              href="mailto:info@kasparsgroza.lv"
              className="hover:text-foreground transition-colors"
            >
              info@kasparsgroza.lv
            </a>
            <a href="tel:+37120370077" className="hover:text-foreground transition-colors">
              +371 20370077
            </a>
          </div>
          <span className="text-muted-foreground/70 font-serif text-lg tracking-tight italic">
            {t.footer.tagline}
          </span>
        </div>
      </div>
    </footer>
  );
}
