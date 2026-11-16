import { NextResponse } from "next/server";
import { heartbeat, isValidVisitorId, leave } from "@/lib/presence";

export const runtime = "nodejs";

// Ziyaretçi sinyali. sendBeacon text/plain gönderdiği için gövde elle çözülür.
export async function POST(req: Request) {
  let body: { id?: unknown; leave?: unknown } = {};
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (!isValidVisitorId(body.id)) return new NextResponse(null, { status: 400 });
  try {
    if (body.leave) await leave(body.id);
    else await heartbeat(body.id);
  } catch (e) {
    console.error("Ziyaretçi sinyali kaydedilemedi", e);
  }
  return new NextResponse(null, { status: 204 });
}
