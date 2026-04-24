/** Maps persisted ratio keys (legacy Tailwind class names) to CSS aspect-ratio values. */
export const CMS_ASPECT_RATIO: Record<string, string> = {
  "aspect-[4/5]": "4/5",
  "aspect-square": "1",
  "aspect-[3/5]": "3/5",
  "aspect-[5/4]": "5/4",
  "aspect-[3/4]": "3/4",
  "aspect-[4/6]": "4/6",
};

export function aspectRatioFromCms(ratioClass: string): string {
  return CMS_ASPECT_RATIO[ratioClass] ?? "1";
}
