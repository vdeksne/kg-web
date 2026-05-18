"use client";

import Image from "next/image";
import Link from "next/link";
import { useSocialLinkHrefsOptional } from "@/components/site/SocialLinksProvider";
import { DEFAULT_SOCIAL_LINK_HREFS } from "@/lib/site-content/defaults";
import type { SocialLinksHrefMap } from "@/lib/site-content/types";
import { cn } from "@/lib/utils";

const ENTRIES: {
  key: keyof SocialLinksHrefMap;
  label: string;
  src: string;
}[] = [
  { key: "facebook", label: "Facebook", src: "/icons/socials/fb.svg" },
  { key: "instagram", label: "Instagram", src: "/icons/socials/instagram.svg" },
  { key: "linkedin", label: "LinkedIn", src: "/icons/socials/linkedin.svg" },
  { key: "whatsapp", label: "WhatsApp", src: "/icons/socials/whatsapp.svg" },
];

const ICON = 40;

export function SocialLinks({
  className,
  /** When set (e.g. Storybook), overrides layout context. */
  hrefs: hrefsProp,
  /** Scale icon hit-area and gaps with 1920 reference (about-header desktop). */
  fluid = false,
  /** Smaller square icons + tight gap (mobile footer). */
  compact = false,
}: {
  className?: string;
  hrefs?: SocialLinksHrefMap;
  fluid?: boolean;
  compact?: boolean;
}) {
  const fromContext = useSocialLinkHrefsOptional();
  const hrefs = hrefsProp ?? fromContext ?? DEFAULT_SOCIAL_LINK_HREFS;

  const gap = compact
    ? "gap-[8.2px]"
    : fluid
      ? "gap-[clamp(10px,calc(22*100vw/1920),22px)]"
      : "gap-[22px]";
  const iconBox = compact
    ? "size-[1.5rem]"
    : fluid
      ? "size-[clamp(28px,calc(40*100vw/1920),40px)]"
      : "size-10";

  const imgPx = compact ? 24 : ICON;

  return (
    <div className={className}>
      <ul className={cn("flex items-center", gap)}>
        {ENTRIES.map(({ key, label, src }) => (
          <li key={key}>
            <Link
              href={hrefs[key]}
              aria-label={label}
              className={cn(
                "flex shrink-0 items-center justify-center transition-opacity hover:opacity-75",
                iconBox,
              )}
            >
              <Image
                src={src}
                alt=""
                width={imgPx}
                height={imgPx}
                className={cn(
                  compact
                    ? "size-[1.5rem] object-contain"
                    : fluid
                      ? "h-full w-full object-contain"
                      : "size-10",
                )}
                unoptimized
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
