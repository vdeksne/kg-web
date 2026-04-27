import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** ~5px each side at 16px cap — scales with primary nav `font-size`. */
export const MAIN_NAV_GOLD_STRIKE_EXTEND_EM = 5 / 16;

export function GoldStrike({
  children,
  active,
  className,
  /**
   * Match the parent `letter-spacing` value in `em` (e.g. `0.18` for `tracking-[0.18em]`).
   * Letter-spacing adds a full gap after the last glyph; trimming that width centers the strike on the text.
   */
  trackingTrimEm,
  /** Lengthen the strike past each end of the label in px (main nav). */
  strikeExtendPx,
  /** Lengthen the strike past each end in `em` (language tabs — tracks fluid type). */
  strikeExtendEm,
  /** Push strike downward (px). */
  strikeCenterNudgePx,
  /** Push strike downward in `em` (preferred for language tabs). */
  strikeCenterNudgeEm,
  /**
   * `fluid`: bar height `clamp(2px, 0.15em, 3px)` — scales with label font-size.
   * `fixed`: 2.4px (main nav).
   */
  strikeThickness = "fixed",
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  trackingTrimEm?: number;
  strikeExtendPx?: number;
  strikeExtendEm?: number;
  strikeCenterNudgePx?: number;
  strikeCenterNudgeEm?: number;
  strikeThickness?: "fixed" | "fluid";
}) {
  const trim =
    typeof trackingTrimEm === "number" && trackingTrimEm > 0
      ? trackingTrimEm
      : null;
  const extendPx =
    typeof strikeExtendPx === "number" && strikeExtendPx > 0
      ? strikeExtendPx
      : 0;
  const extendEm =
    typeof strikeExtendEm === "number" && strikeExtendEm > 0
      ? strikeExtendEm
      : 0;
  const hasExtend = extendPx > 0 || extendEm > 0;

  const strikeStyle: CSSProperties = {};
  /** `letter-spacing` adds space after the last glyph only — span’s midpoint is trim/2 right of the ink midpoint. */
  const halfTrimEm = trim != null ? trim / 2 : 0;
  const fullBleedStrike = Boolean(active && trim == null && !hasExtend);

  const extendWidthSuffix =
    extendEm > 0
      ? `${2 * extendEm}em`
      : `${2 * extendPx}px`;

  if (active) {
    const nudgeEm =
      typeof strikeCenterNudgeEm === "number" ? strikeCenterNudgeEm : 0;
    const nudgePx =
      typeof strikeCenterNudgePx === "number" ? strikeCenterNudgePx : 0;
    /* 50% of the relative wrapper (label box), not 0.5lh on the empty strike — lh is inconsistent for AP spans. */
    strikeStyle.top =
      nudgeEm > 0
        ? `calc(50% + ${nudgeEm}em)`
        : `calc(50% + ${nudgePx}px)`;

    if (strikeThickness === "fluid") {
      strikeStyle.height = "clamp(2px, 0.15em, 3px)";
    }

    if (fullBleedStrike) {
      /* width from left-0 right-0 */
    } else if (trim != null && hasExtend) {
      strikeStyle.left = `calc(50% - ${halfTrimEm}em)`;
      strikeStyle.width = `calc(100% - ${trim}em + ${extendWidthSuffix})`;
      strikeStyle.transform = "translate(-50%, -50%)";
    } else if (trim != null) {
      strikeStyle.left = `calc(50% - ${halfTrimEm}em)`;
      strikeStyle.width = `calc(100% - ${trim}em)`;
      strikeStyle.transform = "translate(-50%, -50%)";
    } else {
      strikeStyle.left = "50%";
      strikeStyle.width = `calc(100% + ${extendWidthSuffix})`;
      strikeStyle.transform = "translate(-50%, -50%)";
    }
  }

  return (
    <span
      className={cn(
        "relative inline-block leading-none",
        /* Tight line box; strike uses top:50% of this box (not lh on the empty strike). */
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {active ? (
        <span
          className={cn(
            "pointer-events-none absolute z-0 bg-[var(--kg-accent)]",
            strikeThickness === "fixed" && "h-[2.4px]",
            fullBleedStrike && "left-0 right-0 -translate-y-1/2",
          )}
          style={strikeStyle}
          aria-hidden
        />
      ) : null}
    </span>
  );
}
