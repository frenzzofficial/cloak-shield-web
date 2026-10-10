// Loading.tsx — server-component safe (pure CSS, no JS). Works as `loading.tsx` too.

const STEPS = [
  "Verifying session",
  "Encrypting channel",
  "Securing your account",
];

const Loading = () => {
  return (
    <div
      aria-live="polite"
      className="cs-load relative flex min-h-svh w-full flex-col items-center justify-center gap-8 overflow-hidden bg-background"
    >
      <style>{`
        .cs-load::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(color-mix(in oklch, var(--primary) 7%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklch, var(--primary) 7%, transparent) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(circle at center, #000 0%, transparent 65%);
          -webkit-mask-image: radial-gradient(circle at center, #000 0%, transparent 65%);
        }
        .cs-load__core {
          position: relative;
          width: 11rem;
          height: 11rem;
        }
        .cs-load__core::after {
          content: "";
          position: absolute;
          inset: 18%;
          border-radius: 9999px;
          background: radial-gradient(circle, color-mix(in oklch, var(--primary) 35%, transparent), transparent 70%);
          filter: blur(14px);
          animation: cs-load-breathe 3s ease-in-out infinite;
        }
        .cs-load__ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1px dashed color-mix(in oklch, var(--primary) 45%, transparent);
          animation: cs-load-spin 14s linear infinite;
        }
        .cs-load__ring--2 {
          inset: 12%;
          border-style: solid;
          border-color: color-mix(in oklch, var(--primary) 20%, transparent);
          border-top-color: var(--primary);
          animation: cs-load-spin 2.6s cubic-bezier(0.6, 0.1, 0.4, 0.9) infinite reverse;
        }
        .cs-load__orbit {
          position: absolute;
          inset: 0;
          animation: cs-load-spin 5s linear infinite;
        }
        .cs-load__orbit::after {
          content: "";
          position: absolute;
          top: -3px;
          left: 50%;
          width: 6px;
          height: 6px;
          margin-left: -3px;
          border-radius: 9999px;
          background: var(--primary);
          box-shadow: 0 0 12px 2px var(--primary);
        }
        .cs-load__orbit--2 {
          inset: 12%;
          animation-duration: 3.4s;
          animation-direction: reverse;
        }
        .cs-load__shield {
          position: absolute;
          inset: 22%;
          overflow: visible;
          filter: drop-shadow(0 0 10px color-mix(in oklch, var(--primary) 55%, transparent));
        }
        .cs-load__outline {
          fill: color-mix(in oklch, var(--primary) 8%, transparent);
          stroke: var(--primary);
          stroke-width: 2.5;
          stroke-linejoin: round;
          stroke-dasharray: 320;
          stroke-dashoffset: 320;
          animation: cs-load-draw 3s ease-in-out infinite;
        }
        .cs-load__scan {
          fill: url(#cs-load-scan-grad);
          animation: cs-load-scan 3s ease-in-out infinite;
        }
        .cs-load__key {
          fill: var(--primary);
          transform-origin: 60px 60px;
          animation: cs-load-key 3s ease-in-out infinite;
        }
        .cs-load__steps {
          position: relative;
          height: 1.25rem;
          width: 18rem;
          text-align: center;
          font-size: 0.8125rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted-foreground);
        }
        .cs-load__step {
          position: absolute;
          inset: 0;
          opacity: 0;
          animation: cs-load-step 9s ease-in-out infinite;
        }
        .cs-load__step::after {
          content: "…";
          display: inline-block;
          width: 1ch;
          animation: cs-load-dots 1.2s steps(4, end) infinite;
          overflow: hidden;
          vertical-align: bottom;
        }
        .cs-load__step:nth-child(2) { animation-delay: 3s; }
        .cs-load__step:nth-child(3) { animation-delay: 6s; }

        @keyframes cs-load-spin { to { transform: rotate(360deg); } }
        @keyframes cs-load-breathe {
          0%, 100% { opacity: 0.45; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes cs-load-draw {
          0% { stroke-dashoffset: 320; }
          55%, 85% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -320; }
        }
        @keyframes cs-load-scan {
          0% { transform: translateY(-20px); opacity: 0; }
          15% { opacity: 1; }
          70% { transform: translateY(125px); opacity: 1; }
          100% { transform: translateY(125px); opacity: 0; }
        }
        @keyframes cs-load-key {
          0%, 45% { opacity: 0; transform: scale(0.6); }
          65%, 85% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
        @keyframes cs-load-step {
          0% { opacity: 0; transform: translateY(8px); }
          6%, 28% { opacity: 1; transform: translateY(0); }
          34%, 100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes cs-load-dots {
          from { width: 0; }
          to { width: 1.2ch; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cs-load__ring,
          .cs-load__orbit,
          .cs-load__core::after,
          .cs-load__scan { animation: none; }
          .cs-load__outline { animation: none; stroke-dashoffset: 0; }
          .cs-load__key { animation: none; opacity: 1; }
          .cs-load__step { animation: none; }
          .cs-load__step:first-child { opacity: 1; }
        }
      `}</style>

      <div className="cs-load__core" aria-hidden="true">
        <span className="cs-load__ring" />
        <span className="cs-load__ring cs-load__ring--2" />
        <span className="cs-load__orbit" />
        <span className="cs-load__orbit cs-load__orbit--2" />

        <svg
          className="cs-load__shield"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="hidden"
        >
          <defs>
            <linearGradient id="cs-load-scan-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--primary)" stopOpacity="0.55" />
            </linearGradient>
            <clipPath id="cs-load-clip">
              <path d="M60 10 L100 24 V58 C100 82 82 100 60 110 C38 100 20 82 20 58 V24 Z" />
            </clipPath>
          </defs>

          <path
            className="cs-load__outline"
            d="M60 10 L100 24 V58 C100 82 82 100 60 110 C38 100 20 82 20 58 V24 Z"
          />
          <g clipPath="url(#cs-load-clip)">
            <rect
              className="cs-load__scan"
              x="20"
              y="0"
              width="80"
              height="22"
            />
          </g>
          <g className="cs-load__key">
            <circle cx="60" cy="52" r="7" />
            <path d="M57 57 h6 l2.5 17 h-11 z" />
          </g>
        </svg>
      </div>

      <div className="cs-load__steps">
        {STEPS.map((step) => (
          <span key={step} className="cs-load__step">
            {step}
          </span>
        ))}
      </div>

      <span className="sr-only">Loading, please wait</span>
    </div>
  );
};

export default Loading;
