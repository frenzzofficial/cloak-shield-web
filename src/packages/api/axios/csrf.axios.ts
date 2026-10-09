import axios from "axios";
import { AUTH_ENDPOINTS } from "@/packages/configs/endpoints.config";
import { apiEnvConfig } from "@/packages/env/api.env";

// ============================================================
// CSRF (double-submit cookie)
// ------------------------------------------------------------
// The backend sets a readable `csrf_token` cookie and requires the same value in an
// `x-csrf-token` header on every state-changing request that is not sent with a Bearer token
// (browsers send cookies automatically, which is what makes CSRF possible in the first place).
// `GET /v1/csrf` returns the value, so the header can be built without reading cookies —
// which also works when the API is on another origin.
// ============================================================

export const CSRF_HEADER = "x-csrf-token";

const SAFE_METHODS = new Set(["get", "head", "options"]);

// A bare instance: going through `apiClient` would run this call through the same
// interceptors that are asking for the token.
const csrfClient = axios.create({
  baseURL: apiEnvConfig.API_URL,
  timeout: apiEnvConfig.API_TIMEOUT_MS,
  withCredentials: true,
});

let cached: string | null = null;
let inFlight: Promise<string> | null = null;

export const needsCsrf = (method: string | undefined): boolean =>
  !SAFE_METHODS.has((method ?? "get").toLowerCase());

export const getCsrfToken = (): Promise<string> => {
  if (cached) return Promise.resolve(cached);

  if (!inFlight) {
    inFlight = csrfClient
      .get<{ csrfToken?: string }>(AUTH_ENDPOINTS.csrf)
      .then((res) => {
        const token = res.data.csrfToken;
        if (!token) throw new Error("The server did not return a CSRF token");
        cached = token;
        return token;
      })
      .finally(() => {
        inFlight = null;
      });
  }

  return inFlight;
};

/** Forget the cached token — e.g. after the server rejected it (cookie cleared or rotated). */
export const resetCsrfToken = (): void => {
  cached = null;
};
