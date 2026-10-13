import type { MetadataRoute } from "next";
import { appConfig } from "@/packages/configs/app.config";

// Keep signed-in and one-time-link pages out of search results; the public pages stay open.
const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard",
        "/auth/",
        "/reset-password",
        "/verify-email",
        "/confirm-email-change",
      ],
    },
  ],
  sitemap: `${appConfig.app.url}/sitemap.xml`,
});

export default robots;
