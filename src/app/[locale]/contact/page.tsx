import { ContactForm } from "@/components/site/ContactForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeaderInner } from "@/components/site/SiteHeaderInner";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { contactFormCopy } from "@/lib/site-content/selectors";
import { getSiteContent } from "@/lib/site-content/store";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const site = await getSiteContent();

  return (
    <div className="bg-background relative flex min-h-dvh flex-col">
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-[40%] bg-neutral-200/50 blur-3xl" />

      <SiteHeaderInner variant="about" locale={locale} />
      <main
        className={cn(
          "relative mx-auto w-full max-w-[1920px] flex-1 min-w-0 overflow-x-clip",
          "max-lg:px-[22px] max-lg:pb-16 max-lg:pt-6 max-lg:sm:pt-8",
          "sm:max-lg:px-9 md:max-lg:px-12",
          "lg:px-[clamp(1.5rem,calc(100vw*202/1920),202px)]",
          "lg:pb-[clamp(3rem,calc(100vw*64/1920),4rem)] lg:pt-[clamp(0.5rem,calc(100vw*16/1920),24px)]",
        )}
      >
        <ContactForm copy={contactFormCopy(site.contact, locale)} />
      </main>
      <SiteFooter />
    </div>
  );
}
