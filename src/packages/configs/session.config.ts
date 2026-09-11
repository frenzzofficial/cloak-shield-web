// ============================================================
// The httpOnly refresh-token cookie name. Middleware can only check
// for its *presence* (httpOnly blocks client JS from reading it, not
// server-side/edge code) — it's a fast, no-network route guard, not a
// substitute for real auth. The actual session is only ever verified
// by the backend (via `refreshSession()` / `getMe()`, both real API
// calls) — this just decides whether to bother rendering a protected
// page at all, or redirect straight to /signin.
//
// In "internal" API mode, a Next.js Route Handler on this same origin
// sets this cookie. In "external" mode, the separate backend sets it
// with `SameSite=None; Secure` — this name must match whatever the
// backend actually issues.
// ============================================================
export const SESSION_COOKIE_NAME = "cs_refresh_token";
