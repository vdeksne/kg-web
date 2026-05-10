import { z } from "zod";
import type { GalleryTileSizeId } from "@/lib/gallery-tile-sizes";
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

/** Normalized portfolio gallery slide (after CMS parse). */
export type PortfolioItem = {
  id: string;
  alt: string;
  src: string;
  tileSize: GalleryTileSizeId;
  categories: string[];
  description: LocalizedString;
  /** Optional: overrides {@link tileSize} preset for CSS aspect ratio and tile max-width (px). */
  customFramePx?: { width: number; height: number };
};

/** Accepts legacy `category` (single) or `categories` (one or more sections). */
const customFramePxSchema = z.object({
  width: z.number().int().positive().max(4000),
  height: z.number().int().positive().max(4000),
});

export const portfolioItemSchema = z
  .object({
    id: z.string(),
    alt: z.string(),
    src: z.string().min(1),
    tileSize: galleryTileSizeSchema,
    /** When set, overrides preset dimensions for aspect ratio and max-width. */
    customFramePx: customFramePxSchema.optional(),
    categories: z.array(portfolioCategorySlugSchema).optional(),
    category: portfolioCategorySlugSchema.optional(),
    /** Short project note (tools, process) — shown in the gallery lightbox. */
    description: localizedStringSchema.optional(),
  })
  .transform((data): PortfolioItem => {
    const raw =
      data.categories != null && data.categories.length > 0
        ? data.categories
        : data.category != null
          ? [data.category]
          : [];
    const categories = [...new Set(raw)];
    const base: PortfolioItem = {
      id: data.id,
      alt: data.alt,
      src: data.src,
      tileSize: data.tileSize,
      categories,
      description: data.description ?? { lv: "", en: "" },
    };
    return data.customFramePx !== undefined
      ? { ...base, customFramePx: data.customFramePx }
      : base;
  });

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
