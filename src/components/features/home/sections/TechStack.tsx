const techs = [
  {
    name: "Next.js",
    bg: "bg-black",
    node: (
      <svg
        aria-label="hidden"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="white"
      >
        <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.4 17.1-7.1-9.3v7.3H9V6.9h1.6l7.1 9.3V6.9h1.3v10.2h-1.6Z" />
      </svg>
    ),
  },
  {
    name: "Hono",
    bg: "bg-[#0a0a0a]",
    node: (
      <svg
        aria-label="hidden"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="#FF5A1F"
      >
        <path d="M3 21 15 3h6L9 21H3Z" />
      </svg>
    ),
  },
  {
    name: "Fastify",
    bg: "bg-[#0a0a0a]",
    node: (
      <svg
        aria-label="hidden"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
      >
        <path d="M4 15c3-8 8-11 16-11-2 8-7 12-16 11Z" strokeLinejoin="round" />
        <path d="M4 15c1 3 2.5 4.5 5 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Express",
    bg: "bg-[#0a0a0a]",
    node: <span className="text-[19px] font-medium italic text-white">ex</span>,
  },
  {
    name: "TypeScript",
    bg: "bg-[#3178c6]",
    node: <span className="text-[13px] font-bold text-white">TS</span>,
  },
  {
    name: "Node.js",
    bg: "bg-[#0a0a0a]",
    node: (
      <svg
        aria-label="hidden"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="#83CD29"
        strokeWidth="1.5"
      >
        <path d="m12 2 8.7 5v10l-8.7 5-8.7-5V7Z" strokeLinejoin="round" />
        <path d="M12 8v8M9 10.5l6 5M15 10.5l-6 5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    bg: "bg-[#0a0a0a]",
    node: (
      <svg
        aria-label="hidden"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="#4f9bce"
        strokeWidth="1.4"
      >
        <path
          d="M12 2c4.5 0 7 3 7 7 0 3.5-1.5 6-3.5 7.5.5.5 1 1.5 1 2.5 0 1.5-1 2-2 2s-2-1-2-2"
          strokeLinejoin="round"
        />
        <path
          d="M12 2c-4.5 0-7 3-7 7 0 3.5 1.5 6 3.5 7.5-.5.5-1 1.5-1 2.5 0 1.5 1 2 2 2s2-1 2-2"
          strokeLinejoin="round"
        />
        <circle cx="9.5" cy="10" r="0.6" fill="#4f9bce" stroke="none" />
        <circle cx="14.5" cy="10" r="0.6" fill="#4f9bce" stroke="none" />
      </svg>
    ),
  },
];

export default function TechStack() {
  return (
    <section className="border-t border-white/5 bg-[#02040a] py-16">
      <div className="mx-auto flex max-w-300 flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center">
        <div className="max-w-90">
          <p className="eyebrow mb-4 text-[12px] font-medium text-brand-400">
            BUILT WITH THE BEST
          </p>
          <h2 className="text-[24px] font-bold leading-tight text-white">
            Powered by Modern Technologies
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
            CloakShield Web works with modern frameworks and runtimes, giving
            you the freedom to choose what fits your stack.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3.5 sm:grid-cols-7">
          {techs.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-2">
              <div
                className={`card-border flex h-14 w-14 items-center justify-center rounded-xl ${t.bg}`}
              >
                {t.node}
              </div>
              <span className="text-[11.5px] text-slate-400">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
