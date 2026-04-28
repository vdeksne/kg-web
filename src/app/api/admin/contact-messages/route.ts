import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { listContactMessagesForAdmin } from "@/lib/contact/contact-messages-db";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await listContactMessagesForAdmin();
  if (!result.configured) {
    return NextResponse.json({
      persistenceConfigured: false,
      rows: [],
    });
  }
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json({
    persistenceConfigured: true,
    rows: result.rows,
  });
}
