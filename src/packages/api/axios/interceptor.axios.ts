import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { AUTH_ENDPOINTS } from "@/packages/configs/endpoints.config";
import { apiEnvConfig } from "@/packages/env/api.env";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/packages/utils/token-store";

// ============================================================
// Auth interceptors
// ------------------------------------------------------------
// Request:  attaches `Authorization: Bearer <accessToken>` from the
//           in-memory token store (packages/api/token-store.ts).
//
// Response: on a 401 from any request OTHER than the refresh call
//           itself, triggers a refresh — but only once even if many
//           requests 401 at the same moment. Every request that
//           arrives while a refresh is already in flight gets queued
//           and retried (or rejected) once that single refresh
//           settles, instead of each firing its own refresh call.
//
// The refresh call deliberately does NOT go through `apiClient` (see
// axios.api.ts) — reusing the same instance would run it back through
// this same response interceptor, and a 401 on the refresh endpoint
// itself would recurse. It's a bare axios instance sharing only the
// baseURL/timeout/credentials config.
// ============================================================

let refreshingPromise: Promise<string | null> | null = null;

const refreshClient = axios.create({
  baseURL: apiEnvConfig.API_URL,
  timeout: apiEnvConfig.API_TIMEOUT_MS,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/** Calls the refresh endpoint at most once concurrently; everyone else awaits the same promise. */
const refreshAccessToken = (): Promise<string | null> => {
  if (!refreshingPromise) {
    refreshingPromise = refreshClient
      .post<{ access_token?: string }>(AUTH_ENDPOINTS.refresh)
      .then((res) => {
        const token = res.data?.access_token ?? null;
        setAccessToken(token);
        return token;
      })
      .catch((err) => {
        clearAccessToken();
        throw err;
      })
      .finally(() => {
        refreshingPromise = null;
      });
  }

  return refreshingPromise;
};

const redirectToSignIn = () => {
  if (typeof window === "undefined") return;
  // Outside the React tree (this runs in an axios interceptor), so a
  // hard navigation is the only option — `useRouter` isn't available
  // here. `AuthProvider` catches this on next mount and clears its
  // own state; this just gets the browser there.
  const next = encodeURIComponent(
    window.location.pathname + window.location.search,
  );
  if (!window.location.pathname.startsWith("/signin")) {
    window.location.assign(`/signin?next=${next}`);
  }
};

declare module "axios" {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

export const attachAuthInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;

      const status = error.response?.status;
      const isRefreshCall = originalRequest?.url === AUTH_ENDPOINTS.refresh;
      const isSignInCall = originalRequest?.url === AUTH_ENDPOINTS.signIn;

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        isRefreshCall ||
        isSignInCall
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        if (!token) throw error;

        originalRequest.headers.set("Authorization", `Bearer ${token}`);
        return client(originalRequest);
      } catch (refreshError) {
        redirectToSignIn();
        return Promise.reject(refreshError);
      }
    },
  );
};
