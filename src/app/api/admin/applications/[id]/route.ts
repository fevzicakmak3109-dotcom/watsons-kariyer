import { NextResponse } from "next/server";
import { deleteApplication, updateApplication } from "@/lib/storage";
import { STATUSES, type StatusId } from "@/lib/types";
import { BUSINESS_LINES, GENERAL_LINE } from "@/lib/positions";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { status?: string; notes?: string; businessLine?: string; called?: unknown };
  const patch: { status?: StatusId; notes?: string; businessLine?: string; called?: boolean } = {};
  if (body.status !== undefined) {
    if (!STATUSES.some((s) => s.id === body.status))
      return NextResponse.json({ error: "Geçersiz durum" }, { status: 400 });
    patch.status = body.status as StatusId;
  }
  if (body.businessLine !== undefined) {
    if (body.businessLine !== GENERAL_LINE && !BUSINESS_LINES.some((b) => b.id === body.businessLine))
      return NextResponse.json({ error: "Geçersiz iş kolu" }, { status: 400 });
    patch.businessLine = body.businessLine;
  }
  if (body.called !== undefined) {
    if (typeof body.called !== "boolean") return NextResponse.json({ error: "Geçersiz değer" }, { status: 400 });
    patch.called = body.called;
  }
  if (body.notes !== undefined) patch.notes = String(body.notes).slice(0, 2000);
  const updated = await updateApplication(id, patch);
  if (!updated) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json({ item: updated });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  const ok = await deleteApplication(id);
  return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
}
