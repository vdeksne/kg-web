/**
 * Push local CMS JSON to Supabase `site_content` (validated + merged with defaults).
 * Do not paste site-content.json into the SQL editor — use this script or the admin UI.
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY
 * in .env and/or .env.local (both files are read; .env.local overrides .env).
 *
 *   npx tsx scripts/seed-supabase-site-content.ts
 */

import { readFileSync } from "fs";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_SITE_CONTENT } from "../src/lib/site-content/defaults";
import { deepMergeSiteContent } from "../src/lib/site-content/merge";
import { siteContentSchema } from "../src/lib/site-content/types";
import type { SiteContent } from "../src/lib/site-content/types";

function applyEnvFile(relativePath: string) {
  const envPath = join(process.cwd(), relativePath);
  const raw = readFileSync(envPath, "utf8").replace(/^\uFEFF/, "");
  for (const line of raw.split(/\r?\n/)) {
    let t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (t.startsWith("export ")) t = t.slice(7).trim();
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (key) process.env[key] = val;
  }
}

function loadEnvFromFiles() {
  for (const name of [".env", ".env.local"]) {
    try {
      applyEnvFile(name);
    } catch {
      /* file missing is fine */
    }
  }
}

loadEnvFromFiles();

const url = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL ??
  ""
).trim();
const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

if (!url || !key) {
  console.error(
    "Missing Supabase env for seeding. Set non-empty values in .env and/or .env.local:",
  );
  console.error(
    "  NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) — project URL from Supabase → Settings → API",
  );
  console.error(
    "  SUPABASE_SERVICE_ROLE_KEY — secret service_role key (never expose to the browser)",
  );
  process.exit(1);
}

const filePath = join(process.cwd(), "content/site-content.json");
let fileLayer: Partial<SiteContent> | null = null;
try {
  fileLayer = JSON.parse(readFileSync(filePath, "utf8")) as Partial<SiteContent>;
} catch (e) {
  console.error("Could not read content/site-content.json:", e);
  process.exit(1);
}

const merged = deepMergeSiteContent(DEFAULT_SITE_CONTENT, fileLayer);
const parsed = siteContentSchema.parse(merged);

async function main() {
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("site_content").upsert(
    {
      id: 1,
      payload: parsed,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("Supabase upsert failed:", error.message);
    process.exit(1);
  }

  console.log(
    "Seeded site_content id=1 from content/site-content.json (validated).",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
