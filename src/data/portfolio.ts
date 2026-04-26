import {
  GALLERY_TILE_CYCLE,
  type GalleryTileSizeId,
} from "@/lib/gallery-tile-sizes";
import type { PortfolioItem } from "@/lib/site-content/types";

/** Row 1: col1, col2 = 487.746×431, col3 = 488.046×248.6 */
const LOGO_FIRST_ROW_TILES: readonly GalleryTileSizeId[] = [
  "w488h426",
  "w487h431",
  "w488h249",
];

/** Row 2 (Figma): 487.746×373 | 488.046×254 | 488.046×425.9 */
const LOGO_SECOND_ROW_TILES: readonly GalleryTileSizeId[] = [
  "w488h373",
  "w488h254",
  "w488h426",
];

/** Row 3: 488.046×381.8 | 488.046×454 | 487.746×488 */
const LOGO_THIRD_ROW_TILES: readonly GalleryTileSizeId[] = [
  "w488h382",
  "w488h454",
  "w487h488",
];

/** Row 4: 487.746×367 | 488.046×433 | 488.046×409.1 */
const LOGO_FOURTH_ROW_TILES: readonly GalleryTileSizeId[] = [
  "w487h367",
  "w488h433",
  "w488h409",
];

/** Row 5: 488.046×415.8 | 487.746×354 | 488.046×367.3 */
const LOGO_FIFTH_ROW_TILES: readonly GalleryTileSizeId[] = [
  "w488h416",
  "w487h354",
  "w488h367d3",
];

/** Row 6: 487.746×691 | 488.046×488.3 | 487.746×488 */
const LOGO_SIXTH_ROW_TILES: readonly GalleryTileSizeId[] = [
  "w488h691",
  "w488h488d3",
  "w487h488",
];

/** Bottom row: Figma col1 empty — only cols 2–3 */
const LOGO_SEVENTH_ROW_TILES: readonly GalleryTileSizeId[] = [
  "w488h359",
  "w488h224",
];

/** Six 3-up rows (18) + bottom row with two tiles (Figma: empty left column). */
export const LOGO_GALLERY_TOTAL = 18 + LOGO_SEVENTH_ROW_TILES.length;

function logoTileSize(index: number): GalleryTileSizeId {
  if (index < LOGO_FIRST_ROW_TILES.length) {
    return LOGO_FIRST_ROW_TILES[index]!;
  }
  if (index < LOGO_FIRST_ROW_TILES.length + LOGO_SECOND_ROW_TILES.length) {
    return LOGO_SECOND_ROW_TILES[
      index - LOGO_FIRST_ROW_TILES.length
    ]!;
  }
  if (
    index <
    LOGO_FIRST_ROW_TILES.length +
      LOGO_SECOND_ROW_TILES.length +
      LOGO_THIRD_ROW_TILES.length
  ) {
    return LOGO_THIRD_ROW_TILES[
      index -
        LOGO_FIRST_ROW_TILES.length -
        LOGO_SECOND_ROW_TILES.length
    ]!;
  }
  if (
    index <
    LOGO_FIRST_ROW_TILES.length +
      LOGO_SECOND_ROW_TILES.length +
      LOGO_THIRD_ROW_TILES.length +
      LOGO_FOURTH_ROW_TILES.length
  ) {
    return LOGO_FOURTH_ROW_TILES[
      index -
        LOGO_FIRST_ROW_TILES.length -
        LOGO_SECOND_ROW_TILES.length -
        LOGO_THIRD_ROW_TILES.length
    ]!;
  }
  if (
    index <
    LOGO_FIRST_ROW_TILES.length +
      LOGO_SECOND_ROW_TILES.length +
      LOGO_THIRD_ROW_TILES.length +
      LOGO_FOURTH_ROW_TILES.length +
      LOGO_FIFTH_ROW_TILES.length
  ) {
    return LOGO_FIFTH_ROW_TILES[
      index -
        LOGO_FIRST_ROW_TILES.length -
        LOGO_SECOND_ROW_TILES.length -
        LOGO_THIRD_ROW_TILES.length -
        LOGO_FOURTH_ROW_TILES.length
    ]!;
  }
  if (
    index <
    LOGO_FIRST_ROW_TILES.length +
      LOGO_SECOND_ROW_TILES.length +
      LOGO_THIRD_ROW_TILES.length +
      LOGO_FOURTH_ROW_TILES.length +
      LOGO_FIFTH_ROW_TILES.length +
      LOGO_SIXTH_ROW_TILES.length
  ) {
    return LOGO_SIXTH_ROW_TILES[
      index -
        LOGO_FIRST_ROW_TILES.length -
        LOGO_SECOND_ROW_TILES.length -
        LOGO_THIRD_ROW_TILES.length -
        LOGO_FOURTH_ROW_TILES.length -
        LOGO_FIFTH_ROW_TILES.length
    ]!;
  }
  if (index < LOGO_GALLERY_TOTAL) {
    return LOGO_SEVENTH_ROW_TILES[index - 18]!;
  }
  return GALLERY_TILE_CYCLE[
    (index - LOGO_GALLERY_TOTAL) % GALLERY_TILE_CYCLE.length
  ]!;
}

/**
 * Logo gallery: row-major order. `file` = basename under `/public/images/gallery/`
 * (descriptive slug from the piece / brand in the image).
 */
const LOGO_GALLERY_ORDER: ReadonlyArray<{
  num: string;
  alt: string;
  file: string;
}> = [
  { num: "22", alt: "EE Real Estate", file: "ee-real-estate" },
  { num: "24", alt: "Gatavo", file: "gatavo" },
  { num: "23", alt: "eboat.lv", file: "eboat-lv" },
  { num: "26", alt: "Wake business cards", file: "wake-business-cards" },
  { num: "25", alt: "Pērkons", file: "perkons" },
  { num: "28", alt: "Holy Chic", file: "holy-chic" },
  { num: "31", alt: "Āgenskalna Priedes", file: "agenskalna-priedes" },
  { num: "30", alt: "Rīga 2018", file: "riga-2018" },
  { num: "29", alt: "Moto 2017 trip", file: "moto-2017-trip" },
  { num: "32", alt: "Business cards", file: "business-cards" },
  { num: "33", alt: "Sporta centrs Jugla", file: "sporta-centrs-jugla" },
  { num: "34", alt: "Tepat Grupa", file: "tepat-grupa" },
  { num: "35", alt: "FG monogram", file: "fg-monogram" },
  { num: "36", alt: "Kraft business cards", file: "kraft-business-cards" },
  { num: "37", alt: "Wake sēta", file: "wake-seta" },
  { num: "38", alt: "Asais cepiens 2018", file: "asais-cepiens-2018" },
  { num: "39", alt: "Herbal Meadow", file: "herbal-meadow" },
  { num: "40", alt: "Stamp and ink", file: "stamp-and-ink" },
  { num: "41", alt: "A & Z Bedroom", file: "az-bedroom" },
  { num: "42", alt: "Fast Motion", file: "fast-motion" },
];

const logoItems: PortfolioItem[] = LOGO_GALLERY_ORDER.map((row, index) => ({
  id: `logo-${row.num}`,
  alt: row.alt,
  src: `/images/gallery/${row.file}.jpg`,
  tileSize: logoTileSize(index),
  categories: ["logo"],
}));

const drukatieItems: PortfolioItem[] = [
  {
    id: "drukatie-1",
    alt: "Packaging concept",
    src: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80",
    tileSize: "w488h426",
    categories: ["drukatie"],
  },
  {
    id: "drukatie-2",
    alt: "Studio photography",
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80",
    tileSize: "w488h249",
    categories: ["drukatie"],
  },
  {
    id: "drukatie-3",
    alt: "Editorial spread",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    tileSize: "w488h373",
    categories: ["drukatie"],
  },
];

const dazadiItems: PortfolioItem[] = [
  {
    id: "dazadi-1",
    alt: "Lettering detail",
    src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
    tileSize: "w488h691",
    categories: ["dazadi"],
  },
  {
    id: "dazadi-2",
    alt: "Event branding",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    tileSize: "w488h426",
    categories: ["dazadi"],
  },
  {
    id: "dazadi-3",
    alt: "Identity system",
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    tileSize: "w488h249",
    categories: ["dazadi"],
  },
];

export const portfolioItems: PortfolioItem[] = [
  ...logoItems,
  ...drukatieItems,
  ...dazadiItems,
];
