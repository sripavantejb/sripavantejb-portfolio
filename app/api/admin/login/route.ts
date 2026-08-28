import { NextResponse } from "next/server";
import { getAdminEnvStatus } from "@/lib/adminEnv";
import { ADMIN_COOKIE, createSessionToken, verifyPassword } from "@/lib/adminAuth";

export async function POST(request: Request) {
  const env = getAdminEnvStatus();
  if (!env.ok) {
    return NextResponse.json(
      { error: `Server missing env: ${env.missing.join(", ")}` },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!password || !(await verifyPassword(password))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const session = await createSessionToken();
  if (!session) {
    return NextResponse.json({ error: "Could not create session" }, { status: 503 });
  }

  const { token, maxAge } = session;
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return response;
}
