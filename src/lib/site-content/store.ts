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
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  try {
    const supabase = createClient(url, key);
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
  const fileLayer = await loadFromFile();
  const dbLayer = await loadFromSupabase();
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
