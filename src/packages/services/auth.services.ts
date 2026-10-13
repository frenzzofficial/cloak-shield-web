import { apiClient, apiEnvConfig } from "@/packages/api/axios.api";
import { AUTH_ENDPOINTS } from "@/packages/configs/endpoints.config";
import type {
  AuthProviderInfo,
  AuthResponse,
  ChangePasswordRequestBody,
  ChangePasswordResponse,
  ForgotPasswordRequestBody,
  MeResponse,
  ProvidersResponse,
  ResetPasswordRequestBody,
  SigninRequestBody,
  SignupRequestBody,
  SuccessResponse,
  User,
} from "@/types/auth";

// ============================================================
// Auth services
// ------------------------------------------------------------
// Thin wrappers around `apiClient`, which handles the CSRF header and 401 → refresh → retry
// (see packages/api/axios/interceptor.axios.ts). There is no token to store: signing in sets
// httpOnly cookies, and the browser sends them on every later request.
//
// Bodies are built field by field so nothing the backend does not expect (confirmPassword on
// sign-up, agreeToTerms, ...) is ever sent by accident.
// ============================================================

export const signIn = async (
  credentials: SigninRequestBody,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.signIn, {
    email: credentials.email,
    password: credentials.password,
    remember: Boolean(credentials.remember),
  });
  return data;
};

export const signUp = async (
  credentials: SignupRequestBody,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(AUTH_ENDPOINTS.signUp, {
    fullname: credentials.fullname,
    email: credentials.email,
    password: credentials.password,
  });
  return data;
};

export const signOut = async (): Promise<void> => {
  // The server clears the cookies. A failed call (offline, backend down) is not fatal: the
  // caller still treats the user as signed out locally.
  await apiClient.post(AUTH_ENDPOINTS.signOut);
};

/**
 * Who is signed in right now — `null` when nobody is. Used once by AuthProvider on mount to
 * restore a session after a full page reload. A 401 is first retried through the refresh
 * cookie by the interceptor; `skipAuthRedirect` keeps a signed-out visitor on a public page
 * instead of bouncing them to /signin.
 */
export const getMe = async (): Promise<User | null> => {
  try {
    const { data } = await apiClient.get<MeResponse>(AUTH_ENDPOINTS.me, {
      skipAuthRedirect: true,
    });
    return data.user;
  } catch {
    return null;
  }
};

export const verifyEmail = async (token: string): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.verifyEmail,
    { token },
  );
  return data;
};

export const resendVerification = async (
  email: string,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.resendVerification,
    { email },
  );
  return data;
};

export const forgotPassword = async (
  body: ForgotPasswordRequestBody,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.forgotPassword,
    { email: body.email },
  );
  return data;
};

export const resetPassword = async (
  body: ResetPasswordRequestBody,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.resetPassword,
    {
      token: body.token,
      password: body.password,
      confirmPassword: body.confirmPassword,
    },
  );
  return data;
};

// ─── Sign in with a provider (Google, and Discord once the backend has it) ──

/** The sign-in methods the server has switched on, so the UI only draws working buttons. */
export const getOAuthProviders = async (): Promise<AuthProviderInfo[]> => {
  const { data } = await apiClient.get<ProvidersResponse>(
    AUTH_ENDPOINTS.providers,
  );
  return data.providers.filter(
    (provider) => provider.kind === "oauth" && provider.startPath,
  );
};

/**
 * A provider sign-in is a full-page navigation, not an API call: the browser goes to the
 * backend, which redirects to Google, which redirects back to the backend, which finally
 * redirects to this app's /auth/callback page. `next` is where to land afterwards.
 */
export const startOAuthSignIn = (
  provider: AuthProviderInfo,
  next?: string | null,
): void => {
  if (typeof window === "undefined" || !provider.startPath) return;

  const url = new URL(
    provider.startPath,
    apiEnvConfig.API_ORIGIN || window.location.origin,
  );
  if (next?.startsWith("/") && !next.startsWith("//")) {
    url.searchParams.set("redirect", next);
  }
  window.location.assign(url.toString());
};

/**
 * Signed-in password change. The backend checks the current password (accounts without one,
 * such as Google-only accounts, send none and need a recent sign-in instead), ends every OTHER
 * session, and emails a notice. This device stays signed in.
 */
export const changePassword = async (
  body: ChangePasswordRequestBody,
): Promise<ChangePasswordResponse> => {
  const { data } = await apiClient.post<ChangePasswordResponse>(
    AUTH_ENDPOINTS.changePassword,
    {
      ...(body.currentPassword
        ? { currentPassword: body.currentPassword }
        : {}),
      newPassword: body.newPassword,
      confirmPassword: body.confirmPassword,
    },
  );
  return data;
};
