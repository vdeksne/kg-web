import { ContactForm } from "@/components/site/contact-form";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeaderInner } from "@/components/site/site-header-inner";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { contactFormCopy } from "@/lib/site-content/selectors";
import { getSiteContent } from "@/lib/site-content/store";

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
    <div className="bg-background relative flex min-h-dvh flex-col overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-[color-mix(in_srgb,var(--kg-accent)_35%,transparent)] to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-[40%] bg-neutral-200/50 blur-3xl" />

      <SiteHeaderInner variant="about" locale={locale} />
      <main className="relative mx-auto w-full max-w-[1920px] flex-1 px-[clamp(1.5rem,calc(100vw*202/1920),202px)] py-16">
        <ContactForm copy={contactFormCopy(site.contact, locale)} />
      </main>
      <SiteFooter />
    </div>
  );
}
