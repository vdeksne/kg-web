/**
 * Home hero + burger chrome: “compact” layout up to this width (inclusive).
 * Set above common large-phone widths (e.g. 430) so rounding/scrollbar doesn’t flip to wide.
 */
export const HOME_COMPACT_MAX_PX = 480;

/** First width that uses the wide-home layer (desktop raster, inline lang, row nav, etc.). */
export const HOME_WIDE_MIN_PX = HOME_COMPACT_MAX_PX + 1;

/**
 * Mobile language row: one inset for home (≤480) and about-style headers (≤700 overlay).
 * Single value avoids a visible jump when navigating home ↔ subpages.
 */
export const MOBILE_HEADER_LANG_TOP_CLASS =
  "top-[calc(68px+env(safe-area-inset-top))]";
