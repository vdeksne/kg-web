import { Resend } from "resend";

const DEFAULT_TO = "info@kasparsgroza.lv";

/** Thrown for server/env misconfiguration — safe to show the message to operators debugging the deploy. */
export class ContactEmailConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactEmailConfigError";
  }
}

/** Env files sometimes wrap or break lines; Resend rejects addr-spec with CR/LF. */
function normalizeMailHeaderValue(value: string): string {
  return value
    .replace(/[\r\n]+/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Domains Resend will not send *from* without verifying that domain in Resend (not your inbox). */
const BLOCKED_FROM_DOMAINS = new Set(
  [
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "yahoo.co.uk",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "msn.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "aol.com",
    "proton.me",
    "protonmail.com",
  ].map((d) => d.toLowerCase()),
);

function domainFromFromHeader(from: string): string | null {
  const trimmed = from.trim();
  const angle = trimmed.match(/<([^>]+)>/);
  const addr = (angle ? angle[1] : trimmed).trim();
  const at = addr.lastIndexOf("@");
  if (at < 1 || at === addr.length - 1) return null;
  return addr.slice(at + 1).toLowerCase();
}

function assertResendCompatibleFrom(from: string): void {
  const domain = domainFromFromHeader(from);
  if (!domain) {
    throw new ContactEmailConfigError(
      'CONTACT_FROM_EMAIL must be a valid address (e.g. onboarding@resend.dev or "Site <hello@yourdomain.com>").',
    );
  }
  if (domain.endsWith("resend.dev")) return;
  if (BLOCKED_FROM_DOMAINS.has(domain)) {
    throw new Error(
      `CONTACT_FROM_EMAIL cannot use @${domain} as the sender. Resend only sends from domains you verify at resend.com, or use onboarding@resend.dev for testing. Reply-To will still be the visitor’s email.`,
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(data: {
  name: string;
  email: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, sans-serif; line-height: 1.5; color: #111;">
  <h2 style="margin-top: 0;">New message from the website</h2>
  <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
  <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
  <p><strong>Message:</strong></p>
  <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
</body>
</html>`.trim();
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL
    ? normalizeMailHeaderValue(process.env.CONTACT_FROM_EMAIL)
    : "";

  if (!apiKey) {
    throw new ContactEmailConfigError("RESEND_API_KEY is not configured");
  }
  if (!from) {
    throw new ContactEmailConfigError("CONTACT_FROM_EMAIL is not configured");
  }

  assertResendCompatibleFrom(from);

  const fromDomain = domainFromFromHeader(from);
  const rawTo = process.env.CONTACT_TO_EMAIL;
  const hasExplicitTo = rawTo != null && rawTo.trim() !== "";

  if (fromDomain?.endsWith("resend.dev") && !hasExplicitTo) {
    throw new ContactEmailConfigError(
      "CONTACT_TO_EMAIL is required when CONTACT_FROM_EMAIL uses @resend.dev. Set it to the inbox you used to sign up at resend.com, or verify your domain in Resend and send from an address on that domain (then you can use the default recipient).",
    );
  }

  const to = hasExplicitTo
    ? rawTo
        .split(",")
        .map((s) => normalizeMailHeaderValue(s))
        .filter(Boolean)
    : [DEFAULT_TO];

  const replyTo = normalizeMailHeaderValue(data.email);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Portfolio | Contact | ${data.name}`,
    replyTo,
    html: buildHtml(data),
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
