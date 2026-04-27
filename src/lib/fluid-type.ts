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

/** LV / ENG spacing between icon slots */
export const fluidLangGap =
  "gap-[clamp(8.5px,calc(8.5px+(100vw-320px)*0.003125),13.5px)]";

/** About-header desktop (≥701): lang size tracks 1920 artboard, 12px–16px */
export const fluidAboutDesktopLang =
  "text-[clamp(12px,calc(12px+(100vw-701px)*4/1219),16px)]";

/** About-header desktop: tighter LV | ENG gap vs small-phone curve */
export const fluidAboutDesktopLangGap =
  "gap-[clamp(6px,calc(100vw*11.52/1920),11.52px)]";

/** Home mobile header: LV | ENG (compact chrome); tuned for ≤430px. */
export const fluidHomeMobileLang =
  "text-[clamp(10px,calc(10px+(100vw-320px)*0.001),12px)] gap-[clamp(5px,calc(5px+(100vw-320px)*0.0045),8px)]";

/** Home mobile burger drawer: primary nav links. */
export const fluidHomeMobileMenu =
  "gap-4 font-normal leading-snug text-[clamp(15px,calc(15px+(100vw-320px)*0.00145),18px)] tracking-[0.16em]";

/** Home mobile drawer: portfolio sub-links. */
export const fluidHomeMobileNavSub =
  "leading-normal text-[clamp(13px,calc(13px+(100vw-320px)*0.00105),15.5px)] tracking-[0.14em]";

/** Portfolio column sub-links: 10px → 11.2px */
export const fluidNavSubText =
  "text-[clamp(10px,calc(10px+(100vw-320px)*0.00075),11.2px)]";

/** Yellow dropdown row labels: 14px → 18px */
export const fluidDropdownText =
  "text-[clamp(14px,calc(14px+(100vw-320px)*0.001875),18px)]";

/** About page title: ~32px @ 320 → 65.55px @ 1920 */
export const fluidAboutTitle =
  "text-[clamp(2rem,calc(32px+(100vw-320px)*0.02097),65.55px)]";

/** About page body: 16px @ 320 → 20px @ 1920 */
export const fluidAboutBody =
  "text-[clamp(1rem,calc(16px+(100vw-320px)*0.0025),20px)]";
