import { apiClient } from "@/packages/api/axios.api";
import { AUTH_ENDPOINTS } from "@/packages/configs/endpoints.config";
import { clearAccessToken, setAccessToken } from "@/packages/utils/token-store";
import type {
  AuthResponse,
  ForgotPasswordRequestBody,
  ResetPasswordRequestBody,
  SigninRequestBody,
  SignupRequestBody,
  SuccessResponse,
  User,
} from "@/types/auth";

// ============================================================
// Auth services
// ------------------------------------------------------------
// Thin wrappers around `apiClient` — every call here goes through
// the shared axios instance (packages/api/axios.api.ts), so it
// automatically respects the internal/external base URL switch and
// the auth interceptor (token attach + 401 refresh).
//
// Whichever real backend this eventually talks to, these are the 9
// contracts it needs to satisfy. Response shapes follow
// `types/auth.d.ts`, which already documents the expected flat
// (non-`data`-wrapped) auth response shape.
// ============================================================

export const signIn = async (
  credentials: SigninRequestBody,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    AUTH_ENDPOINTS.signIn,
    credentials,
  );
  if (data.access_token) setAccessToken(data.access_token);
  return data;
};

export const signUp = async (
  credentials: SignupRequestBody,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    AUTH_ENDPOINTS.signUp,
    credentials,
  );
  if (data.access_token) setAccessToken(data.access_token);
  return data;
};

export const signOut = async (): Promise<void> => {
  try {
    await apiClient.post(AUTH_ENDPOINTS.signOut);
  } finally {
    // Always clear the local token, even if the network call failed
    // (offline, backend down, etc.) — the user asked to sign out, so
    // the client should behave signed-out regardless.
    clearAccessToken();
  }
};

/**
 * Attempts a silent refresh using the httpOnly refresh-token cookie.
 * Called once by AuthProvider on mount to restore a session after a
 * full page reload (the in-memory access token doesn't survive one).
 * Resolves `null` — never throws — when there's no valid session, so
 * callers can treat "not logged in" as a normal, expected outcome.
 */
export const refreshSession = async (): Promise<{
  access_token: string;
} | null> => {
  try {
    const { data } = await apiClient.post<{ access_token?: string }>(
      AUTH_ENDPOINTS.refresh,
    );
    if (!data.access_token) return null;
    setAccessToken(data.access_token);
    return { access_token: data.access_token };
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  const { data } = await apiClient.get<SuccessResponse<User> | User>(
    AUTH_ENDPOINTS.me,
  );
  // Tolerate either a flat User or a { success, data: User } envelope —
  // whichever the real backend ends up using.
  return "data" in data && data.data ? data.data : (data as User);
};

export const forgotPassword = async (
  body: ForgotPasswordRequestBody,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.forgotPassword,
    body,
  );
  return data;
};

export const resetPassword = async (
  body: ResetPasswordRequestBody,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.resetPassword,
    body,
  );
  return data;
};

export const updateProfile = async (
  body: Partial<Pick<User, "fullname" | "email">> & { phone?: string },
): Promise<User> => {
  const { data } = await apiClient.patch<SuccessResponse<User> | User>(
    AUTH_ENDPOINTS.updateProfile,
    body,
  );
  return "data" in data && data.data ? data.data : (data as User);
};

// ─── OAuth (Google / Discord) ───────────────────────────────────────────────

export type OAuthProvider = "google" | "discord";

/**
 * Step 1 of the OAuth flow: ask the backend for the provider's
 * consent-screen URL (the backend holds the client_id/secret and
 * builds the redirect_uri, e.g. `${origin}/signin-google`), then hard
 * navigate the browser there. This can't go through a fetch/XHR —
 * it's a real top-level navigation to Google/Discord's own domain.
 */
export const redirectToOAuthProvider = async (
  provider: OAuthProvider,
): Promise<void> => {
  const { data } = await apiClient.get<{ url: string }>(
    AUTH_ENDPOINTS.oauthUrl(provider),
  );
  if (typeof window !== "undefined" && data.url) {
    window.location.assign(data.url);
  }
};

/**
 * Step 2: the provider redirects back to `/signin-<provider>?code=...`.
 * That page calls this to exchange the code for a session, the same
 * shape as a normal sign-in.
 */
export const exchangeOAuthCode = async (
  provider: OAuthProvider,
  code: string,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    AUTH_ENDPOINTS.oauthCallback(provider),
    { code },
  );
  if (data.access_token) setAccessToken(data.access_token);
  return data;
};
