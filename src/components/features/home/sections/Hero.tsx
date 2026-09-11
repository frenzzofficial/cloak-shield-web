import NextLink from "next/link";
import { Button, Card, Link } from "@/components/ui";
import ImageLogo from "@/components/ui/image/ImageLogo";
import {
  ArrowRightIcon,
  DiscordIcon,
  EyeIcon,
  GithubIcon,
  GoogleIcon,
  LockIcon,
  MailIcon,
  ShieldCheckIcon,
} from "../../../ui/icons/icons";

const trustPoints = [
  {
    icon: <ShieldCheckIcon className="h-4 w-4 text-foreground-muted" />,
    title: "Secure by Default",
    desc: "Industry best practices",
  },
  {
    icon: <ShieldCheckIcon className="h-4 w-4 text-foreground-muted" />,
    title: "Easy to Integrate",
    desc: "Works with your stack",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-foreground-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-label="hidden"
      >
        <path d="M4 20V10M11 20V4M18 20v-7" strokeLinecap="round" />
      </svg>
    ),
    title: "Built for Scale",
    desc: "From indie to enterprise",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#02040a]">
      {/* ambient top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-linear-to-b from-[#0f2b45]/60 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-150 w-150 rounded-full bg-brand-600/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 pb-24 pt-16 lg:grid-cols-[1fr_1.05fr] lg:pt-20">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <p className="eyebrow mb-5 text-[12px] font-medium text-slate-400">
            SECURE&nbsp;&nbsp;·&nbsp;&nbsp;MODERN&nbsp;&nbsp;·&nbsp;&nbsp;DEVELOPER
            FOCUSED
          </p>
          <h1 className="text-[46px] font-extrabold leading-[1.08] tracking-tight text-white sm:text-[52px]">
            Modern
            <br />
            <span className="text-gradient-blue">Authentication</span>
            <br />
            for Real Projects
          </h1>
          <p className="mt-6 max-w-110 text-[15.5px] leading-relaxed text-slate-400">
            CloakShield Web provides modern auth solutions with secure, scalable
            and developer-friendly tools. From custom email/password to NextAuth
            integration, we help you build safer applications faster.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              variant={"primary"}
              href="/features"
              className="btn-gradient flex items-center gap-2 rounded-lg px-6 py-3 text-[14.5px] font-semibold text-[#02121f] shadow-glow transition-transform hover:scale-[1.02]"
            >
              Get Started Free
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              variant={"outline"}
              href="/docs"
              className="rounded-lg border border-primary/40 px-6 py-3 text-[14.5px] font-semibold text-foreground-muted transition-colors hover:border-primary hover:text-brand-300"
            >
              View Documentation
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-8">
            {trustPoints.map((p) => (
              <div key={p.title} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-brand-500/10">
                  {p.icon}
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-white">
                    {p.title}
                  </p>
                  <p className="text-[12px] text-slate-500">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: card + shield */}
        <div className="relative mx-auto h-115 w-full max-w-155 lg:mx-0">
          <span className="font-romantic absolute right-0 top-0 hidden -rotate-3 text-xl leading-6 text-slate-500/70 xl:block">
            Your
            <br />
            App
            <br />
            Safer
            <br />
            Tomorrow
          </span>

          {/* Shield graphic (background layer) */}
          <div className="absolute right-0 top-1/2 hidden h-85 w-75 -translate-y-1/2 md:block">
            {/* glow behind the logo, standing in for the old svg gradient fill */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-56 w-56 rounded-full bg-brand-500/25 blur-[60px]" />
            </div>

            <ImageLogo
              alt="CloakShield shield logo"
              width={256}
              height={256}
              className="absolute inset-0 m-auto h-full w-full object-contain drop-shadow-[0_0_45px_rgba(51,191,242,0.45)]"
            />

            {/* pedestal */}
            <div className="absolute bottom-2 left-1/2 h-6 w-65 -translate-x-1/2 rounded-full bg-linear-to-b from-brand-500/50 to-transparent blur-sm" />
            <div className="absolute bottom-0 left-1/2 flex h-9 w-70 -translate-x-1/2 items-center justify-center rounded-full border border-primary/30 bg-[#050a12]">
              <span className="eyebrow text-[10px] font-semibold text-slate-300">
                AUTH&nbsp;&nbsp;·&nbsp;&nbsp;SECURITY&nbsp;&nbsp;·&nbsp;&nbsp;FREEDOM
              </span>
            </div>
          </div>

          {/* Sign-in card mockup */}
          <Card className="max-w-75">
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-brand-400/60 to-transparent" />{" "}
            <div className="relative z-10 transform-[translateZ(30px)]">
              {" "}
              <h3 className="text-[17px] font-semibold text-white">
                {" "}
                Welcome Back{" "}
              </h3>{" "}
              <p className="mt-1 text-[12.5px] text-slate-500">
                {" "}
                Sign in to your account{" "}
              </p>{" "}
              <div className="mt-5 flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/3 px-3.5 py-2.5 transition-colors hover:border-primary/20">
                {" "}
                <MailIcon className="h-4 w-4 text-slate-500" />{" "}
                <span className="text-[13px] text-slate-500">
                  {" "}
                  you@yourapp.com{" "}
                </span>{" "}
              </div>{" "}
              <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/3 px-3.5 py-2.5 transition-colors hover:border-primary/20">
                {" "}
                <LockIcon className="h-4 w-4 text-slate-500" />{" "}
                <span className="flex-1 text-[13px] text-slate-500">
                  {" "}
                  Your password{" "}
                </span>{" "}
                <EyeIcon className="h-4 w-4 text-slate-500" />{" "}
              </div>{" "}
              <div className="mt-3.5 flex items-center justify-between text-[12px]">
                {" "}
                <div className="flex items-center gap-1.5 text-slate-400">
                  {" "}
                  <span className="h-3.5 w-3.5 rounded border border-slate-600" />{" "}
                  Remember me{" "}
                </div>{" "}
                <NextLink
                  href="#"
                  className="text-foreground-muted transition-colors hover:text-brand-300"
                >
                  {" "}
                  Forgot password?{" "}
                </NextLink>{" "}
              </div>{" "}
              <Button
                type="button"
                className="btn-gradient mt-4 w-full rounded-lg py-2.5 text-[13.5px] font-semibold text-[#02121f]"
              >
                {" "}
                Sign In{" "}
              </Button>{" "}
              <div className="mt-5 flex items-center gap-3">
                {" "}
                <span className="h-px flex-1 bg-white/10" />{" "}
                <span className="text-[11px] text-slate-500">
                  {" "}
                  or continue with{" "}
                </span>{" "}
                <span className="h-px flex-1 bg-white/10" />{" "}
              </div>{" "}
              <div className="mt-4 flex gap-2.5">
                {" "}
                {[GithubIcon, GoogleIcon, DiscordIcon].map((Icon) => (
                  <button
                    type="button"
                    key={Icon.toString()}
                    className="flex flex-1 items-center justify-center rounded-lg border border-white/10 bg-white/3 py-2.5 text-white transition-colors hover:bg-white/6"
                  >
                    {" "}
                    <Icon className="h-4 w-4" />{" "}
                  </button>
                ))}{" "}
              </div>{" "}
              <p className="mt-4 text-center text-[12px] text-slate-500">
                {" "}
                Don&apos;t have an account?{" "}
                <NextLink
                  href="#"
                  className="text-foreground-muted transition-colors hover:text-brand-300"
                >
                  {" "}
                  Create one{" "}
                </NextLink>{" "}
              </p>{" "}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
