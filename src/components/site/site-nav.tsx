"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { GoldStrike } from "@/components/site/gold-strike";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { withLocale } from "@/lib/i18n-path";

export function SiteNav({
  className,
  layout = "row",
}: {
  className?: string;
  layout?: "row" | "col";
}) {
  const pathname = usePathname();
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
  const t = messages[locale].nav;

  const LINKS = [
    { href: withLocale("/about", locale), label: t.about },
    { href: withLocale("/portfolio", locale), label: t.portfolio },
    { href: withLocale("/contact", locale), label: t.contact },
  ] as const;

  return (
    <nav className={className}>
      <ul
        className={
          layout === "row"
            ? "flex flex-wrap items-center gap-8 text-[16px] font-medium tracking-[0.25em] uppercase"
            : "flex flex-col gap-4 text-[16px] font-medium tracking-[0.15em] uppercase"
        }
      >
        {LINKS.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <GoldStrike active={active}>
                  <span>{label}</span>
                </GoldStrike>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
