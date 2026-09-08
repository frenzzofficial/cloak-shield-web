import { Caveat, Inter } from "next/font/google";
import localFont from "next/font/local";

export const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const monoFont = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const romanticFont = localFont({
  src: "../../assets/fonts/romantic.otf",
  variable: "--font-romantic",
  weight: "400",
  style: "normal",
  display: "swap",
});
