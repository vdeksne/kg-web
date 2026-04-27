/**
 * Home hero + burger chrome: “compact” layout up to this width (inclusive).
 * Set above common large-phone widths (e.g. 430) so rounding/scrollbar doesn’t flip to wide.
 */
export const HOME_COMPACT_MAX_PX = 480;

/** First width that uses the wide-home layer (desktop raster, inline lang, row nav, etc.). */
export const HOME_WIDE_MIN_PX = HOME_COMPACT_MAX_PX + 1;

/**
 * Mobile language inset from viewport top (+ safe area). Subpage banner = base; home main chrome +4px.
 */
export const MOBILE_SUBPAGE_LANG_TOP_CLASS =
  "top-[calc(66px+env(safe-area-inset-top))]";

export const MOBILE_HOME_LANG_TOP_CLASS =
  "top-[calc(70px+env(safe-area-inset-top))]";
