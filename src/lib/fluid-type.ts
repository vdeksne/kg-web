/**
 * Viewport-relative typography (320px → 1920px width).
 * Avoid `calc(100vw * n / 1920)` inside clamp() for body text: on mobile that value
 * sits below the clamp minimum, so size never changes until very large widths.
 */

/** Main nav, language tabs: 13.5px → 16px (higher floor on small viewports; cap unchanged). */
export const fluidPrimaryText =
  "text-[clamp(13.5px,calc(13.5px+(100vw-320px)*0.0015625),16px)]";

/** About / Darbi / Contact row gap: 16px → 32px */
export const fluidPrimaryNavGap =
  "gap-[clamp(16px,calc(16px+(100vw-320px)*0.01),32px)]";

/** LV | ENG spacing: ~7px → ~11.5px */
export const fluidLangGap =
  "gap-[clamp(7px,calc(7px+(100vw-320px)*0.002825),11.52px)]";

/** About-header desktop (≥701): lang size tracks 1920 artboard, 12px–16px */
export const fluidAboutDesktopLang =
  "text-[clamp(12px,calc(12px+(100vw-701px)*4/1219),16px)]";

/** About-header desktop: tighter LV | ENG gap vs small-phone curve */
export const fluidAboutDesktopLangGap =
  "gap-[clamp(6px,calc(100vw*11.52/1920),11.52px)]";

/** Home mobile header: smaller LV | ENG than `fluidPrimaryText`. */
export const fluidHomeMobileLang =
  "text-[clamp(10px,calc(10px+(100vw-320px)*0.001),12px)] gap-[clamp(4px,calc(4px+(100vw-320px)*0.005),7px)]";

/** Home mobile burger drawer: primary nav links. */
export const fluidHomeMobileMenu =
  "gap-3 font-normal text-[clamp(10px,calc(10px+(100vw-320px)*0.001),12px)] tracking-[0.16em]";

/** Home mobile drawer: portfolio sub-links. */
export const fluidHomeMobileNavSub =
  "text-[clamp(9px,calc(9px+(100vw-320px)*0.0005),10.5px)] tracking-[0.14em]";

/** Portfolio column sub-links: 10px → 11.2px */
export const fluidNavSubText =
  "text-[clamp(10px,calc(10px+(100vw-320px)*0.00075),11.2px)]";

/** Yellow dropdown row labels: 11px → 14px */
export const fluidDropdownText =
  "text-[clamp(11px,calc(11px+(100vw-320px)*0.001875),14px)]";

/** About page title: ~32px @ 320 → 65.55px @ 1920 */
export const fluidAboutTitle =
  "text-[clamp(2rem,calc(32px+(100vw-320px)*0.02097),65.55px)]";

/** About page body: 16px @ 320 → 20px @ 1920 */
export const fluidAboutBody =
  "text-[clamp(1rem,calc(16px+(100vw-320px)*0.0025),20px)]";
