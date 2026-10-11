import ShieldArt from "@/components/layouts/ShieldArt";

const CHIPS = [
  "HttpOnly cookies",
  "Rotating refresh tokens",
  "CSRF protection",
] as const;

const ProtectionBanner = () => (
  <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-[#0a1a33] via-[#07111f] to-[#050b17] p-6 sm:p-8">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-16 top-1/2 size-80 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
    />
    <div className="relative flex items-center justify-between gap-6">
      <div className="max-w-md">
        <p className="eyebrow text-xs font-medium uppercase text-primary">
          Account security
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Your session is protected
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your sign-in lives in cookies that scripts can&apos;t read, refresh
          tokens rotate every time they&apos;re used, and every sign-in is
          recorded in your activity log.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs">
          {CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>
      <ShieldArt className="hidden size-48 shrink-0 sm:block lg:size-56" />
    </div>
  </section>
);

export default ProtectionBanner;
