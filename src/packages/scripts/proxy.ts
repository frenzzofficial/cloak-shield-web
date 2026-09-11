import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/packages/configs/session.config";

const AUTH_ONLY_ROUTES = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/reset-password",
];
const PROTECTED_ROUTES = ["/dashboard"];

const matches = (pathname: string, routes: string[]) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

/**
 * Fast, cookie-presence-only route guard — see session.config.ts for
 * why this is not itself an auth check. Redirects:
 *   - signed-out visitors away from /dashboard → /signin?next=...
 *   - signed-in visitors away from /signin, /signup, etc. → /dashboard
 *
 * /reset-password is intentionally exempt from the "signed-out only"
 * bounce logic below since it's reachable via an emailed link
 * regardless of current session state.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSessionCookie = Boolean(
    request.cookies.get(SESSION_COOKIE_NAME)?.value,
  );

  if (matches(pathname, PROTECTED_ROUTES) && !hasSessionCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/signin";
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  if (
    matches(pathname, AUTH_ONLY_ROUTES) &&
    hasSessionCookie &&
    !pathname.startsWith("/reset-password")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password/:path*",
  ],
};
