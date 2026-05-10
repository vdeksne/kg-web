import { GALLERY_TILE_PRESETS } from "@/lib/gallery-tile-sizes";
import type { PortfolioItem } from "@/lib/site-content/types";

/** Width × height (px) for layout: preset, or admin override. */
export function portfolioItemFrameDims(
  item: PortfolioItem,
): { width: number; height: number } {
  const c = item.customFramePx;
  if (c && c.width > 0 && c.height > 0) {
    return { width: c.width, height: c.height };
  }
  const preset = GALLERY_TILE_PRESETS[item.tileSize];
  return { width: preset.width, height: preset.height };
}

/** CSS `aspect-ratio` value for gallery tile / lightbox. */
export function aspectRatioCssForPortfolioItem(item: PortfolioItem): string {
  const { width, height } = portfolioItemFrameDims(item);
  return `${width} / ${height}`;
}
