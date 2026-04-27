import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Horizontal overshoot (px each side) for About / Darbi / Contact strikes. */
export const MAIN_NAV_GOLD_STRIKE_EXTEND_PX = 5;

export function GoldStrike({
  children,
  active,
  className,
  /**
   * Match the parent `letter-spacing` value in `em` (e.g. `0.18` for `tracking-[0.18em]`).
   * Letter-spacing adds a full gap after the last glyph; trimming that width centers the strike on the text.
   */
  trackingTrimEm,
  /** Lengthen the strike by this many pixels past each end of the label (main nav). */
  strikeExtendPx,
  /** Push strike downward (px). Positive = lower on screen; use for optical center on small type. */
  strikeCenterNudgePx,
}: {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  trackingTrimEm?: number;
  strikeExtendPx?: number;
  strikeCenterNudgePx?: number;
}) {
  const trim =
    typeof trackingTrimEm === "number" && trackingTrimEm > 0
      ? trackingTrimEm
      : null;
  const extend =
    typeof strikeExtendPx === "number" && strikeExtendPx > 0
      ? strikeExtendPx
      : 0;

  const strikeStyle: CSSProperties = {};
  /** `letter-spacing` adds space after the last glyph only — span’s midpoint is trim/2 right of the ink midpoint. */
  const halfTrimEm = trim != null ? trim / 2 : 0;
  const fullBleedStrike = Boolean(active && trim == null && extend === 0);

  if (active) {
    const nudge =
      typeof strikeCenterNudgePx === "number" ? strikeCenterNudgePx : 0;
    strikeStyle.top = `calc(0.5lh + ${nudge}px)`;

    if (fullBleedStrike) {
      /* width from left-0 right-0 */
    } else if (trim != null && extend > 0) {
      strikeStyle.left = `calc(50% - ${halfTrimEm}em)`;
      strikeStyle.width = `calc(100% - ${trim}em + ${extend * 2}px)`;
      strikeStyle.transform = "translate(-50%, -50%)";
    } else if (trim != null) {
      strikeStyle.left = `calc(50% - ${halfTrimEm}em)`;
      strikeStyle.width = `calc(100% - ${trim}em)`;
      strikeStyle.transform = "translate(-50%, -50%)";
    } else {
      strikeStyle.left = "50%";
      strikeStyle.width = `calc(100% + ${extend * 2}px)`;
      strikeStyle.transform = "translate(-50%, -50%)";
    }
  }

  return (
    <span
      className={cn(
        "relative inline-block leading-none",
        /* Tight line box so the strike sits on the cap midline, not below it */
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {active ? (
        <span
          className={cn(
            "pointer-events-none absolute z-0 h-[2.4px] bg-[var(--kg-accent)]",
            fullBleedStrike && "left-0 right-0 -translate-y-1/2",
          )}
          style={strikeStyle}
          aria-hidden
        />
      ) : null}
    </span>
  );
}
