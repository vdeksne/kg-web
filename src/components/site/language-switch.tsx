"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  GoldStrike,
  LANG_GOLD_STRIKE_EXTEND_EM,
  LANG_GOLD_STRIKE_NUDGE_EM,
} from "@/components/site/gold-strike";
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

  return (
    <div
      className={cn(
        "flex items-center font-normal text-muted-foreground uppercase tabular-nums",
        variant === "homeMobile"
          ? ["tracking-[0.18em]", fluidHomeMobileLang]
          : variant === "aboutDesktop"
            ? [
                "tracking-[0.21em]",
                fluidAboutDesktopLangGap,
                fluidAboutDesktopLang,
              ]
            : ["tracking-[0.21em]", fluidLangGap, fluidPrimaryText],
        className,
      )}
    >
      <Link
        href={replaceLocaleInPath(pathname, "lv")}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <GoldStrike
          active={active === "lv"}
          trackingTrimEm={variant === "homeMobile" ? 0.18 : 0.21}
          strikeExtendEm={LANG_GOLD_STRIKE_EXTEND_EM}
          strikeCenterNudgeEm={LANG_GOLD_STRIKE_NUDGE_EM}
          strikeThickness="fluid"
        >
          <span>LV</span>
        </GoldStrike>
      </Link>
      <span className="text-muted-foreground/50 select-none" aria-hidden>
        |
      </span>
      <Link
        href={replaceLocaleInPath(pathname, "en")}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <GoldStrike
          active={active === "en"}
          trackingTrimEm={variant === "homeMobile" ? 0.18 : 0.21}
          strikeExtendEm={LANG_GOLD_STRIKE_EXTEND_EM}
          strikeCenterNudgeEm={LANG_GOLD_STRIKE_NUDGE_EM}
          strikeThickness="fluid"
        >
          <span>ENG</span>
        </GoldStrike>
      </Link>
    </div>
  );
}
