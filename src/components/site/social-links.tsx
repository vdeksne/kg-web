import Image from "next/image";
import Link from "next/link";

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

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ul className="flex items-center gap-[22px]">
        {items.map(({ href, label, src }) => (
          <li key={label}>
            <Link
              href={href}
              aria-label={label}
              className="flex size-10 shrink-0 items-center justify-center transition-opacity hover:opacity-75"
            >
              <Image
                src={src}
                alt=""
                width={ICON}
                height={ICON}
                className="size-10"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
