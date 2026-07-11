/** Family-only access control (build-plan issue 1). This is APPLICATION-level
 *  auth over the shared family app_state — not per-user Postgres rows — which
 *  matches the app's model (one family space, server-side service-role
 *  access). It exists to keep the app private: no public access, no signup,
 *  and the boys' audio never reachable by a stranger.
 *
 *  Mechanism (owner decision 2026-07-11): a per-person PASSPHRASE proves you
 *  are family; on success we set a signed, httpOnly session cookie naming the
 *  profile + role. Adults will move to email magic-links once a Supabase
 *  email provider is configured (Scott sub-task); until then everyone uses a
 *  passphrase. Passphrases live only in env (AUTH_PASS_<PROFILE>), never in
 *  the repo; the HMAC secret is AUTH_SECRET.
 *
 *  Edge + Node safe: uses Web Crypto (crypto.subtle) + btoa/atob so the same
 *  sign/verify runs in middleware (Edge) and route handlers (Node). */

export const SESSION_COOKIE = "kl_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 90; // 90 days — a family device

export type Role = "boy" | "adult";

interface DoorDef {
  role: Role;
  /** where this door lands after sign-in */
  home: string;
  /** env var holding this profile's passphrase */
  passEnv: string;
}

/** The only accounts that exist. There is no signup path (issue 1 AC). */
export const DOORS: Record<string, DoorDef> = {
  leo: { role: "boy", home: "/play/leo", passEnv: "AUTH_PASS_LEO" },
  isaac: { role: "boy", home: "/play/isaac", passEnv: "AUTH_PASS_ISAAC" },
  manman: { role: "adult", home: "/gm", passEnv: "AUTH_PASS_MANMAN" },
  gm: { role: "adult", home: "/gm", passEnv: "AUTH_PASS_GM" },
};

export interface Session {
  sub: string; // profile id
  role: Role;
  iat: number;
}

const enc = new TextEncoder();

function b64url(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlToStr(s: string): string {
  const pad = s.length % 4 ? "=".repeat(4 - (s.length % 4)) : "";
  return atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64url(new Uint8Array(sig));
}

/** Constant-time string compare — avoids leaking length/prefix via timing. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** true when auth is configured (AUTH_SECRET set). */
export function authConfigured(): boolean {
  return !!process.env.AUTH_SECRET;
}

/** Whether to ENFORCE the gate. Fail-closed in production: if a prod deploy
 *  has no AUTH_SECRET, enforcement is on but no session can verify, so the app
 *  is LOCKED rather than wide open (the safe failure). Local dev stays open
 *  when unconfigured. (Set AUTH_SECRET before deploying prod or it locks.) */
export function authEnforced(): boolean {
  return !!process.env.AUTH_SECRET || process.env.NODE_ENV === "production";
}

export async function signSession(sub: string, role: Role): Promise<string> {
  const secret = process.env.AUTH_SECRET as string;
  const payload = b64url(enc.encode(JSON.stringify({ sub, role, iat: Date.now() })));
  const sig = await hmac(secret, payload);
  return `${payload}.${sig}`;
}

export async function verifySession(token: string | undefined): Promise<Session | null> {
  if (!token) return null;
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmac(secret, payload);
  if (!timingSafeEqual(sig, expected)) return null;
  try {
    const obj = JSON.parse(b64urlToStr(payload)) as Session;
    if (!obj.sub || !DOORS[obj.sub]) return null;
    return obj;
  } catch {
    return null;
  }
}

/** Pure authorization predicates (testable without a request context). A boy
 *  acts only as himself; an adult may act on a boy's behalf. */
export function sessionCanActAs(s: Session | null, boy: string): boolean {
  return !!s && (s.sub === boy || s.role === "adult");
}
export function sessionIsAdult(s: Session | null): boolean {
  return !!s && s.role === "adult";
}

/** Verify a submitted passphrase for a door against its env var. Returns the
 *  door (with role + home) on success, null otherwise. Constant-time. */
export function checkPassphrase(
  profile: string,
  passphrase: string,
): DoorDef | null {
  const door = DOORS[profile];
  if (!door) return null;
  const expected = process.env[door.passEnv];
  if (!expected) return null;
  if (!timingSafeEqual(passphrase, expected)) return null;
  return door;
}
