import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deleteContactMessageForAdmin } from "@/lib/contact/contact-messages-db";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const result = await deleteContactMessageForAdmin(id);
  if (result.ok) {
    return NextResponse.json({ ok: true });
  }
  if (result.notConfigured) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }
  if (result.badRequest) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  if (result.notFound) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json({ error: result.error }, { status: 500 });
}
