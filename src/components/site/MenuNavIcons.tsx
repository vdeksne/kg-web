import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

const accent = "var(--kg-accent, #f3c02d)";

/** Path-based LV art uses ~17px-tall viewBox; EN `<text>` art uses 25.8px-tall viewBox. Same ink scale: EN height = 1em × (25.8/17). */
const menuNavIconLvSvgClass = "h-[1em] w-auto shrink-0";
const menuNavIconEngSvgClass =
  "h-[calc(1em*25.8/17)] w-auto shrink-0 overflow-visible -translate-y-[0.1px]";

type NavIconProps = {
  locale: Locale;
  selected: boolean;
  className?: string;
  /** About-page banner nav: LV path art sits ~2px high vs EN `<text>` lockup at same `font-size`. */
  aboutBanner?: boolean;
};

function menuNavLvClass(aboutBanner: boolean | undefined, className?: string) {
  return cn(
    menuNavIconLvSvgClass,
    aboutBanner && "translate-y-[2px]",
    className,
  );
}

/** Par mani / About */
export function MainNavAboutIcon({
  locale,
  selected,
  className,
  aboutBanner,
}: NavIconProps) {
  if (locale === "lv") {
    if (selected) {
      return (
        <svg
          viewBox="0 0 137.9 17"
          className={menuNavLvClass(aboutBanner, className)}
          aria-hidden
        >
          <rect fill={accent} x="0" y="7.3" width="137.9" height="2.4" />
          <g fill="currentColor">
            <path d="M10,.1h6.1c3.7,0,6.3,1.9,6.3,5.2h0c0,3.6-3,5.4-6.6,5.4h-4.5v6.3h-1.3V.1ZM15.8,9.5c3.1,0,5.2-1.6,5.2-4.1h0c0-2.7-2.1-4.1-5.1-4.1h-4.8v8.3h4.6Z" />
            <path d="M30.7,0h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L30.7,0ZM35.7,11.1L31.3,1.4l-4.5,9.7h8.9Z" />
            <path d="M43.2.1h7.1c2.1,0,3.7.6,4.7,1.7.8.8,1.3,1.9,1.3,3.1h0c0,2.9-2.1,4.5-4.9,4.9l5.6,7.2h-1.6l-5.4-7h-5.5v7h-1.3V.1ZM50.1,8.9c2.8,0,4.9-1.4,4.9-3.9h0c0-2.3-1.8-3.7-4.8-3.7h-5.8v7.6h5.7Z" />
            <path d="M67.8.1h1.2l6.8,10L82.5.1h1.2v16.9h-1.3V2.3l-6.7,9.7h0l-6.7-9.7v14.6h-1.2V.1Z" />
            <path d="M95,0h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L95,0ZM100,11.1l-4.4-9.7-4.5,9.7h8.9Z" />
            <path d="M107.5.1h1.2l11.6,14.7V.1h1.2v16.9h-.9l-11.9-15v15h-1.2V.1Z" />
            <path d="M126.7.1h1.3v16.9h-1.3V.1Z" />
          </g>
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 137.9 17"
        className={menuNavLvClass(aboutBanner, className)}
        aria-hidden
      >
        <g fill="currentColor">
          <path d="M10,.1h6.1c3.7,0,6.3,1.9,6.3,5.2h0c0,3.6-3,5.4-6.6,5.4h-4.5v6.3h-1.3V.1ZM15.8,9.5c3.1,0,5.2-1.6,5.2-4.1h0c0-2.7-2.1-4.1-5.1-4.1h-4.8v8.3h4.6Z" />
          <path d="M30.7,0h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L30.7,0ZM35.7,11.1L31.3,1.4l-4.5,9.7h8.9Z" />
          <path d="M43.2.1h7.1c2.1,0,3.7.6,4.7,1.7.8.8,1.3,1.9,1.3,3.1h0c0,2.9-2.1,4.5-4.9,4.9l5.6,7.2h-1.6l-5.4-7h-5.5v7h-1.3V.1ZM50.1,8.9c2.8,0,4.9-1.4,4.9-3.9h0c0-2.3-1.8-3.7-4.8-3.7h-5.8v7.6h5.7Z" />
          <path d="M67.8.1h1.2l6.8,10L82.5.1h1.2v16.9h-1.3V2.3l-6.7,9.7h0l-6.7-9.7v14.6h-1.2V.1Z" />
          <path d="M95,0h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L95,0ZM100,11.1l-4.4-9.7-4.5,9.7h8.9Z" />
          <path d="M107.5.1h1.2l11.6,14.7V.1h1.2v16.9h-.9l-11.9-15v15h-1.2V.1Z" />
          <path d="M126.7.1h1.3v16.9h-1.3V.1Z" />
        </g>
      </svg>
    );
  }

  if (selected) {
    return (
      <svg
        viewBox="0 0 105.6 25.8"
        className={cn(menuNavIconEngSvgClass, className)}
        aria-hidden
      >
        <rect fill={accent} x="0" y="11.7" width="105.6" height="2.4" />
        <text
          fill="currentColor"
          fontSize="24"
          fontWeight={300}
          transform="translate(7.9 20.4)"
          style={{ fontFamily: "inherit" }}
        >
          <tspan x="0" y="0">
            A
          </tspan>
          <tspan x="18.8" y="0">
            B
          </tspan>
          <tspan x="36" y="0">
            O
          </tspan>
          <tspan x="56.4" y="0">
            U
          </tspan>
          <tspan x="74.6" y="0">
            T
          </tspan>
        </text>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 105.6 25.8"
      className={cn(menuNavIconEngSvgClass, className)}
      aria-hidden
    >
      <text
        fill="currentColor"
        fontSize="24"
        fontWeight={300}
        transform="translate(7.9 20.4)"
        style={{ fontFamily: "inherit" }}
      >
        <tspan x="0" y="0">
          A
        </tspan>
        <tspan x="18.8" y="0">
          B
        </tspan>
        <tspan x="36" y="0">
          O
        </tspan>
        <tspan x="56.4" y="0">
          U
        </tspan>
        <tspan x="74.6" y="0">
          T
        </tspan>
      </text>
    </svg>
  );
}

/** Darbi / Work */
export function MainNavPortfolioIcon({
  locale,
  selected,
  className,
  aboutBanner,
}: NavIconProps) {
  if (locale === "lv") {
    if (selected) {
      return (
        <svg
          viewBox="0 0 92.9 17"
          className={menuNavLvClass(aboutBanner, className)}
          aria-hidden
        >
          <rect fill={accent} y="7.3" width="92.9" height="2.4" />
          <g fill="currentColor">
            <path d="M10,.1h5.6c5.3,0,9,3.6,9,8.4h0c0,4.8-3.7,8.5-9,8.5h-5.6V.1ZM11.3,1.3v14.5h4.4c4.7,0,7.7-3.2,7.7-7.2h0c0-4-3-7.3-7.7-7.3h-4.4Z" />
            <path d="M34,0h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L34,0ZM39.1,11.1l-4.4-9.7-4.5,9.7h8.9Z" />
            <path d="M46.5.1h7.1c2.1,0,3.7.6,4.7,1.7.8.8,1.3,1.9,1.3,3.1h0c0,2.9-2.1,4.5-4.9,4.9l5.6,7.2h-1.6l-5.4-7h-5.5v7h-1.3V.1ZM53.5,8.9c2.8,0,4.9-1.4,4.9-3.9h0c0-2.3-1.8-3.7-4.8-3.7h-5.8v7.6h5.7Z" />
            <path d="M63.9.1h7c1.9,0,3.4.6,4.4,1.5.7.7,1.1,1.6,1.1,2.6h0c0,2.4-1.5,3.5-2.9,4,2,.5,3.8,1.7,3.8,4h0c0,2.9-2.4,4.6-6,4.6h-7.3V.1ZM75.1,4.4c0-1.9-1.5-3.1-4.2-3.1h-5.7v6.6h5.6c2.5,0,4.3-1.2,4.3-3.5h0ZM76,12.3c0-2.1-1.8-3.3-5.1-3.3h-5.7v6.8h6.1c2.9,0,4.7-1.3,4.7-3.4h0Z" />
            <path d="M81.6.1h1.3v16.9h-1.3V.1Z" />
          </g>
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 92.9 17"
        className={menuNavLvClass(aboutBanner, className)}
        aria-hidden
      >
        <g fill="currentColor">
          <path d="M10,.1h5.6c5.3,0,9,3.6,9,8.4h0c0,4.8-3.7,8.5-9,8.5h-5.6V.1ZM11.3,1.3v14.5h4.4c4.7,0,7.7-3.2,7.7-7.2h0c0-4-3-7.3-7.7-7.3h-4.4Z" />
          <path d="M34,0h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L34,0ZM39.1,11.1l-4.4-9.7-4.5,9.7h8.9Z" />
          <path d="M46.5.1h7.1c2.1,0,3.7.6,4.7,1.7.8.8,1.3,1.9,1.3,3.1h0c0,2.9-2.1,4.5-4.9,4.9l5.6,7.2h-1.6l-5.4-7h-5.5v7h-1.3V.1ZM53.5,8.9c2.8,0,4.9-1.4,4.9-3.9h0c0-2.3-1.8-3.7-4.8-3.7h-5.8v7.6h5.7Z" />
          <path d="M63.9.1h7c1.9,0,3.4.6,4.4,1.5.7.7,1.1,1.6,1.1,2.6h0c0,2.4-1.5,3.5-2.9,4,2,.5,3.8,1.7,3.8,4h0c0,2.9-2.4,4.6-6,4.6h-7.3V.1ZM75.1,4.4c0-1.9-1.5-3.1-4.2-3.1h-5.7v6.6h5.6c2.5,0,4.3-1.2,4.3-3.5h0ZM76,12.3c0-2.1-1.8-3.3-5.1-3.3h-5.7v6.8h6.1c2.9,0,4.7-1.3,4.7-3.4h0Z" />
          <path d="M81.6.1h1.3v16.9h-1.3V.1Z" />
        </g>
      </svg>
    );
  }

  if (selected) {
    return (
      <svg
        viewBox="0 0 97.9 25.8"
        className={cn(menuNavIconEngSvgClass, className)}
        aria-hidden
      >
        <rect fill={accent} y="11.7" width="97.9" height="2.4" />
        <text
          fill="currentColor"
          fontSize="24"
          fontWeight={300}
          transform="translate(8.7 20.4)"
          style={{ fontFamily: "inherit" }}
        >
          <tspan x="0" y="0">
            W
          </tspan>
          <tspan x="25.5" y="0">
            O
          </tspan>
          <tspan x="45.9" y="0">
            R
          </tspan>
          <tspan x="63.3" y="0">
            K
          </tspan>
        </text>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 97.9 25.8"
      className={cn(menuNavIconEngSvgClass, className)}
      aria-hidden
    >
      <text
        fill="currentColor"
        fontSize="24"
        fontWeight={300}
        transform="translate(8.7 20.4)"
        style={{ fontFamily: "inherit" }}
      >
        <tspan x="0" y="0">
          W
        </tspan>
        <tspan x="25.5" y="0">
          O
        </tspan>
        <tspan x="45.9" y="0">
          R
        </tspan>
        <tspan x="63.3" y="0">
          K
        </tspan>
      </text>
    </svg>
  );
}

/** Kontakti / Contact */
export function MainNavContactIcon({
  locale,
  selected,
  className,
  aboutBanner,
}: NavIconProps) {
  if (locale === "lv") {
    if (selected) {
      return (
        <svg
          viewBox="0 0 141.1 17.4"
          className={menuNavLvClass(aboutBanner, className)}
          aria-hidden
        >
          <rect fill={accent} y="7.5" width="141.1" height="2.4" />
          <g fill="currentColor">
            <path d="M9.8.3h1.3v11.1L21.8.3h1.7l-7.4,7.4,7.7,9.4h-1.6l-6.9-8.5-4.2,4.2v4.3h-1.3V.3Z" />
            <path d="M25.2,8.8h0c0-4.7,3.4-8.8,8.5-8.8s8.5,4.1,8.5,8.7h0c0,4.7-3.4,8.8-8.5,8.8s-8.4-4.1-8.4-8.7ZM40.8,8.8h0c0-4.2-3-7.6-7.2-7.6s-7.1,3.4-7.1,7.5h0c0,4.2,3,7.6,7.2,7.6s7.1-3.4,7.1-7.5Z" />
            <path d="M46.4.3h1.2l11.6,14.7V.3h1.2v16.9h-.9l-11.9-15v15h-1.2V.3Z" />
            <path d="M69.8,1.4h-5.9V.3h13v1.2h-5.9v15.7h-1.3V1.4Z" />
            <path d="M84.5.2h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L84.5.2ZM89.5,11.3l-4.4-9.7-4.5,9.7h8.9Z" />
            <path d="M97,.3h1.3v11.1L109,.3h1.7l-7.4,7.4,7.7,9.4h-1.6l-6.9-8.5-4.2,4.2v4.3h-1.3V.3Z" />
            <path d="M119.3,1.4h-5.9V.3h13v1.2h-5.9v15.7h-1.3V1.4Z" />
            <path d="M130,.3h1.3v16.9h-1.3V.3Z" />
          </g>
        </svg>
      );
    }
    return (
      <svg
        viewBox="0 0 141.1 17.4"
        className={menuNavLvClass(aboutBanner, className)}
        aria-hidden
      >
        <g fill="currentColor">
          <path d="M9.8.3h1.3v11.1L21.8.3h1.7l-7.4,7.4,7.7,9.4h-1.6l-6.9-8.5-4.2,4.2v4.3h-1.3V.3Z" />
          <path d="M25.2,8.8h0c0-4.7,3.4-8.8,8.5-8.8s8.5,4.1,8.5,8.7h0c0,4.7-3.4,8.8-8.5,8.8s-8.4-4.1-8.4-8.7ZM40.8,8.8h0c0-4.2-3-7.6-7.2-7.6s-7.1,3.4-7.1,7.5h0c0,4.2,3,7.6,7.2,7.6s7.1-3.4,7.1-7.5Z" />
          <path d="M46.4.3h1.2l11.6,14.7V.3h1.2v16.9h-.9l-11.9-15v15h-1.2V.3Z" />
          <path d="M69.8,1.4h-5.9V.3h13v1.2h-5.9v15.7h-1.3V1.4Z" />
          <path d="M84.5.2h1.2l7.8,17h-1.4l-2.1-4.7h-9.9l-2.1,4.7h-1.3L84.5.2ZM89.5,11.3l-4.4-9.7-4.5,9.7h8.9Z" />
          <path d="M97,.3h1.3v11.1L109,.3h1.7l-7.4,7.4,7.7,9.4h-1.6l-6.9-8.5-4.2,4.2v4.3h-1.3V.3Z" />
          <path d="M119.3,1.4h-5.9V.3h13v1.2h-5.9v15.7h-1.3V1.4Z" />
          <path d="M130,.3h1.3v16.9h-1.3V.3Z" />
        </g>
      </svg>
    );
  }

  if (selected) {
    return (
      <svg
        viewBox="0 0 137.3 25.8"
        className={cn(menuNavIconEngSvgClass, className)}
        aria-hidden
      >
        <rect fill={accent} y="11.7" width="137.3" height="2.4" />
        <text
          fill="currentColor"
          fontSize="24"
          fontWeight={300}
          transform="translate(8.5 20.4)"
          style={{ fontFamily: "inherit" }}
        >
          <tspan x="0" y="0">
            C
          </tspan>
          <tspan x="17.3" y="0">
            O
          </tspan>
          <tspan x="37.8" y="0">
            N
          </tspan>
          <tspan x="56.5" y="0">
            T
          </tspan>
          <tspan x="69.3" y="0">
            A
          </tspan>
          <tspan x="87.1" y="0">
            C
          </tspan>
          <tspan x="105" y="0">
            T
          </tspan>
        </text>
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 137.3 25.8"
      className={cn(menuNavIconEngSvgClass, className)}
      aria-hidden
    >
      <text
        fill="currentColor"
        fontSize="24"
        fontWeight={300}
        transform="translate(8.5 20.4)"
        style={{ fontFamily: "inherit" }}
      >
        <tspan x="0" y="0">
          C
        </tspan>
        <tspan x="17.3" y="0">
          O
        </tspan>
        <tspan x="37.8" y="0">
          N
        </tspan>
        <tspan x="56.5" y="0">
          T
        </tspan>
        <tspan x="69.3" y="0">
          A
        </tspan>
        <tspan x="87.1" y="0">
          C
        </tspan>
        <tspan x="105" y="0">
          T
        </tspan>
      </text>
    </svg>
  );
}
