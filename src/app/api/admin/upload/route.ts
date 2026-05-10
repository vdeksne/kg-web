import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createServiceRoleClient } from "@/lib/supabase/admin";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

/** Vercel serverless has a read-only filesystem except /tmp — local public/ fallback only works off Vercel. */
function canUseLocalDiskFallback(): boolean {
  if (process.env.UPLOAD_DISABLE_LOCAL_FALLBACK === "1") return false;
  return process.env.VERCEL !== "1";
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  const max = 8 * 1024 * 1024;
  if (file.size > max) {
    return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 413 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported type" }, { status: 400 });
  }

  const ext =
    file.type === "image/svg+xml"
      ? "svg"
      : file.type === "image/png"
        ? "png"
        : file.type === "image/webp"
          ? "webp"
          : file.type === "image/gif"
            ? "gif"
            : "jpg";

  const buf = Buffer.from(await file.arrayBuffer());

  async function saveToPublicUploads(): Promise<NextResponse> {
    const dir = join(process.cwd(), "public", "uploads", "cms");
    await mkdir(dir, { recursive: true });
    const name = `${randomUUID()}.${ext}`;
    const diskPath = join(dir, name);
    await writeFile(diskPath, buf);
    const url = `/uploads/cms/${name}`;
    return NextResponse.json({ url, storage: "local" as const });
  }

  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const admin = createServiceRoleClient();
      const path = `${randomUUID()}.${ext}`;
      const { error } = await admin.storage.from("cms").upload(path, buf, {
        contentType: file.type,
        upsert: true,
      });
      if (error) throw error;
      const { data: pub } = admin.storage.from("cms").getPublicUrl(path);
      return NextResponse.json({ url: pub.publicUrl, storage: "supabase" as const });
    } catch (e) {
      const message =
        e instanceof Error ? e.message : typeof e === "object" && e && "message" in e
          ? String((e as { message: unknown }).message)
          : "Upload failed";
      console.error("[api/admin/upload] Supabase storage failed:", e);

      if (canUseLocalDiskFallback()) {
        console.warn(
          "[api/admin/upload] Saving to public/uploads/cms (Supabase bucket \"cms\" missing or misconfigured).",
        );
        try {
          return await saveToPublicUploads();
        } catch (diskErr) {
          console.error("[api/admin/upload] Local fallback failed:", diskErr);
          return NextResponse.json(
            {
              error:
                diskErr instanceof Error ? diskErr.message : "Local upload failed",
            },
            { status: 500 },
          );
        }
      }

      return NextResponse.json(
        {
          error: message,
          hint:
            'In Supabase: create a public storage bucket named "cms" (see supabase/migrations/003_storage_cms_bucket.sql) or rely on local "public/uploads" only when not deployed on Vercel.',
        },
        { status: 500 },
      );
    }
  }

  return saveToPublicUploads();
}
