import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  authConfigured,
  checkPassphrase,
  signSession,
} from "@/lib/auth";

/** POST { profile, passphrase } — prove you are family. On success, set the
 *  signed session cookie and return the door's home. Constant-time compare;
 *  a wrong passphrase reveals nothing about which part was wrong. No signup. */
export async function POST(req: NextRequest) {
  // When auth is unconfigured (dev), any door lands open.
  if (!authConfigured()) {
    const { profile } = await req.json().catch(() => ({}));
    const home =
      profile === "manman" || profile === "gm" ? "/gm" : `/play/${profile}`;
    return NextResponse.json({ ok: true, href: home });
  }

  const { profile, passphrase } = await req.json().catch(() => ({}));
  if (typeof profile !== "string" || typeof passphrase !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const door = checkPassphrase(profile, passphrase);
  if (!door) {
    return NextResponse.json({ ok: false, error: "no-match" }, { status: 401 });
  }
  const token = await signSession(profile, door.role);
  const res = NextResponse.json({ ok: true, href: door.home });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
