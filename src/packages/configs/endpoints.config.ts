// Relative to apiClient's baseURL (see axios.api.ts / api.env.ts), which ends at `/api`.
// These mirror the backend's versioned routes: /api/v1/auth/email/*, /api/v1/csrf, ...
const V1 = "/v1";
const EMAIL = `${V1}/auth/email`;

export const AUTH_ENDPOINTS = {
  csrf: `${V1}/csrf`,
  providers: `${V1}/auth/providers`,
  signIn: `${EMAIL}/signin`,
  signUp: `${EMAIL}/signup`,
  signOut: `${EMAIL}/signout`,
  refresh: `${EMAIL}/refresh`,
  me: `${EMAIL}/me`,
  verifyEmail: `${EMAIL}/verify-email`,
  resendVerification: `${EMAIL}/resend-verification`,
  forgotPassword: `${EMAIL}/forgot-password`,
  resetPassword: `${EMAIL}/reset-password`,
  changePassword: `${EMAIL}/change-password`,
  changeEmail: `${EMAIL}/change-email`,
  confirmEmailChange: `${EMAIL}/confirm-email-change`,
  profile: `${V1}/account/profile`,
  deleteAccount: `${V1}/account/delete`,
  preferences: `${V1}/account/preferences`,
} as const;
