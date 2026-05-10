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

/**
 * Language icons (main header / home hero): slightly under primary nav scale; ~12px → 14px.
 * Icons use `h-[1em]` so this directly controls size.
 */
export const fluidLangIconText =
  "text-[clamp(12px,calc(12px+(100vw-320px)*0.00125),14px)]";

/**
 * Primary nav menu SVGs (header row): larger than language icons; ~14px → 17px.
 */
export const fluidNavMenuIconText =
  "text-[clamp(14px,calc(14px+(100vw-320px)*0.001875),17px)]";

/** About-banner primary nav menu: scales with ≥701px artboard. */
export const fluidNavMenuIconAboutDesktop =
  "text-[clamp(14px,calc(14px+(100vw-701px)*3/1219),17px)]";

/**
 * Overrides {@link fluidNavMenuIconAboutDesktop} gap + SVG em scale at ≤420px so the three-row
 * items match the compact mobile mockup (proportional 320→420, single flex line).
 * Width literal must stay aligned with SUBPAGE_NAV_COMPACT_MAX_PX (site-breakpoints).
 */
export const fluidAboutBannerNavCompactMax420 =
  "max-[420px]:gap-[length:clamp(11px,calc(11px+(100vw-320px)*0.048),18px)] max-[420px]:text-[length:clamp(10px,calc(10px+(100vw-320px)*0.01),11px)]";

/** Primary nav menu SVGs (mobile drawer): large tap targets; ~15px → 19px. */
export const fluidNavMenuIconMobile =
  "text-[clamp(15px,calc(15px+(100vw-320px)*0.0025),19px)]";

/** About-header desktop (≥701): lang size tracks 1920 artboard, 12px–16px */
export const fluidAboutDesktopLang =
  "text-[clamp(12px,calc(12px+(100vw-701px)*4/1219),16px)]";

/** About-banner language icons: same breakpoint as `fluidAboutDesktopLang`, capped smaller for icons. */
export const fluidLangIconAboutDesktop =
  "text-[clamp(12px,calc(12px+(100vw-701px)*2/1219),14px)]";

/** About-header desktop: tighter LV | ENG gap vs small-phone curve */
export const fluidAboutDesktopLangGap =
  "gap-[clamp(6px,calc(100vw*11.52/1920),11.52px)]";

/** Home mobile header: LV | ENG (compact chrome); tuned for compact home (≤480px). */
export const fluidHomeMobileLang =
  "text-[clamp(10px,calc(10px+(100vw-320px)*0.001),12px)] gap-[clamp(5px,calc(5px+(100vw-320px)*0.0045),8px)]";

/** With `homeMobile` variant ≤420 — proportionally tighter vs subpage raster nav mockups */
export const fluidHomeMobileLangCompactMax420 =
  "max-[420px]:gap-[length:clamp(5px,calc(5px+(100vw-320px)*0.0125),7.5px)] max-[420px]:text-[length:clamp(9px,calc(9px+(100vw-320px)*0.007143),10.25px)]";

/** Home mobile burger drawer: primary nav links. */
export const fluidHomeMobileMenu =
  "gap-6 font-normal leading-snug text-[clamp(15px,calc(15px+(100vw-320px)*0.00145),18px)] tracking-[0.16em]";

/** Home mobile drawer: portfolio sub-links. */
export const fluidHomeMobileNavSub =
  "leading-normal text-[clamp(13px,calc(13px+(100vw-320px)*0.00105),15.5px)] tracking-[0.14em]";

/** Portfolio column sub-links: 10px → 11.2px */
export const fluidNavSubText =
  "text-[clamp(10px,calc(10px+(100vw-320px)*0.00075),11.2px)]";

/** Yellow dropdown row labels: 14px → 18px */
export const fluidDropdownText =
  "text-[clamp(14px,calc(14px+(100vw-320px)*0.001875),18px)]";

/** About headline: mobile single-line band; desktop (lg+) scales like 1920 artboard to max 65.55px. */
export const fluidAboutTitle =
  "max-lg:whitespace-nowrap max-lg:tracking-tight max-lg:text-[clamp(21px,calc(21px+(100vw-320px)*0.062),42px)] lg:text-[length:clamp(2.25rem,calc(100vw*65.55/1920),65.55px)]";

/**
 * About body: mobile/tablet stack uses 320→ ramp; from `lg` tracks 12.67px→20px @1920 (16px floor).
 */
export const fluidAboutBody =
  "text-[clamp(1rem,calc(16px+(100vw-320px)*0.0025),20px)] lg:text-[length:clamp(16px,calc(100vw*20/1920),20px)]";

/**
 * Contact page H2 — same 1920 cap as {@link fluidAboutTitle}; below `lg` stays one line (both LV/EN
 * headings) via nowrap + tighter floor fluid scale for narrow widths.
 */
export const fluidContactTitle =
  "font-sans font-bold not-italic uppercase leading-none tracking-tight text-foreground max-lg:whitespace-nowrap max-lg:tracking-normal max-lg:text-[length:clamp(16px,calc(16px+(100vw-320px)*0.065),52px)] lg:text-[length:clamp(2.25rem,calc(100vw*65.55/1920),65.55px)]";

/**
 * Contact labels, email/phone row, message label — matches previous aside ramp below `lg`;
 * from `lg` tracks 12→19px and line-height to 24px @1920.
 */
export const fluidContactLabel =
  "font-sans font-light not-italic uppercase tracking-[0.05em] text-foreground text-[length:clamp(12px,calc(12px+(100vw-320px)*0.004375),19px)] leading-[length:clamp(16px,calc(16px+(100vw-320px)*0.005),24px)] lg:text-[length:clamp(12px,calc(100vw*19/1920),19px)] lg:leading-[length:clamp(16px,calc(100vw*24/1920),24px)]";

/** Large decorative watermark behind contact form — scales with 1920 artboard on desktop. */
export const fluidContactDecorative =
  "text-[clamp(2rem,calc(2rem+(100vw-320px)*0.025),4rem)] lg:text-[length:clamp(2rem,calc(100vw*64/1920),4rem)]";
