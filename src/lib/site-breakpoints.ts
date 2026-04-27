/**
 * Home hero + burger chrome: “compact” layout up to this width (inclusive).
 * Set above common large-phone widths (e.g. 430) so rounding/scrollbar doesn’t flip to wide.
 */
export const HOME_COMPACT_MAX_PX = 480;

/** First width that uses the wide-home layer (desktop raster, inline lang, row nav, etc.). */
export const HOME_WIDE_MIN_PX = HOME_COMPACT_MAX_PX + 1;
