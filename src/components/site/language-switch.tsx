"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { GoldStrike } from "@/components/site/gold-strike";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { replaceLocaleInPath } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

export function LanguageSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const params = useParams();
  const raw = params?.locale;
  const active: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;

  return (
    <div
      className={cn(
        "flex items-center gap-[0.72rem] text-base font-medium tracking-[0.2em] text-zinc-900 uppercase tabular-nums sm:text-[16px] sm:tracking-[0.22em]",
        className,
      )}
    >
      <Link
        href={replaceLocaleInPath(pathname, "lv")}
        className="text-zinc-900 transition-opacity hover:opacity-75"
      >
        <GoldStrike active={active === "lv"}>
          <span>LV</span>
        </GoldStrike>
      </Link>
      <span className="text-zinc-400 select-none" aria-hidden>
        |
      </span>
      <Link
        href={replaceLocaleInPath(pathname, "en")}
        className="text-zinc-900 transition-opacity hover:opacity-75"
      >
        <GoldStrike active={active === "en"}>
          <span>ENG</span>
        </GoldStrike>
      </Link>
    </div>
  );
}
