import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  {
    href: "https://facebook.com",
    label: "Facebook",
    src: "/icons/socials/fb.svg",
  },
  {
    href: "https://instagram.com",
    label: "Instagram",
    src: "/icons/socials/instagram.svg",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    src: "/icons/socials/linkedin.svg",
  },
  {
    href: "https://wa.me/",
    label: "WhatsApp",
    src: "/icons/socials/whatsapp.svg",
  },
] as const;

const ICON = 40;

export function SocialLinks({
  className,
  /** Scale icon hit-area and gaps with 1920 reference (about-header desktop). */
  fluid = false,
}: {
  className?: string;
  fluid?: boolean;
}) {
  const gap = fluid
    ? "gap-[clamp(10px,calc(22*100vw/1920),22px)]"
    : "gap-[22px]";
  const iconBox = fluid
    ? "size-[clamp(28px,calc(40*100vw/1920),40px)]"
    : "size-10";

  return (
    <div className={className}>
      <ul className={cn("flex items-center", gap)}>
        {items.map(({ href, label, src }) => (
          <li key={label}>
            <Link
              href={href}
              aria-label={label}
              className={cn(
                "flex shrink-0 items-center justify-center transition-opacity hover:opacity-75",
                iconBox,
              )}
            >
              <Image
                src={src}
                alt=""
                width={ICON}
                height={ICON}
                className={cn(
                  fluid ? "h-full w-full object-contain" : "size-10",
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
