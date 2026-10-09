import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { AUTH_ENDPOINTS } from "@/packages/configs/endpoints.config";
import { apiEnvConfig } from "@/packages/env/api.env";
import { emitSessionExpired } from "@/packages/utils/session-events";
import {
  CSRF_HEADER,
  getCsrfToken,
  needsCsrf,
  resetCsrfToken,
} from "./csrf.axios";

// ============================================================
// Auth interceptors
// ------------------------------------------------------------
// The session is two httpOnly cookies (a short-lived access cookie and a refresh cookie), sent
// by the browser on its own. So this file does not attach tokens; it does two other jobs:
//
// Request:  adds the CSRF header to every state-changing request (see csrf.axios.ts).
//
// Response: - a 403 "CSRF" is retried ONCE with a fresh token.
//           - a 401 from any other call triggers ONE refresh (shared by every request that
//             fails at the same moment), then the original request is retried. If the refresh
//             fails the session is over: listeners are told, and the browser goes to /signin
//             unless the request opted out with `skipAuthRedirect`.
//
// The refresh call deliberately does NOT go through `apiClient`, otherwise a 401 on the
// refresh endpoint would run back through this same interceptor and recurse.
// ============================================================

declare module "axios" {
  interface AxiosRequestConfig {
    /** Do not send the browser to /signin when this request's 401 cannot be recovered. */
    skipAuthRedirect?: boolean;
  }
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
    _csrfRetry?: boolean;
  }
}

// Endpoints where a 401 means "wrong credentials / bad link", not "your session expired".
const NO_REFRESH_ON_401: readonly string[] = [
  AUTH_ENDPOINTS.refresh,
  AUTH_ENDPOINTS.signIn,
  AUTH_ENDPOINTS.signUp,
  AUTH_ENDPOINTS.forgotPassword,
  AUTH_ENDPOINTS.resetPassword,
  AUTH_ENDPOINTS.verifyEmail,
  AUTH_ENDPOINTS.resendVerification,
];

const refreshClient = axios.create({
  baseURL: apiEnvConfig.API_URL,
  timeout: apiEnvConfig.API_TIMEOUT_MS,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let refreshingPromise: Promise<void> | null = null;

/** Calls the refresh endpoint at most once concurrently; everyone else awaits the same promise. */
const refreshSessionOnce = (): Promise<void> => {
  if (!refreshingPromise) {
    refreshingPromise = (async () => {
      const csrf = await getCsrfToken();
      await refreshClient.post(AUTH_ENDPOINTS.refresh, null, {
        headers: { [CSRF_HEADER]: csrf },
      });
    })().finally(() => {
      refreshingPromise = null;
    });
  }
  return refreshingPromise;
};

const redirectToSignIn = () => {
  if (typeof window === "undefined") return;
  // Outside the React tree (this runs in an axios interceptor), so a hard navigation is the
  // only option — `useRouter` isn't available here.
  const next = encodeURIComponent(
    window.location.pathname + window.location.search,
  );
  if (!window.location.pathname.startsWith("/signin")) {
    window.location.assign(`/signin?next=${next}`);
  }
};

const isCsrfRejection = (status: number | undefined, data: unknown) =>
  status === 403 &&
  typeof data === "object" &&
  data !== null &&
  "message" in data &&
  typeof data.message === "string" &&
  data.message.toLowerCase().includes("csrf");

export const attachAuthInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      if (needsCsrf(config.method)) {
        config.headers.set(CSRF_HEADER, await getCsrfToken());
      }
      return config;
    },
  );

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config as InternalAxiosRequestConfig | undefined;
      const status: number | undefined = error.response?.status;

      if (!original) return Promise.reject(error);

      // The cookie was cleared or rotated since the token was cached: fetch a new one, once.
      if (
        isCsrfRejection(status, error.response?.data) &&
        !original._csrfRetry
      ) {
        original._csrfRetry = true;
        resetCsrfToken();
        original.headers.set(CSRF_HEADER, await getCsrfToken());
        return client(original);
      }

      const url = original.url ?? "";
      if (
        status !== 401 ||
        original._retry ||
        NO_REFRESH_ON_401.includes(url)
      ) {
        return Promise.reject(error);
      }

      original._retry = true;

      try {
        await refreshSessionOnce();
        return client(original);
      } catch {
        emitSessionExpired();
        if (!original.skipAuthRedirect) redirectToSignIn();
        return Promise.reject(error);
      }
    },
  );
};
