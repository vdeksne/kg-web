import { LOGO_GALLERY_TOTAL } from "@/data/portfolio";
import type { PortfolioItem } from "@/lib/site-content/types";

export type DistributePortfolioColumnsOptions = {
  /**
   * Logo grid: first 18 items round-robin; items 18–19 sit under columns 2–3 (column 1 empty),
   * matching Figma’s last row.
   */
  logoBottomRowEmptyFirstColumn?: boolean;
};

/**
 * Figma lays the gallery as three independent vertical stacks, not a shared-row grid.
 * A CSS row grid forces the row height to the tallest tile, leaving empty space under
 * shorter tiles (page background shows through).
 *
 * Items in `site-content` / seed data are listed **row-major** (left→right, then next row).
 * `index % 3` sends them into columns so the first line is [0],[1],[2], the second [3],[4],[5], …
 */
export function distributePortfolioItemsToColumns(
  items: readonly PortfolioItem[],
  columnCount: number,
  options?: DistributePortfolioColumnsOptions,
): PortfolioItem[][] {
  if (columnCount < 1) return [items.slice()];
  if (
    options?.logoBottomRowEmptyFirstColumn &&
    columnCount === 3 &&
    items.length === LOGO_GALLERY_TOTAL
  ) {
    const cols: PortfolioItem[][] = [[], [], []];
    for (let i = 0; i < LOGO_GALLERY_TOTAL - 2; i++) {
      cols[i % 3]!.push(items[i]!);
    }
    cols[1]!.push(items[18]!);
    cols[2]!.push(items[19]!);
    return cols;
  }
  const cols: PortfolioItem[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, i) => {
    cols[i % columnCount]!.push(item);
  });
  return cols;
}
