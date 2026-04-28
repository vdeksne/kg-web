import "server-only";

import { createServiceRoleClient } from "@/lib/supabase/admin";

export type ContactMessageRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  email_sent: boolean;
  dev_mock: boolean;
  error_detail: string | null;
};

function truncateDetail(s: string, max = 500): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

export async function insertContactMessageRecord(input: {
  name: string;
  email: string;
  message: string;
  emailSent: boolean;
  devMock: boolean;
  errorDetail: string | null;
}): Promise<void> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) return;
  try {
    const supabase = createServiceRoleClient();
    const detail = input.errorDetail
      ? truncateDetail(input.errorDetail)
      : null;
    const { error } = await supabase.from("contact_messages").insert({
      name: input.name,
      email: input.email,
      message: input.message,
      email_sent: input.emailSent,
      dev_mock: input.devMock,
      error_detail: detail,
    });
    if (error) console.error("[contact-messages] insert failed:", error.message);
  } catch (e) {
    console.error("[contact-messages] insert failed:", e);
  }
}

export async function listContactMessagesForAdmin(
  limit = 200,
): Promise<
  | { configured: true; rows: ContactMessageRow[] }
  | { configured: false }
  | { configured: true; error: string }
> {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    return { configured: false };
  }
  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("contact_messages")
      .select(
        "id, created_at, name, email, message, email_sent, dev_mock, error_detail",
      )
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) return { configured: true, error: error.message };
    return { configured: true, rows: (data ?? []) as ContactMessageRow[] };
  } catch (e) {
    return {
      configured: true,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
