import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME } from "@/packages/configs/session.config";
import { safeRedirectPath } from "@/packages/utils/safe-redirect";

// Pages only for signed-out visitors. `/reset-password` and `/verify-email` are left out on
// purpose: they are opened from an emailed link whatever the current session is.
const GUEST_ONLY_ROUTES = ["/signin", "/signup", "/forgot-password"];

const matches = (pathname: string, routes: string[]) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

/**
 * Next 16 runs this file (`src/proxy.ts`, exporting `proxy`) before matching routes. It sends
 * a visitor who already has a session cookie away from /signin, /signup and
 * /forgot-password, to `?next=` when that is a safe same-site path and /dashboard otherwise.
 *
 * Signed-out protection for /dashboard is NOT done here, see session.config.ts: the access
 * cookie expires every ~15 minutes while the session lives on, so redirecting on its absence
 * would sign people out on reload. (protected)/layout.tsx covers it after a refresh attempt.
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const hasSessionCookie = Boolean(
    request.cookies.get(ACCESS_COOKIE_NAME)?.value,
  );

  if (hasSessionCookie && matches(pathname, GUEST_ONLY_ROUTES)) {
    const url = request.nextUrl.clone();
    url.pathname = safeRedirectPath(searchParams.get("next"));
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/forgot-password"],
};
