import type { NextConfig } from "next";

// The backend lives on another host (cloak-shield-app.vercel.app). Browsers treat two
// *.vercel.app sites as cross-site, so cookies set by the backend would be third-party and are
// often blocked. Instead the browser only ever talks to THIS origin: every /api/* request is
// proxied to the backend server-side, so the session and CSRF cookies are first-party.
// Server-only variable (no NEXT_PUBLIC_): where the backend is reachable from the Next server.
const apiProxyTarget = (
  process.env.API_PROXY_TARGET ?? "http://localhost:7164"
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
