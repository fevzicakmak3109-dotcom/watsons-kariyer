import { NextResponse } from "next/server";
import { adminCredentials, createSessionToken, safeEqual, sessionMaxAge, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { username?: string; password?: string };
  const creds = adminCredentials();
  const ok =
    safeEqual(String(body.username ?? ""), creds.username) &&
    safeEqual(String(body.password ?? ""), creds.password);

  if (!ok) {
    await new Promise((r) => setTimeout(r, 600));
    return NextResponse.json({ error: "Kullanıcı adı veya şifre hatalı." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(creds.username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionMaxAge,
  });
  return res;
}
