import { NextResponse } from "next/server";
import {
  contactFormPayloadSchema,
  type ContactFormPayload,
} from "@/lib/contact/contact-payload";
import { sendContactEmail } from "@/lib/contact/send-contact-email";

function isConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() && process.env.CONTACT_FROM_EMAIL?.trim(),
  );
}

/** `next dev` only; `next start` uses NODE_ENV=production. */
function isLocalRequest(req: Request): boolean {
  const host = (req.headers.get("host") ?? "").toLowerCase();
  return (
    host.startsWith("localhost:") ||
    host.startsWith("127.0.0.1:") ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".local")
  );
}

function allowMockWithoutResend(req: Request): boolean {
  if (process.env.NODE_ENV === "development") return true;
  if (process.env.CONTACT_ALLOW_MOCK_WITHOUT_RESEND === "1") return true;
  if (isLocalRequest(req)) return true;
  return false;
}

export async function POST(req: Request) {
  const raw = await req.json().catch(() => null);
  const parsed = contactFormPayloadSchema.safeParse(raw);

  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid data";
    return NextResponse.json({ error: first }, { status: 400 });
  }

  const body: ContactFormPayload = parsed.data;

  if (!isConfigured()) {
    if (allowMockWithoutResend(req)) {
      console.warn(
        "[contact] Resend not configured — email not sent. Set RESEND_API_KEY and CONTACT_FROM_EMAIL in .env.local (see .env.example). Payload:",
        body,
      );
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error(
      "[contact] Missing RESEND_API_KEY or CONTACT_FROM_EMAIL — see .env.example",
    );
    return NextResponse.json(
      { error: "Contact form is not configured on the server." },
      { status: 503 },
    );
  }

  try {
    await sendContactEmail(body);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[contact] Send failed:", detail);
    // Resend misconfiguration (domain, from address, API key) — check Vercel env and Resend dashboard.
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
