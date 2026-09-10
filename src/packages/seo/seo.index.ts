import type { Metadata } from "next";
import { appConfig } from "@/packages/configs/app.config";

export const seo: Metadata = {
  metadataBase: new URL(appConfig.app.url),
  title: `${appConfig.app.name} | ${appConfig.app.description}`,
  description:
    "CloakShield Web provides modern auth solutions with secure, scalable and developer-friendly tools. From custom email/password to NextAuth integration, we help you build safer applications faster.",
};
