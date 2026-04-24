import { NextResponse } from "next/server";
import {
  assertAdminPassword,
  setAdminSessionCookie,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_TOKEN in .env",
      },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.password || !assertAdminPassword(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  await setAdminSessionCookie();
  return NextResponse.json({ ok: true });
}
