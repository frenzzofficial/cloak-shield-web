/** Decorative shield with a soft glow for the "protected" banner. Purely visual. */
const ShieldArt = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 240 240"
    className={className}
    role="presentation"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="shield-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7fe0ff" />
        <stop offset="55%" stopColor="#2f8ff0" />
        <stop offset="100%" stopColor="#0b3d91" />
      </linearGradient>
      <linearGradient id="shield-inner" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a1a33" />
        <stop offset="100%" stopColor="#04101f" />
      </linearGradient>
      <radialGradient id="shield-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#33a9f2" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#33a9f2" stopOpacity="0" />
      </radialGradient>
      <filter id="shield-blur" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>

    <circle cx="120" cy="120" r="110" fill="url(#shield-glow)" />
    <ellipse
      cx="120"
      cy="120"
      rx="104"
      ry="38"
      fill="none"
      stroke="#33a9f2"
      strokeOpacity="0.35"
      transform="rotate(-18 120 120)"
    />
    <ellipse
      cx="120"
      cy="120"
      rx="92"
      ry="30"
      fill="none"
      stroke="#7fe0ff"
      strokeOpacity="0.2"
      transform="rotate(24 120 120)"
    />

    <path
      d="M120 28 188 54v58c0 44-28 78-68 98-40-20-68-54-68-98V54l68-26Z"
      fill="url(#shield-fill)"
      filter="url(#shield-blur)"
      opacity="0.6"
    />
    <path
      d="M120 28 188 54v58c0 44-28 78-68 98-40-20-68-54-68-98V54l68-26Z"
      fill="url(#shield-fill)"
    />
    <path
      d="M120 42 174 63v49c0 36-22 64-54 81-32-17-54-45-54-81V63l54-21Z"
      fill="url(#shield-inner)"
    />
    <path
      d="M96 118l18 18 32-36"
      fill="none"
      stroke="#7fe0ff"
      strokeWidth="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ShieldArt;
