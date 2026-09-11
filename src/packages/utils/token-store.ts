// ============================================================
// Access-token store
// ------------------------------------------------------------
// The access token is kept in memory only — never localStorage,
// never a JS-readable cookie. It's lost on a full page reload by
// design; `AuthProvider` calls `refreshSession()` on mount to get a
// new one from the httpOnly refresh-token cookie, which is the only
// piece of the session that persists across reloads.
//
// This lives outside React so the axios interceptor (which runs
// completely outside the component tree) and `AuthProvider` share a
// single source of truth without prop-drilling a token through every
// api call.
// ============================================================

let accessToken: string | null = null;

type Listener = (token: string | null) => void;
const listeners = new Set<Listener>();

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
  for (const listener of listeners) listener(accessToken);
};

export const clearAccessToken = (): void => setAccessToken(null);

/** Lets AuthProvider mirror the token into React state without owning it. */
export const subscribeToAccessToken = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
