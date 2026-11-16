import { NextResponse } from "next/server";
import { countActive } from "@/lib/presence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json({ active: await countActive() }, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("Aktif ziyaretçi sayılamadı", e);
    return NextResponse.json({ error: "Sayılamadı" }, { status: 500 });
  }
}
