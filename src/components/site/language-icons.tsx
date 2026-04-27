import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const accent = "var(--kg-accent, #f3c02d)";

/** Max viewBox width ÷ height so selected/unselected swaps don’t shift layout (`h-[1em]` icons). */
const LV_SLOT_W = "calc(42.4 / 16.8 * 1em)";
const ENG_SLOT_W = "calc(64.7 / 17.2 * 1em)";

type IconProps = {
  selected: boolean;
  className?: string;
};

function IconSlot({
  widthExpr,
  className,
  children,
}: {
  widthExpr: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[1em] shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: widthExpr }}
    >
      {children}
    </span>
  );
}

/** Inline SVGs from `public/images/languages` — `currentColor` for glyphs, accent bar when selected. */
export function LanguageLvIcon({ selected, className }: IconProps) {
  const svg = selected ? (
    <svg
      viewBox="0 0 42.4 16.8"
      className="h-[1em] w-auto max-h-[1em] shrink-0"
      aria-hidden
    >
      <rect fill={accent} x="0" y="7.2" width="42.4" height="2.4" />
      <g fill="currentColor">
        <path d="M8.1,0h1.2v15.5h9.8v1.1h-11V0Z" />
        <path d="M18.3,0h1.4l6.5,15.3L32.8,0h1.3l-7.3,16.8h-1.1L18.3,0Z" />
      </g>
    </svg>
  ) : (
    <svg
      viewBox="0 0 25.9 16.8"
      className="h-[1em] w-auto max-h-[1em] shrink-0"
      aria-hidden
    >
      <g fill="currentColor">
        <path d="M0,0h1.2v15.5h9.8v1.1H0V0Z" />
        <path d="M10.2,0h1.4l6.5,15.3L24.6,0h1.3l-7.3,16.8h-1.1L10.2,0Z" />
      </g>
    </svg>
  );

  return (
    <IconSlot widthExpr={LV_SLOT_W} className={className}>
      {svg}
    </IconSlot>
  );
}

export function LanguageEngIcon({ selected, className }: IconProps) {
  const svg = selected ? (
    <svg
      viewBox="0 0 64.7 17.2"
      className="h-[1em] w-auto max-h-[1em] shrink-0"
      aria-hidden
    >
      <rect fill={accent} x="0" y="7.4" width="64.7" height="2.4" />
      <g fill="currentColor">
        <path d="M8.1.3h11.9v1.1h-10.6v6.5h9.5v1.1h-9.5v6.7h10.7v1.1h-12V.3Z" />
        <path d="M23.6.3h1.2l11.5,14.5V.3h1.2v16.7h-.9L24.8,2.1v14.8h-1.2V.3Z" />
        <path d="M41.7,8.7h0c0-4.5,3.3-8.7,8.2-8.7s4.4.8,6.1,2.2l-.8.9c-1.3-1.1-2.9-2-5.4-2-4.1,0-6.9,3.4-6.9,7.5h0c0,4.4,2.7,7.6,7.1,7.6s4.1-.9,5.3-1.9v-4.8h-5.6v-1.1h6.8v6.4c-1.5,1.3-3.8,2.5-6.5,2.5-5.3,0-8.4-3.9-8.4-8.6Z" />
      </g>
    </svg>
  ) : (
    <svg
      viewBox="0 0 48.4 17.2"
      className="h-[1em] w-auto max-h-[1em] shrink-0"
      aria-hidden
    >
      <g fill="currentColor">
        <path d="M0,.3h11.9v1.1H1.2v6.5h9.5v1.1H1.2v6.7h10.7v1.1H0V.3Z" />
        <path d="M15.5.3h1.2l11.5,14.5V.3h1.2v16.7h-.9L16.7,2.1v14.8h-1.2V.3Z" />
        <path d="M33.5,8.7h0c0-4.5,3.3-8.7,8.2-8.7s4.4.8,6.1,2.2l-.8.9c-1.3-1.1-2.9-2-5.4-2-4.1,0-6.9,3.4-6.9,7.5h0c0,4.4,2.7,7.6,7.1,7.6s4.1-.9,5.3-1.9v-4.8h-5.6v-1.1h6.8v6.4c-1.5,1.3-3.8,2.5-6.5,2.5-5.3,0-8.4-3.9-8.4-8.6Z" />
      </g>
    </svg>
  );

  return (
    <IconSlot widthExpr={ENG_SLOT_W} className={className}>
      {svg}
    </IconSlot>
  );
}
