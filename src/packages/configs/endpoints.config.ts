// Relative to apiClient's baseURL (see axios.api.ts / api.env.ts) — works
// unchanged in both internal and external API modes.
export const AUTH_ENDPOINTS = {
  signIn: "/auth/signin",
  signUp: "/auth/signup",
  signOut: "/auth/signout",
  refresh: "/auth/refresh",
  me: "/auth/me",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  updateProfile: "/auth/me",
  oauthUrl: (provider: string) => `/auth/oauth/${provider}/url`,
  oauthCallback: (provider: string) => `/auth/oauth/${provider}/callback`,
} as const;
