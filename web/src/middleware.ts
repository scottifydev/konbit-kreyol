import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, authConfigured, verifySession } from "@/lib/auth";

/** Family-only gate. When AUTH_SECRET is unset the app runs open (local dev /
 *  an unconfigured deploy). When configured, every route except the gate
 *  itself and the auth endpoints requires a valid session cookie; anything
 *  else redirects to the gate (`/`). API routes get a 401 instead of a
 *  redirect. There is no signup path — accounts are the four fixed doors. */

// Public surfaces: the gate is the sign-in; these must be reachable signed-out.
const PUBLIC_PATHS = new Set(["/", "/api/login", "/api/logout"]);

export async function middleware(req: NextRequest) {
  if (!authConfigured()) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  const session = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  const url = req.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

/** Skip static assets and image files; everything else runs the gate. */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|art/|.*\\.(?:webp|png|jpg|jpeg|svg|ico|woff|woff2)$).*)",
  ],
};
