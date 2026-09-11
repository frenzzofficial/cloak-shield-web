import { z } from "zod";

// ============================================================
// API MODE SWITCH
// ------------------------------------------------------------
// The backend for this app can live in two different places
// depending on deployment:
//
//   "internal" — same-origin. The backend is Next.js Route
//     Handlers under this app's own `/api/*` (or a reverse-proxied
//     path on the same host). No CORS involved, cookies are
//     first-party by default.
//
//   "external" — cross-origin. The backend is a separate service
//     (Hono/Express/Fastify etc.) on its own host, reachable via
//     NEXT_PUBLIC_API_URL. Requests need `withCredentials: true`
//     and the backend needs CORS configured to allow this origin
//     with credentials, plus `SameSite=None; Secure` on its
//     session/refresh cookie.
//
// `apiClient` (packages/api/axios.api.ts) reads this once at
// module-init time and configures its `baseURL` accordingly — the
// rest of the app never needs to know which mode is active.
// ============================================================

const apiEnvSchema = z
  .object({
    NEXT_PUBLIC_API_MODE: z.enum(["internal", "external"]).default("internal"),
    NEXT_PUBLIC_API_URL: z.string().optional(),
    NEXT_PUBLIC_API_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .positive()
      .default(15000),
  })
  .superRefine((val, ctx) => {
    if (val.NEXT_PUBLIC_API_MODE === "external" && !val.NEXT_PUBLIC_API_URL) {
      ctx.addIssue({
        code: "custom",
        path: ["NEXT_PUBLIC_API_URL"],
        message:
          'NEXT_PUBLIC_API_URL is required when NEXT_PUBLIC_API_MODE="external"',
      });
    }
  });

const parsed = apiEnvSchema.safeParse({
  NEXT_PUBLIC_API_MODE: process.env.NEXT_PUBLIC_API_MODE,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_API_TIMEOUT_MS: process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
});

if (!parsed.success) {
  throw new Error(
    `❌ Invalid API environment variables:\n${parsed.error.issues
      .map((i) => `• ${i.path.join(".")}: ${i.message}`)
      .join("\n")}`,
  );
}

export const apiEnvConfig = Object.freeze({
  API_MODE: parsed.data.NEXT_PUBLIC_API_MODE,
  // Internal mode intentionally resolves to a relative path — same
  // origin, so no scheme/host needed and it works in every environment
  // (preview deploys, custom domains, localhost) without config.
  API_URL:
    parsed.data.NEXT_PUBLIC_API_MODE === "external"
      ? (parsed.data.NEXT_PUBLIC_API_URL as string)
      : "/api",
  API_TIMEOUT_MS: parsed.data.NEXT_PUBLIC_API_TIMEOUT_MS,
  IS_EXTERNAL: parsed.data.NEXT_PUBLIC_API_MODE === "external",
});

export type ApiEnvConfig = typeof apiEnvConfig;
