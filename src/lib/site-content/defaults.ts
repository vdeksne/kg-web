import { portfolioItems as seedPortfolio } from "@/data/portfolio";
import { messages } from "@/i18n/messages";
import type { SiteContent } from "./types";

const portrait =
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80";

export const DEFAULT_SITE_CONTENT: SiteContent = {
  about: {
    title: { lv: messages.lv.about.title, en: messages.en.about.title },
    p1: { lv: messages.lv.about.p1, en: messages.en.about.p1 },
    p2: { lv: messages.lv.about.p2, en: messages.en.about.p2 },
    portraitUrl: portrait,
    portraitAlt: {
      lv: messages.lv.about.portraitAlt,
      en: messages.en.about.portraitAlt,
    },
  },
  portfolio: {
    breadcrumb: {
      lv: messages.lv.portfolio.breadcrumb,
      en: messages.en.portfolio.breadcrumb,
    },
    categoryLogo: {
      lv: messages.lv.portfolio.categoryLogo,
      en: messages.en.portfolio.categoryLogo,
    },
    tagline: {
      lv: messages.lv.portfolio.tagline,
      en: messages.en.portfolio.tagline,
    },
    items: seedPortfolio.map((item) => ({ ...item })),
  },
  contact: {
    decorative: {
      lv: messages.lv.contact.decorative,
      en: messages.en.contact.decorative,
    },
    heading: { lv: messages.lv.contact.heading, en: messages.en.contact.heading },
    phoneLabel: {
      lv: messages.lv.contact.phoneLabel,
      en: messages.en.contact.phoneLabel,
    },
    nameLabel: {
      lv: messages.lv.contact.nameLabel,
      en: messages.en.contact.nameLabel,
    },
    emailLabel: {
      lv: messages.lv.contact.emailLabel,
      en: messages.en.contact.emailLabel,
    },
    messageLabel: {
      lv: messages.lv.contact.messageLabel,
      en: messages.en.contact.messageLabel,
    },
    submit: { lv: messages.lv.contact.submit, en: messages.en.contact.submit },
    sent: { lv: messages.lv.contact.sent, en: messages.en.contact.sent },
    error: { lv: messages.lv.contact.error, en: messages.en.contact.error },
  },
};
