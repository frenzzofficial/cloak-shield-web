import ImageLogo from "@/components/ui/image/ImageLogo";
import { CheckIcon, LockIcon, ShieldCheckIcon } from "../../../ui/icons/icons";

const leftChecks = [
  "HTTP-only & secure cookies",
  "CSRF & XSS protection",
  "Encrypted data handling",
];
const rightChecks = [
  "Secure session management",
  "Role-based access control",
  "Regular security updates",
];

const badges = [
  {
    icon: <LockIcon className="h-3.5 w-3.5" />,
    label: "Encrypted",
    pos: "left-2 top-4",
  },
  {
    icon: <ShieldCheckIcon className="h-3.5 w-3.5" />,
    label: "Protected",
    pos: "right-2 top-10",
  },
  {
    icon: (
      <svg
        aria-label="hidden"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M4 12h4l2-6 4 12 2-6h4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    label: "Monitored",
    pos: "left-6 bottom-4",
  },
  {
    icon: (
      <svg
        aria-label="hidden"
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          d="M7 12a3 3 0 1 0 0-.001Zm10 0a3 3 0 1 0 0-.001ZM8.5 10.5 15.5 13.5M8.5 13.5 15.5 10.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    label: "Always Secure",
    pos: "right-0 bottom-8",
  },
];

export default function Security() {
  return (
    <section className="border-t border-white/5 bg-[#03060c] py-20">
      <div className="mx-auto grid max-w-300 grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Globe graphic */}
        <div className="relative mx-auto flex h-70 w-full max-w-105 items-center justify-center">
          <div className="relative h-55 w-55 rounded-full bg-[radial-gradient(circle_at_35%_30%,#3a4a5c,transparent_60%),radial-gradient(circle_at_60%_70%,#0c1420,#05080d)] shadow-[0_0_60px_rgba(51,191,242,0.25)]">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-primary/25" />
            <div className="absolute left-1/2 top-1/2 h-85 w-37.5 -translate-x-1/2 -translate-y-1/2 rotate-20 rounded-[50%] border border-primary/15" />
            <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_20px_rgba(51,191,242,0.6)]">
              <ImageLogo alt="logo" width={200} height={200} />
            </div>
          </div>

          {badges.map((b) => (
            <div
              key={b.label}
              className={`absolute ${b.pos} card-border flex items-center gap-1.5 rounded-lg bg-[#050a12]/95 px-3 py-1.5 text-foreground-muted shadow-lg`}
            >
              {b.icon}
              <span className="text-[11.5px] font-medium text-slate-200">
                {b.label}
              </span>
            </div>
          ))}
        </div>

        {/* Right content */}
        <div>
          <p className="eyebrow mb-4 text-[12px] font-medium text-foreground-muted">
            SECURITY FIRST
          </p>
          <h2 className="text-[30px] font-bold leading-tight text-white sm:text-[34px]">
            Built to Keep You
            <br />
            and Your Users <span className="text-gradient-blue">Safe</span>
          </h2>
          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-slate-400">
            We follow industry best practices to ensure your application is
            protected from modern threats. Because security isn&apos;t an option
            — it&apos;s a necessity.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              {leftChecks.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-foreground-muted" />
                  <span className="text-[13.5px] text-slate-300">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {rightChecks.map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckIcon className="h-4 w-4 shrink-0 text-foreground-muted" />
                  <span className="text-[13.5px] text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
