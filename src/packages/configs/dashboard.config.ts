import { apiClient } from "@/packages/api/axios.api";

// ============================================================
// Dashboard data
// ------------------------------------------------------------
// Read-only calls to routes the backend already has — nothing here changes the API or the
// database. The signed-in user comes from AuthProvider; this adds the two lists the page shows.
// ============================================================

const EMAIL_AUTH = "/v1/auth/email";

export interface DeviceSession {
  id: string;
  deviceName: string | null;
  platform: string | null;
  browser: string | null;
  os: string | null;
  lastSeenAt: string;
  createdAt: string;
  current: boolean;
}

export interface ActivityEntry {
  id: string;
  event: string;
  outcome: "SUCCESS" | "FAILURE";
  deviceName: string | null;
  createdAt: string;
}

export const getSessions = async (): Promise<DeviceSession[]> => {
  const { data } = await apiClient.get<{ sessions: DeviceSession[] }>(
    `${EMAIL_AUTH}/sessions`,
  );
  // An unexpected body must read as "unavailable" in the UI, never crash the whole page.
  if (!Array.isArray(data.sessions))
    throw new Error("Unexpected sessions response");
  return data.sessions;
};

export const getActivity = async (limit = 6): Promise<ActivityEntry[]> => {
  const { data } = await apiClient.get<{ activity: ActivityEntry[] }>(
    `${EMAIL_AUTH}/activity`,
    { params: { limit } },
  );
  if (!Array.isArray(data.activity))
    throw new Error("Unexpected activity response");
  return data.activity;
};

// ─── Presentation helpers ────────────────────────────────────────────────────

const EVENT_LABELS: Record<string, string> = {
  SIGN_UP: "Account created",
  SIGN_IN_SUCCESS: "Signed in",
  SIGN_IN_FAILURE: "Failed sign-in attempt",
  ACCOUNT_LOCKED: "Account temporarily locked",
  SIGN_OUT: "Signed out",
  REFRESH_REUSE_DETECTED: "Session ended: token reuse detected",
  REAUTH_FAILURE: "Re-authentication failed",
  EMAIL_VERIFIED: "Email verified",
  PASSWORD_RESET_REQUESTED: "Password reset requested",
  PASSWORD_RESET_COMPLETED: "Password reset",
  PASSWORD_CHANGED: "Password changed",
  EMAIL_CHANGE_REQUESTED: "Email change requested",
  EMAIL_CHANGED: "Email address changed",
  SESSION_REVOKED: "A device was signed out",
  OTHER_SESSIONS_REVOKED: "Other devices signed out",
  PROFILE_UPDATED: "Profile updated",
  PREFERENCES_UPDATED: "Preferences updated",
  OAUTH_ACCOUNT_LINKED: "Sign-in provider linked",
  ACCOUNT_RECLAIMED: "Account reclaimed",
};

export const eventLabel = (event: string): string =>
  EVENT_LABELS[event] ??
  event.charAt(0) + event.slice(1).toLowerCase().replaceAll("_", " ");

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "just now", "2 minutes ago", "yesterday" ... for an ISO timestamp. */
export const timeAgo = (iso: string, now = Date.now()): string => {
  const seconds = Math.round((new Date(iso).getTime() - now) / 1000);
  if (Math.abs(seconds) < 45) return "just now";
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) {
      return relative.format(Math.round(seconds / size), unit);
    }
  }
  return relative.format(Math.round(seconds / 60), "minute");
};

export const STATUS_LABELS: Record<string, { label: string; ok: boolean }> = {
  ACTIVE: { label: "Active", ok: true },
  PENDING_VERIFICATION: { label: "Unverified", ok: false },
  SUSPENDED: { label: "Suspended", ok: false },
  DEACTIVATED: { label: "Deactivated", ok: false },
};
