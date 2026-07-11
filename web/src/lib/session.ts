import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  authEnforced,
  sessionCanActAs,
  sessionIsAdult,
  verifySession,
  type Session,
} from "./auth";

/** Server-side session guards for route handlers (build-plan issue 1). The
 *  middleware only proves a valid session EXISTS; these bind the identity to
 *  the action, so a boy's session can't drive an adult surface (self-publishing
 *  Kreyòl past the native gate) and a boy can only write his own data.
 *
 *  When auth isn't enforced (local dev, unconfigured), guards pass — the app
 *  runs open there, same as the middleware. */

export async function currentSession(): Promise<Session | null> {
  const jar = await cookies();
  return verifySession(jar.get(SESSION_COOKIE)?.value);
}

/** Returns a 401/403 response if the guard fails, or null to proceed. */
export async function guardBoy(boy: string): Promise<NextResponse | null> {
  if (!authEnforced()) return null;
  if (!sessionCanActAs(await currentSession(), boy)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  return null;
}

export async function guardAdult(): Promise<NextResponse | null> {
  if (!authEnforced()) return null;
  if (!sessionIsAdult(await currentSession())) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }
  return null;
}

/** Boolean form of guardBoy for use INSIDE a transaction mutator (where the
 *  identity to check — e.g. a dispatch's receiver — is only known after
 *  reading state). Throw HttpError(401) on false. */
export async function sessionAllows(boy: string): Promise<boolean> {
  if (!authEnforced()) return true;
  return sessionCanActAs(await currentSession(), boy);
}

/** Any authenticated family member (used for private audio). */
export async function guardFamily(): Promise<NextResponse | null> {
  if (!authEnforced()) return null;
  const s = await currentSession();
  if (!s) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  return null;
}
