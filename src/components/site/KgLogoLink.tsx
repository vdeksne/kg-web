"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { KgLogo } from "@/components/site/KgLogo";
import { withLocale } from "@/lib/i18n-path";

export function KgLogoLink({
  className,
  imgClassName,
}: {
  className?: string;
  imgClassName?: string;
}) {
  const params = useParams();
  const raw = params?.locale;
  const locale: Locale =
    typeof raw === "string" && isLocale(raw) ? raw : defaultLocale;
  const href = withLocale("/", locale);

  return (
    <Link href={href} className={cn("inline-block shrink-0", className)}>
      <KgLogo className={imgClassName} />
    </Link>
  );
}
