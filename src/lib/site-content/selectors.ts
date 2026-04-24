import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/messages";
import type { SiteContent } from "./types";

export function contactFormCopy(
  contact: SiteContent["contact"],
  locale: Locale,
): Messages["contact"] {
  return {
    decorative: contact.decorative[locale],
    heading: contact.heading[locale],
    phoneLabel: contact.phoneLabel[locale],
    nameLabel: contact.nameLabel[locale],
    emailLabel: contact.emailLabel[locale],
    messageLabel: contact.messageLabel[locale],
    submit: contact.submit[locale],
    sent: contact.sent[locale],
    error: contact.error[locale],
  };
}
