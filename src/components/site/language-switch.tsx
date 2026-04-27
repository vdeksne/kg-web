"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { GoldStrike } from "@/components/site/gold-strike";
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

const HOME_MOBILE_LANG_STRIKE_NUDGE_PX = 1;
/** Gold strike extends past LV / ENG by this many px on each side */
const LANG_STRIKE_EXTEND_EACH_SIDE_PX = 1.5;

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
          strikeExtendPx={LANG_STRIKE_EXTEND_EACH_SIDE_PX}
          strikeCenterNudgePx={
            variant === "homeMobile" ? HOME_MOBILE_LANG_STRIKE_NUDGE_PX : undefined
          }
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
          strikeExtendPx={LANG_STRIKE_EXTEND_EACH_SIDE_PX}
          strikeCenterNudgePx={
            variant === "homeMobile" ? HOME_MOBILE_LANG_STRIKE_NUDGE_PX : undefined
          }
        >
          <span>ENG</span>
        </GoldStrike>
      </Link>
    </div>
  );
}
