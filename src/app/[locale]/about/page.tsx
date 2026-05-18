import Image from "next/image";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeaderInner } from "@/components/site/SiteHeaderInner";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { fluidAboutBody, fluidAboutTitle } from "@/lib/fluid-type";
import { getSiteContent } from "@/lib/site-content/store";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const site = await getSiteContent();
  const { about } = site;
  const portrait = about.portraitUrl;

  return (
    <div className="bg-background relative flex min-h-dvh flex-col">
      <div
        className="pointer-events-none absolute bottom-24 -left-16 h-56 w-56 rounded-[35%] bg-neutral-200/40 blur-3xl sm:bottom-32 sm:-left-20 sm:h-72 sm:w-72"
        aria-hidden
      />

      <SiteHeaderInner variant="about" locale={locale} />
      <main
        className={cn(
          "mx-auto w-full max-w-[1920px] flex-1",
          "max-lg:px-[22px] max-lg:pb-16 max-lg:pt-6 max-lg:sm:pt-8",
          "sm:max-lg:px-9 md:max-lg:px-12",
          "lg:px-[clamp(1.5rem,calc(100vw*202/1920),202px)]",
          "lg:pb-[clamp(3rem,calc(100vw*64/1920),4rem)] lg:pt-[clamp(0.5rem,calc(100vw*16/1920),24px)]",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-8 sm:max-lg:gap-10",
            "lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start",
            "lg:gap-x-[clamp(2rem,calc(100vw*48/1920),3rem)] lg:gap-y-[clamp(1.25rem,calc(100vw*24/1920),24px)]",
          )}
        >
          <h1
            className={cn(
              "order-1 font-sans font-bold not-italic leading-[1.08] tracking-tight text-balance text-foreground lg:order-0",
              fluidAboutTitle,
              "lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-start",
            )}
          >
            {about.title[locale]}
          </h1>

          <div
            className={cn(
              "relative order-2 mx-auto w-full max-w-[min(100%,673.749px)] shrink-0 lg:order-0 lg:mx-0",
              "lg:max-w-[min(100%,calc(100vw*673.749/1920),673.749px)]",
              "lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:self-start",
            )}
          >
            <div
              className="relative w-full overflow-hidden rounded-none bg-neutral-900 shadow-xl ring-1 ring-black/5 lg:shadow-2xl lg:ring-0"
              style={{ aspectRatio: "673.749 / 561.1" }}
            >
              <Image
                src={portrait}
                alt={about.portraitAlt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 674px"
                priority
                unoptimized={
                  portrait.startsWith("/uploads/") || portrait.endsWith(".svg")
                }
              />
            </div>
          </div>

          <div
            className={cn(
              "order-3 max-w-full space-y-5 sm:max-lg:max-w-[789px] sm:max-lg:space-y-6 lg:order-0",
              "lg:max-w-[min(100%,calc(100vw*789/1920),789px)] lg:space-y-[clamp(1.25rem,calc(100vw*24/1920),24px)]",
              "text-justify",
              "font-sans font-light not-italic text-foreground",
              fluidAboutBody,
              "leading-[1.65] lg:leading-[179%]",
              "lg:col-start-1 lg:row-start-2",
            )}
          >
            {about.body[locale]
              .split(/\n\n+/)
              .map((block) => block.trim())
              .filter(Boolean)
              .map((text, i) => (
                <p key={i} className="text-pretty">
                  {text}
                </p>
              ))}
          </div>

          <Image
            src="/images/Signature.png"
            alt=""
            width={210}
            height={142}
            className="order-4 ml-auto mr-0 block h-auto w-[min(120px,40vw)] max-w-full sm:max-lg:w-[140px] lg:col-start-1 lg:row-start-3 lg:order-0 lg:ml-auto lg:mr-0 lg:w-[clamp(156px,calc(100vw*210/1920),210px)] lg:self-end"
          />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
