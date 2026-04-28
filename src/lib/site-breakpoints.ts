/**
 * Home hero + burger chrome: “compact” layout up to this width (inclusive).
 * Set above common large-phone widths (e.g. 430) so rounding/scrollbar doesn’t flip to wide.
 */
export const HOME_COMPACT_MAX_PX = 480;

/** First width that uses the wide-home layer (desktop raster, inline lang, row nav, etc.). */
export const HOME_WIDE_MIN_PX = HOME_COMPACT_MAX_PX + 1;

/**
 * Fixed LV/ENG chrome shows at this width and below (Tailwind `lg` breakpoint − 1).
 * Must stay in sync with about-header layout: below `lg` the in-flow header has no lang slot.
 */
export const MOBILE_FIXED_CHROME_MAX_PX = 1023;

/** Pixels below `env(safe-area-inset-top)` for portaled mobile LV/ENG (matches design). */
export const MOBILE_HEADER_LANG_OFFSET_PX = 68;

/**
 * Mobile language row: one inset for home (≤480) and about-style headers (fixed overlay).
 * Single value avoids a visible jump when navigating home ↔ subpages.
 * (Literal `68` so Tailwind can scan the class; keep in sync with `MOBILE_HEADER_LANG_OFFSET_PX`.)
 */
export const MOBILE_HEADER_LANG_TOP_CLASS =
  "top-[calc(68px+env(safe-area-inset-top,0px))]";
