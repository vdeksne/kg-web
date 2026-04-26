import { z } from "zod";

/** Design-spec tile frames (px). CSS `aspect-ratio` = width / height. */
export const GALLERY_TILE_PRESETS = {
  w488h426: {
    width: 488.046,
    height: 425.9,
    label: "488 × 426",
  },
  w488h249: {
    width: 488.046,
    height: 248.6,
    label: "488 × 249",
  },
  /** Row 2 middle (Figma) */
  w488h254: {
    width: 488.046,
    height: 254,
    label: "488 × 254",
  },
  w488h373: {
    width: 487.746,
    height: 373,
    label: "488 × 373",
  },
  /** Row 3 col 1 (Figma) */
  w488h382: {
    width: 488.046,
    height: 381.8,
    label: "488 × 381.8",
  },
  /** Row 3 col 2 */
  w488h454: {
    width: 488.046,
    height: 454,
    label: "488 × 454",
  },
  /** Row 3 col 3 */
  w487h488: {
    width: 487.746,
    height: 488,
    label: "488 × 488",
  },
  /** Row 4 col 1 */
  w487h367: {
    width: 487.746,
    height: 367,
    label: "488 × 367",
  },
  /** Row 4 col 2 */
  w488h433: {
    width: 488.046,
    height: 433,
    label: "488 × 433",
  },
  /** Row 4 col 3 */
  w488h409: {
    width: 488.046,
    height: 409.1,
    label: "488 × 409.1",
  },
  /** Row 5 col 1 */
  w488h416: {
    width: 488.046,
    height: 415.8,
    label: "488 × 415.8",
  },
  /** Row 5 col 2 */
  w487h354: {
    width: 487.746,
    height: 354,
    label: "488 × 354",
  },
  /** Row 5 col 3 */
  w488h367d3: {
    width: 488.046,
    height: 367.3,
    label: "488 × 367.3",
  },
  w488h691: {
    width: 487.746,
    height: 691,
    label: "488 × 691",
  },
  /** Row 6 col 2 (488 wide square-ish) */
  w488h488d3: {
    width: 488.046,
    height: 488.3,
    label: "488 × 488.3",
  },
  /** Bottom row col 2 (Figma; col 1 empty) */
  w488h359: {
    width: 488.046,
    height: 358.9,
    label: "488 × 358.9",
  },
  /** Bottom row col 3 */
  w488h224: {
    width: 488.046,
    height: 223.8,
    label: "488 × 223.8",
  },
  /** First-row middle tile (row 1, col 2) */
  w487h431: {
    width: 487.746,
    height: 431,
    label: "488 × 431",
  },
} as const;

export const galleryTileSizeSchema = z.enum([
  "w488h426",
  "w488h249",
  "w488h254",
  "w488h373",
  "w488h382",
  "w488h454",
  "w487h488",
  "w487h367",
  "w488h433",
  "w488h409",
  "w488h416",
  "w487h354",
  "w488h367d3",
  "w488h691",
  "w488h488d3",
  "w488h359",
  "w488h224",
  "w487h431",
]);

export type GalleryTileSizeId = z.infer<typeof galleryTileSizeSchema>;

/** All presets (admin select), design order */
export const GALLERY_TILE_SIZE_ORDER: readonly GalleryTileSizeId[] = [
  "w488h426",
  "w487h431",
  "w488h249",
  "w488h254",
  "w488h373",
  "w488h382",
  "w488h454",
  "w487h488",
  "w487h367",
  "w488h433",
  "w488h409",
  "w488h416",
  "w487h354",
  "w488h367d3",
  "w488h691",
  "w488h488d3",
  "w488h359",
  "w488h224",
];

/** Cycle for logo gallery from row 3 onward (indices 6, 7, …) */
export const GALLERY_TILE_CYCLE: readonly GalleryTileSizeId[] = [
  "w488h426",
  "w488h249",
  "w488h373",
  "w488h691",
];

/**
 * Portfolio item ids where the asset should letterbox inside the frame (full image visible).
 */
export const GALLERY_OBJECT_CONTAIN_IDS = new Set<string>(["logo-23"]);

/** CSS `aspect-ratio` value (number/number). */
export function aspectRatioCssFromTileSize(id: GalleryTileSizeId): string {
  const { width, height } = GALLERY_TILE_PRESETS[id];
  return `${width} / ${height}`;
}

export function tileSizeAtIndex(index: number): GalleryTileSizeId {
  const n = GALLERY_TILE_CYCLE.length;
  return GALLERY_TILE_CYCLE[((index % n) + n) % n]!;
}
