"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LanguageEngIcon, LanguageLvIcon } from "@/components/site/language-icons";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import {
  fluidAboutDesktopLang,
  fluidAboutDesktopLangGap,
  fluidHomeMobileLang,
  fluidLangGap,
  fluidPrimaryText,
} from "@/lib/fluid-type";
import { replaceLocaleInPath } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

export function LanguageSwitch({
  className,
  variant = "default",
}: {
  className?: string;
  /** `homeMobile`: subpage ≤700px / home compact chrome. `aboutDesktop`: subpage ≥701px banner. */
  variant?: "default" | "homeMobile" | "aboutDesktop";
}) {
  const pathname = usePathname();
  const params = useParams();
  const raw = params?.locale;
  const active: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;

  const rowClass =
    variant === "homeMobile"
      ? fluidHomeMobileLang
      : variant === "aboutDesktop"
        ? cn(fluidAboutDesktopLangGap, fluidAboutDesktopLang)
        : cn(fluidLangGap, fluidPrimaryText);

  return (
    <div
      className={cn(
        "flex items-center font-normal leading-none",
        rowClass,
        className,
      )}
    >
      <Link
        href={replaceLocaleInPath(pathname, "lv")}
        aria-label="Latviešu"
        aria-current={active === "lv" ? "true" : undefined}
        className={cn(
          "inline-flex items-center leading-none transition-colors",
          active === "lv"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <LanguageLvIcon selected={active === "lv"} />
      </Link>
      <Link
        href={replaceLocaleInPath(pathname, "en")}
        aria-label="English"
        aria-current={active === "en" ? "true" : undefined}
        className={cn(
          "inline-flex items-center leading-none transition-colors",
          active === "en"
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <LanguageEngIcon selected={active === "en"} />
      </Link>
    </div>
  );
}
