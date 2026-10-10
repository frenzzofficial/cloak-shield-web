// ============================================================
// The backend's httpOnly access-token cookie (Path `/`, lives as long as the access token,
// about 15 minutes). The route guard in `src/proxy.ts` can only check its *presence*: it is
// a fast, no-network hint that the visitor probably has a session, never proof of one. The
// real check is always the backend, via `getMe()` in AuthProvider.
//
// The refresh cookie is deliberately NOT used here: it is scoped to the auth API path, so the
// browser never sends it with page requests. That is also why a missing access cookie does
// not prove the visitor is signed out (the refresh cookie may still renew it), and why the
// guard only redirects signed-IN visitors away from the auth pages and leaves signed-out
// protection to the client layout, which refreshes first.
//
// This name must match ACCESS_COOKIE in the backend (src/packages/middlewares/authenticate.ts).
// ============================================================
export const ACCESS_COOKIE_NAME = "access_token";
