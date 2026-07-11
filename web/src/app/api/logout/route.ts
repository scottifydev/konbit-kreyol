import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

/** POST — leave the network. Clears the session cookie. */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
