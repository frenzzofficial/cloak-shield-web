import { ArrowRightIcon } from "../../../ui/icons/icons";

export default function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#02040a] py-24">
      {/* mountain silhouettes */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(20,30,45,0.6),transparent_70%)]" />
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-[#060a12]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M0 200 L120 90 220 150 340 60 460 140 600 40 740 130 880 70 1000 150 1120 80 1200 200Z" />
      </svg>

      {/* curved glow arc */}
      <svg
        className="pointer-events-none absolute left-1/2 top-6 h-24 w-225 -translate-x-1/2 opacity-70"
        viewBox="0 0 900 100"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 90 Q450 -10 900 90"
          stroke="url(#arcGrad)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="900" y2="0">
            <stop offset="0%" stopColor="#33bff2" stopOpacity="0" />
            <stop offset="50%" stopColor="#7fe0ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#33bff2" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative mx-auto flex max-w-180 flex-col items-center px-6 text-center">
        <p className="eyebrow mb-4 text-[12px] font-medium text-slate-400">
          READY TO BUILD?
        </p>
        <h2 className="text-[26px] font-bold leading-tight text-white sm:text-[30px]">
          Start Building with{" "}
          <span className="text-gradient-blue">CloakShield Web</span> Today
        </h2>
        <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-400">
          Get secure, modern and fully customizable authentication for your next
          project.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#get-started"
            className="btn-gradient flex items-center gap-2 rounded-lg px-6 py-3 text-[14.5px] font-semibold text-[#02121f] shadow-glow transition-transform hover:scale-[1.02]"
          >
            Get Started Free
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <a
            href="#docs"
            className="rounded-lg border border-primary/40 px-6 py-3 text-[14.5px] font-semibold text-foreground-muted transition-colors hover:border-primary hover:text-brand-300"
          >
            View Documentation
          </a>
        </div>
      </div>
    </section>
  );
}
