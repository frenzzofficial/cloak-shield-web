import Link from "next/link";

import {
  DiscordIcon,
  GithubIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/icons/icons";
import ImageLogo from "../ui/image/ImageLogo";

const links = ["Docs", "GitHub", "Support", "Pricing", "Contact"];
const socials = [GithubIcon, XIcon, DiscordIcon, YoutubeIcon, LinkedinIcon];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#02040a] py-8">
      <div className="mx-auto flex max-w-300 flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <Link href="#" className="flex items-center gap-2.5">
          <ImageLogo alt="logo" width={50} height={50} />

          <div>
            <p className="text-[14px] font-semibold text-white">
              cloak-<span className="text-brand-500">shield</span>-web
            </p>
            <p className="text-[11px] text-slate-500">
              Your App. Safer Tomorrow.
            </p>
          </div>
        </Link>

        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] text-slate-400">
          {links.map((l, i) => (
            <li key={l} className="flex items-center gap-2">
              <Link href="#" className="transition-colors hover:text-slate-200">
                {l}
              </Link>
              {i < links.length - 1 && (
                <span className="text-slate-700">·</span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 text-slate-400">
          {socials.map((Icon, i) => (
            <Link
              key={socials.map((s) => s.name)[i]}
              href="#"
              className="transition-colors hover:text-white"
            >
              <Icon className="h-4.25 w-4.25" />
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-6 max-w-300 px-6">
        <p className="text-center text-[11.5px] text-slate-600 md:text-right">
          © 2026 CloakShield Web. Built for a safer internet.
        </p>
      </div>
    </footer>
  );
}
