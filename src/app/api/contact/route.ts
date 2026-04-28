import { NextResponse } from "next/server";
import { insertContactMessageRecord } from "@/lib/contact/contact-messages-db";
import {
  contactFormPayloadSchema,
  type ContactFormPayload,
} from "@/lib/contact/contact-payload";
import {
  ContactEmailConfigError,
  sendContactEmail,
} from "@/lib/contact/send-contact-email";

const RESEND_SETUP_HINT =
  "If you use onboarding@resend.dev, Resend only delivers to your Resend account email until you verify a sending domain. Set CONTACT_TO_EMAIL accordingly on Vercel, or verify the domain and use CONTACT_FROM_EMAIL on that domain.";

async function recordSubmission(
  body: ContactFormPayload,
  meta: {
    emailSent: boolean;
    devMock: boolean;
    errorDetail: string | null;
  },
): Promise<void> {
  await insertContactMessageRecord({
    name: body.name,
    email: body.email,
    message: body.message,
    emailSent: meta.emailSent,
    devMock: meta.devMock,
    errorDetail: meta.errorDetail,
  });
}

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
    host.startsWith("[::1]:") ||
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "[::1]" ||
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
    const isConfigError = err instanceof ContactEmailConfigError;
    console.error("[contact] Send failed:", detail);

    // Local / dev: don’t block the form when Resend is misconfigured (bad key, unverified domain).
    if (allowMockWithoutResend(req)) {
      console.warn(
        "[contact] Local/dev: returning mock success. Fix Resend (API key, CONTACT_FROM_EMAIL domain, CONTACT_TO_EMAIL). Error was:",
        detail,
      );
      await recordSubmission(body, {
        emailSent: false,
        devMock: true,
        errorDetail: detail,
      });
      return NextResponse.json({
        ok: true,
        dev: true,
        mockReason: detail,
      });
    }

    await recordSubmission(body, {
      emailSent: false,
      devMock: false,
      errorDetail: detail,
    });
    const exposeDetail =
      process.env.NODE_ENV === "development" ||
      process.env.CONTACT_PUBLIC_ERROR_DETAIL === "1";
    return NextResponse.json(
      {
        error: isConfigError
          ? detail
          : "Could not send your message. Please try again later.",
        ...(!isConfigError && exposeDetail ? { detail } : {}),
        ...(!isConfigError ? { hint: RESEND_SETUP_HINT } : {}),
      },
      { status: 503 },
    );
  }

  await recordSubmission(body, {
    emailSent: true,
    devMock: false,
    errorDetail: null,
  });
  return NextResponse.json({ ok: true });
}
