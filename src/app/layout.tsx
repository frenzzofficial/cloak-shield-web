import "@/styles/globals.css";
import type { Metadata } from "next";
import AppClientLayout from "@/components/layouts/AppClientLayout";
import {
  monoFont,
  romanticFont,
  sansFont,
} from "@/packages/configs/font.config";
import { seo } from "@/packages/seo/seo.index";

export const metadata: Metadata = seo;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} ${romanticFont.variable} h-full antialiased`}
    >
      <body className="min-h-full relative flex flex-col">
        <AppClientLayout>{children}</AppClientLayout>
      </body>
    </html>
  );
}
