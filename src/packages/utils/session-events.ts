// ============================================================
// Session events
// ------------------------------------------------------------
// The session itself lives in httpOnly cookies the browser manages, so there is no token for
// JS to hold. What JS does need to know is "the session just ended" — the axios interceptor
// (outside React) detects it, and AuthProvider (inside React) reacts to it.
// ============================================================

type Listener = () => void;
const listeners = new Set<Listener>();

export const emitSessionExpired = (): void => {
  for (const listener of listeners) listener();
};

export const onSessionExpired = (listener: Listener): (() => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
