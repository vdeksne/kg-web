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

  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const admin = createServiceRoleClient();
      const path = `cms/${randomUUID()}.${ext}`;
      const { error } = await admin.storage.from("cms").upload(path, buf, {
        contentType: file.type,
        upsert: true,
      });
      if (error) throw error;
      const { data: pub } = admin.storage.from("cms").getPublicUrl(path);
      return NextResponse.json({ url: pub.publicUrl });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Upload failed";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  const dir = join(process.cwd(), "public", "uploads", "cms");
  await mkdir(dir, { recursive: true });
  const name = `${randomUUID()}.${ext}`;
  const diskPath = join(dir, name);
  await writeFile(diskPath, buf);
  const url = `/uploads/cms/${name}`;
  return NextResponse.json({ url });
}
