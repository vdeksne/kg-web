import { Resend } from "resend";

const DEFAULT_TO = "info@kasparsgroza.lv";

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
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!from) {
    throw new Error("CONTACT_FROM_EMAIL is not configured");
  }

  const rawTo = process.env.CONTACT_TO_EMAIL;
  const to =
    rawTo != null && rawTo.trim() !== ""
      ? rawTo
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [DEFAULT_TO];

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Portfolio contact — ${data.name}`,
    replyTo: data.email,
    html: buildHtml(data),
    text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
  });

  if (error) {
    throw new Error(error.message);
  }
}
