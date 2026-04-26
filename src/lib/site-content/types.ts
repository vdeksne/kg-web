import { z } from "zod";
import { galleryTileSizeSchema } from "@/lib/gallery-tile-sizes";

export const localizedStringSchema = z.object({
  lv: z.string(),
  en: z.string(),
});

export type LocalizedString = z.infer<typeof localizedStringSchema>;

/** URL segment: lowercase letters, digits, single hyphens between words. */
export const portfolioCategorySlugSchema = z
  .string()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const portfolioCategoryNavItemSchema = z.object({
  slug: portfolioCategorySlugSchema,
  label: localizedStringSchema,
});

export type PortfolioCategoryNavItem = z.infer<
  typeof portfolioCategoryNavItemSchema
>;

/** Accepts legacy `category` (single) or `categories` (one or more sections). */
export const portfolioItemSchema = z
  .object({
    id: z.string(),
    alt: z.string(),
    src: z.string().min(1),
    tileSize: galleryTileSizeSchema,
    categories: z.array(portfolioCategorySlugSchema).optional(),
    category: portfolioCategorySlugSchema.optional(),
  })
  .transform((data) => {
    const raw =
      data.categories != null && data.categories.length > 0
        ? data.categories
        : data.category != null
          ? [data.category]
          : [];
    const categories = [...new Set(raw)];
    return {
      id: data.id,
      alt: data.alt,
      src: data.src,
      tileSize: data.tileSize,
      categories,
    };
  });

export type PortfolioItem = z.infer<typeof portfolioItemSchema>;

export const siteContentSchema = z
  .object({
    about: z.object({
      title: localizedStringSchema,
      body: localizedStringSchema,
      portraitUrl: z.string().min(1),
      portraitAlt: localizedStringSchema,
    }),
    portfolio: z.object({
      breadcrumb: localizedStringSchema,
      categoryLogo: localizedStringSchema,
      categoryNav: z.array(portfolioCategoryNavItemSchema).min(1),
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
  })
  .superRefine((data, ctx) => {
    const navSlugs = data.portfolio.categoryNav.map((c) => c.slug);
    if (new Set(navSlugs).size !== navSlugs.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Each gallery category needs a unique slug.",
        path: ["portfolio", "categoryNav"],
      });
    }
    const slugSet = new Set(navSlugs);
    for (let i = 0; i < data.portfolio.items.length; i++) {
      const item = data.portfolio.items[i]!;
      if (item.categories.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Each slide must belong to at least one category.",
          path: ["portfolio", "items", i, "categories"],
        });
        continue;
      }
      for (const cat of item.categories) {
        if (!slugSet.has(cat)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Unknown category slug: ${cat}`,
            path: ["portfolio", "items", i, "categories"],
          });
        }
      }
    }
  });

export type SiteContent = z.infer<typeof siteContentSchema>;
