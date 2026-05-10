import "server-only";

import { createClient } from "@supabase/supabase-js";
import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { DEFAULT_SITE_CONTENT } from "./defaults";
import { deepMergeSiteContent } from "./merge";
import type { SiteContent } from "./types";
import { siteContentSchema } from "./types";

const FILE_PATH = join(process.cwd(), "content", "site-content.json");

/** Treat `{}` as “no meaningful DB row” so we still fall back to file + defaults. */
function nonEmptySiteLayer(
  layer: Partial<SiteContent> | null,
): Partial<SiteContent> | null {
  if (layer == null || typeof layer !== "object") return null;
  if (Object.keys(layer).length === 0) return null;
  return layer;
}

async function loadFromFile(): Promise<Partial<SiteContent> | null> {
  try {
    const raw = await readFile(FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    return parsed as Partial<SiteContent>;
  } catch {
    return null;
  }
}

async function loadFromSupabase(): Promise<Partial<SiteContent> | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return null;

  try {
    /** Same credential path as {@link persistSiteContent}: service role bypasses anon/publishable env mismatches. */
    if (process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
      const admin = createServiceRoleClient();
      const { data, error } = await admin
        .from("site_content")
        .select("payload")
        .eq("id", 1)
        .maybeSingle();
      if (!error && data?.payload) {
        return data.payload as Partial<SiteContent>;
      }
    }

    const publicKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!publicKey?.trim()) return null;

    const supabase = createClient(url, publicKey);
    const { data, error } = await supabase
      .from("site_content")
      .select("payload")
      .eq("id", 1)
      .maybeSingle();
    if (error || !data?.payload) return null;
    return data.payload as Partial<SiteContent>;
  } catch {
    return null;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const dbRaw = await loadFromSupabase();
  const dbLayer = nonEmptySiteLayer(dbRaw);

  const cmsFromSupabase =
    !!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() && dbLayer !== null;

  const fileLayer = cmsFromSupabase ? null : await loadFromFile();

  const merged = deepMergeSiteContent(
    DEFAULT_SITE_CONTENT,
    fileLayer,
    dbLayer,
  );
  return siteContentSchema.parse(merged);
}

export async function persistSiteContent(content: SiteContent): Promise<void> {
  const parsed = siteContentSchema.parse(content);

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createServiceRoleClient();
    const { error } = await admin.from("site_content").upsert(
      {
        id: 1,
        payload: parsed,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (error) throw new Error(error.message);
    return;
  }

  await mkdir(join(process.cwd(), "content"), { recursive: true });
  await writeFile(FILE_PATH, `${JSON.stringify(parsed, null, 2)}\n`, "utf-8");
}
