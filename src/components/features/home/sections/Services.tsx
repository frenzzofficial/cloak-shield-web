import { Card } from "@/components/ui";
import {
  CookieIcon,
  LayersIcon,
  ShieldCheckIcon,
  UserIcon,
} from "../../../ui/icons/icons";

const services = [
  {
    icon: <UserIcon className="h-5 w-5" />,
    title: "Custom Email/Password Signin & Signup",
    desc: "Clean, customizable authentication flows for your application.",
  },
  {
    icon: <CookieIcon className="h-5 w-5" />,
    title: "Cookie-Based Secure Login",
    desc: "HTTP-only, encrypted cookies for maximum security and better UX.",
    highlight: true,
  },
  {
    icon: (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-[13px] font-bold text-white">
        N
      </span>
    ),
    title: "NextAuth for Next.js Projects",
    desc: "Seamless integration with modern Next.js authentication using NextAuth.js.",
    iconWrap: false,
  },
  {
    icon: <LayersIcon className="h-5 w-5" />,
    title: "Custom Backend Servers",
    desc: "Build with your preferred runtime — Hono, Fastify or Express. Fully flexible and production ready.",
  },
  {
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    title: "Web Security",
    desc: "Protect your application with proven security practices, modern encryption and threat prevention.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative border-t border-white/5 bg-[#03060c] py-20"
    >
      <div className="mx-auto max-w-300 px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-4 text-[12px] font-medium text-brand-400">
              OUR SERVICES
            </p>
            <h2 className="max-w-md text-[30px] font-bold leading-tight text-white sm:text-[34px]">
              Everything You Need for Secure Authentication
            </h2>
          </div>
          <p className="max-w-95 text-[14.5px] leading-relaxed text-slate-400">
            From ready-to-use solutions to fully custom implementations,
            CloakShield Web gives you the flexibility to build authentication
            your way.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s) => (
            <Card key={s.title}>
              <span className="mb-4 flex h-9 w-9 items-center justify-center text-brand-400">
                {s.iconWrap === false ? s.icon : s.icon}
              </span>
              <h3 className="text-[14.5px] font-semibold leading-snug text-white">
                {s.title}
              </h3>
              <p
                className={`mt-2.5 text-[13px] leading-relaxed ${
                  s.highlight ? "text-brand-400/70" : "text-slate-500"
                }`}
              >
                {s.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
