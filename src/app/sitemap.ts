import type { MetadataRoute } from "next";
import { appConfig } from "@/packages/configs/app.config";

const PUBLIC_PATHS = ["/", "/signin", "/signup", "/faq", "/terms", "/privacy"];

const sitemap = (): MetadataRoute.Sitemap =>
  PUBLIC_PATHS.map((path) => ({ url: `${appConfig.app.url}${path}` }));

export default sitemap;
