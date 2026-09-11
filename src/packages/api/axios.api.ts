import axios from "axios";
import { apiEnvConfig } from "@/packages/env/api.env";
import { attachAuthInterceptors } from "./axios/interceptor.axios";

// ============================================================
// apiClient
// ------------------------------------------------------------
// Single axios instance for the whole app. `baseURL` is resolved
// once from `apiEnvConfig` (packages/env/api.env.ts):
//
//   internal → "/api"               (same-origin, e.g. Next.js Route Handlers)
//   external → NEXT_PUBLIC_API_URL  (separate backend host, cross-origin)
//
// `withCredentials: true` is safe in both modes — for same-origin
// requests browsers send cookies regardless of the flag, and for
// cross-origin (external mode) it's required so the httpOnly
// refresh-token cookie actually makes it to the backend. In external
// mode the backend must respond with matching CORS headers
// (`Access-Control-Allow-Credentials: true`, an explicit — not
// wildcard — `Access-Control-Allow-Origin`) and issue its
// session/refresh cookie with `SameSite=None; Secure`.
// ============================================================

export const apiClient = axios.create({
  baseURL: apiEnvConfig.API_URL,
  timeout: apiEnvConfig.API_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

attachAuthInterceptors(apiClient);

export { apiEnvConfig };
