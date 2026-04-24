import { z } from "zod";

export const localizedStringSchema = z.object({
  lv: z.string(),
  en: z.string(),
});

export type LocalizedString = z.infer<typeof localizedStringSchema>;

export const portfolioItemSchema = z.object({
  id: z.string(),
  alt: z.string(),
  src: z.string().min(1),
  ratioClass: z.string(),
});

export const siteContentSchema = z.object({
  about: z.object({
    title: localizedStringSchema,
    p1: localizedStringSchema,
    p2: localizedStringSchema,
    portraitUrl: z.string().min(1),
    portraitAlt: localizedStringSchema,
  }),
  portfolio: z.object({
    breadcrumb: localizedStringSchema,
    categoryLogo: localizedStringSchema,
    tagline: localizedStringSchema,
    items: z.array(portfolioItemSchema),
  }),
  contact: z.object({
    decorative: localizedStringSchema,
    heading: localizedStringSchema,
    phoneLabel: localizedStringSchema,
    nameLabel: localizedStringSchema,
    emailLabel: localizedStringSchema,
    messageLabel: localizedStringSchema,
    submit: localizedStringSchema,
    sent: localizedStringSchema,
    error: localizedStringSchema,
  }),
});

export type SiteContent = z.infer<typeof siteContentSchema>;
