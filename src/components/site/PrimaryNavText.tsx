import { cn } from "@/lib/utils";

/** Single line box for ABOUT / WORK / CONTACT — height tracks `fluidNavMenu*` on the parent `<ul>` / column. */
export const PRIMARY_NAV_BAND_H_CLASS = "h-[calc(1em*25.8/17)]";

/** Row `<ul>`: keep one horizontal line + block locale swaps wrapping to a second band. */
export const PRIMARY_NAV_UL_ROW_LAYOUT_CLASS =
  "min-h-[calc(1em*25.8/17)] flex-nowrap";

const STRIPE_THICKNESS = "h-[clamp(2px,calc(1em*2.4/17),4px)]";

export function PrimaryNavStripe({
  variant,
}: {
  /** `selected` keeps stripe visible (current route). `idle` fades in when `group/menu` ancestor is hovered or focus-visible (see {@link primaryNavItemShellClass}). */
  variant: "selected" | "idle";
}) {
  return (
    <span
      className={cn(
        /* Center + extend past glyphs so yellow bar ends aren’t clipped by flex/link boxes */
        "pointer-events-none absolute top-1/2 left-1/2 z-0 max-w-none w-[calc(100%+max(14px,0.7em))] -translate-x-1/2 -translate-y-1/2 bg-[var(--kg-accent,#f3c02d)] transition-opacity duration-150",
        STRIPE_THICKNESS,
        variant === "selected"
          ? "opacity-100"
          : "opacity-0 group-hover/menu:opacity-100 group-focus-visible/menu:opacity-100",
      )}
      aria-hidden
    />
  );
}

export function PrimaryNavText({
  selected,
  children,
}: {
  selected: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className="relative inline-flex max-w-none items-center justify-center overflow-visible whitespace-nowrap">
      <PrimaryNavStripe variant={selected ? "selected" : "idle"} />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

/** Row / column label shell. `group/menu` avoids clashing with the portfolio `<li>`’s unnamed `group` (dropdown hover). */
export function primaryNavItemShellClass(className?: string) {
  return cn(
    PRIMARY_NAV_BAND_H_CLASS,
    "group/menu inline-flex max-w-none w-max shrink-0 items-center justify-center overflow-visible font-normal uppercase leading-none tracking-[0.05em] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors",
    className,
  );
}
