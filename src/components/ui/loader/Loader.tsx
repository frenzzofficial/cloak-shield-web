import { useId } from "react";
import "@/styles/ui/loader.css";

// Shown one after another when no `label` is given. The CSS cycles exactly three.
const STEPS = [
  "Verifying session",
  "Encrypting channel",
  "Securing your account",
];

interface LoaderProps {
  /** Fill the viewport (route loading, auth waits). Off: sized by its parent. */
  fullscreen?: boolean;
  /** Only the animated shield, no grid or label: for small slots such as the header. */
  compact?: boolean;
  /** A fixed message instead of the cycling steps, e.g. "Completing sign-in". */
  label?: string;
  className?: string;
}

const SHIELD =
  "M60 10 L100 24 V58 C100 82 82 100 60 110 C38 100 20 82 20 58 V24 Z";

/**
 * The app's one loading animation: a shield drawing itself while a scan line sweeps through
 * it and a key appears, ringed by two orbits. Pure markup and CSS (no hooks beyond `useId`), so
 * it works in server components, in `loading.tsx` and in client components alike.
 */
const Loader = ({
  fullscreen = false,
  compact = false,
  label,
  className,
}: LoaderProps) => {
  const uid = useId();
  const gradientId = `${uid}-scan`;
  const clipId = `${uid}-clip`;

  const classes = [
    "cs-load",
    fullscreen && !compact ? "cs-load--screen" : "",
    compact ? "cs-load--compact" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <output
      aria-live="polite"
      className={classes}
      style={compact ? { ["--cs-load-size" as string]: "2.25rem" } : undefined}
    >
      <div className="cs-load__core" aria-hidden="true">
        <span className="cs-load__ring" />
        <span className="cs-load__ring cs-load__ring--2" />
        <span className="cs-load__orbit" />
        <span className="cs-load__orbit cs-load__orbit--2" />

        <svg
          className="cs-load__shield"
          role="img"
          aria-label="Loading"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--primary)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--primary)" stopOpacity="0.55" />
            </linearGradient>
            <clipPath id={clipId}>
              <path d={SHIELD} />
            </clipPath>
          </defs>

          <path className="cs-load__outline" d={SHIELD} />
          <g clipPath={`url(#${clipId})`}>
            <rect
              className="cs-load__scan"
              x="20"
              y="0"
              width="80"
              height="22"
              fill={`url(#${gradientId})`}
            />
          </g>
          <g className="cs-load__key">
            <circle cx="60" cy="52" r="7" />
            <path d="M57 57 h6 l2.5 17 h-11 z" />
          </g>
        </svg>
      </div>

      {compact ? null : label ? (
        <div className="cs-load__steps" aria-hidden="true">
          <span className="cs-load__step cs-load__step--static">{label}</span>
        </div>
      ) : (
        <div className="cs-load__steps" aria-hidden="true">
          {STEPS.map((step) => (
            <span key={step} className="cs-load__step">
              {step}
            </span>
          ))}
        </div>
      )}

      <span className="sr-only">{label ?? "Loading, please wait"}</span>
    </output>
  );
};

export default Loader;
