import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { withLocale } from "@/lib/i18n-path";
import { cn } from "@/lib/utils";

const SRC = "/images/header_V2.png";
const WIDTH = 2568;
const HEIGHT = 264;
const DISPLAY_W = 1283.931;
const DISPLAY_H = 131.9;

export function HeaderBannerLogo({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <Link
      href={withLocale("/", locale)}
      className={cn(
        "relative z-10 inline-block shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <Image
        src={SRC}
        alt="Kaspars Groza — portfolio"
        width={WIDTH}
        height={HEIGHT}
        className="object-contain"
        style={{
          width: `min(100%, ${DISPLAY_W}px)`,
          aspectRatio: `${DISPLAY_W} / ${DISPLAY_H}`,
          height: "auto",
        }}
        priority
      />
    </Link>
  );
}
