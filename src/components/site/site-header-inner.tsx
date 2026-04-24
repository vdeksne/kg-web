import { LanguageSwitch } from "@/components/site/language-switch";
import { LogoLockup } from "@/components/site/logo-lockup";
import { SiteNav } from "@/components/site/site-nav";
import { SocialLinks } from "@/components/site/social-links";

export function SiteHeaderInner() {
  return (
    <header className="border-border/80 w-full border-b pb-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pt-8 sm:px-10">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <LogoLockup />
          <div className="flex flex-col items-end gap-4">
            <LanguageSwitch />
            <SocialLinks />
          </div>
        </div>
        <SiteNav />
      </div>
    </header>
  );
}
