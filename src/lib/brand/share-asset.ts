import "server-only";

import { readFile } from "node:fs/promises";
import { join, normalize, relative } from "node:path";

/** Path under `public/` (no leading slash). Override with `BRAND_SHARE_ASSET`. */
const DEFAULT_RELATIVE = "images/kg.svg";

/**
 * Absolute filesystem path to the raster source for `/api/og-image` and `/api/brand-icon`.
 * Set `BRAND_SHARE_ASSET` to e.g. `icons/nemiz.svg`, `images/Signature.png`, or keep default `images/kg.svg`.
 */
export function brandShareAssetAbsolutePath(): string {
  const env = process.env.BRAND_SHARE_ASSET?.trim();
  const relRaw =
    env && env.length > 0 ? env.replace(/^\/+/, "") : DEFAULT_RELATIVE;
  if (relRaw.includes("..") || relRaw.includes("\0")) {
    throw new Error("Invalid BRAND_SHARE_ASSET");
  }
  const abs = normalize(join(process.cwd(), "public", relRaw));
  const pubRoot = normalize(join(process.cwd(), "public"));
  const fromPub = relative(pubRoot, abs);
  if (fromPub.startsWith("..") || fromPub === "") {
    throw new Error("BRAND_SHARE_ASSET must be a path under public/");
  }
  return abs;
}

export async function readBrandShareAssetBuffer(): Promise<Buffer> {
  return readFile(brandShareAssetAbsolutePath());
}
