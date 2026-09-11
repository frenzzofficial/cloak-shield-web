import LinkImage from "next/link";
import { ImageLogo, Link } from "@/components/ui";
import NavActions from "./NavActions";

const links = [
  { label: "Home", href: "#", active: true },
  { label: "Features", href: "#features" },
  { label: "Services", href: "#services" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#02040a]  backdrop-blur">
      <nav className="mx-auto flex h-17 max-w-300 items-center justify-between px-6">
        <LinkImage href="/" className="flex items-center gap-2.5">
          <ImageLogo alt="logo" width={50} height={50} />
          <span className="text-[17px] font-semibold tracking-tight text-white">
            cloak-<span className="text-primary">shield</span>-web
          </span>
        </LinkImage>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                variant={"secondary"}
                href={link.href}
                className={`relative pb-1 text-[14.5px] transition-colors ${
                  link.active
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {link.label}
                {link.active && (
                  <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-500" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <NavActions />
      </nav>
    </header>
  );
}
