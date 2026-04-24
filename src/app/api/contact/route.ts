import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  /* Wire to Supabase, Resend, or Stripe Customer — env-gated in production */
  return NextResponse.json({ ok: true });
}
