import type { SiteContent } from "./types";

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function deepMergeSiteContent(
  base: SiteContent,
  ...layers: Array<Partial<SiteContent> | null | undefined>
): SiteContent {
  let out: SiteContent = structuredClone(base);
  for (const layer of layers) {
    if (!layer) continue;
    out = mergeRecursive(out, layer) as SiteContent;
  }
  return out;
}

function mergeRecursive<T>(base: T, patch: Partial<T>): T {
  if (!isPlainObject(base) || !isPlainObject(patch)) {
    return (patch !== undefined ? patch : base) as T;
  }
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(patch)) {
    const pk = key as keyof T;
    const bv = base[pk];
    const pv = patch[pk];
    if (pv === undefined) continue;
    if (Array.isArray(pv)) {
      result[key] = pv;
      continue;
    }
    if (isPlainObject(bv) && isPlainObject(pv)) {
      result[key] = mergeRecursive(
        bv as Record<string, unknown>,
        pv as Record<string, unknown>,
      );
    } else {
      result[key] = pv;
    }
  }
  return result as T;
}
