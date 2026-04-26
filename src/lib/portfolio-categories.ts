/**
 * Normalizes admin/user input into a URL-safe gallery category slug.
 * Result must still satisfy `portfolioCategorySlugSchema` in site-content types.
 */
export function normalizePortfolioCategorySlugInput(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
