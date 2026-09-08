export function ShieldLogoIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 28"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="24" y2="28">
          <stop offset="0%" stopColor="#8fe6ff" />
          <stop offset="100%" stopColor="#2f8ff0" />
        </linearGradient>
      </defs>
      <path
        d="M12 1L22 5V13C22 19.5 17.8 24.7 12 27C6.2 24.7 2 19.5 2 13V5L12 1Z"
        fill="url(#logoGrad)"
      />
      <path
        d="M12 1V27C6.2 24.7 2 19.5 2 13V5L12 1Z"
        fill="white"
        fillOpacity="0.18"
      />
    </svg>
  );
}

export function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path
        d="M4.5 20c1.6-3.6 4.4-5.5 7.5-5.5s5.9 1.9 7.5 5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LockIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" strokeLinecap="round" />
    </svg>
  );
}

export function EyeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M2 12C4 7.5 7.7 5 12 5s8 2.5 10 7c-2 4.5-5.7 7-10 7s-8-2.5-10-7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6.5 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckboxIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <rect x="1" y="1" width="14" height="14" rx="3" />
    </svg>
  );
}

export function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2c-3.17.69-3.83-1.36-3.83-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14v3.17c0 .3.21.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

export function GoogleIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-label="hidden" viewBox="0 0 24 24" className={className}>
      <path
        fill="#4285F4"
        d="M23.04 12.27c0-.82-.07-1.42-.22-2.05H12v3.72h6.32c-.13 1.03-.82 2.6-2.36 3.65l-.02.15 3.42 2.64.24.02c2.18-2 3.44-4.95 3.44-8.13Z"
      />
      <path
        fill="#34A853"
        d="M12 23.5c3.11 0 5.72-1.02 7.63-2.78l-3.64-2.81c-.98.68-2.29 1.15-3.99 1.15-3.05 0-5.64-2-6.56-4.78l-.14.01-3.56 2.75-.05.13C3.6 21.05 7.5 23.5 12 23.5Z"
      />
      <path
        fill="#FBBC05"
        d="M5.44 14.28a6.9 6.9 0 0 1-.38-2.28c0-.79.14-1.56.37-2.28l-.01-.15-3.6-2.8-.12.06A11.5 11.5 0 0 0 .5 12c0 1.85.45 3.6 1.24 5.13l3.7-2.85Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.72c2.16 0 3.62.93 4.45 1.71l3.25-3.17C17.7 1.36 15.11.25 12 .25 7.5.25 3.6 2.7 1.86 6.34l3.58 2.79c.93-2.78 3.52-4.41 6.56-4.41Z"
      />
    </svg>
  );
}

export function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M20.3 4.9A18.4 18.4 0 0 0 15.7 3.4c-.2.4-.5.9-.6 1.3a17 17 0 0 0-6.2 0c-.2-.4-.4-.9-.6-1.3-1.6.3-3.2.8-4.6 1.5C1 8.9.4 12.8.7 16.6c1.9 1.4 3.7 2.2 5.5 2.8.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.7-.9.1-.1.3-.2.4-.3 3.4 1.6 7 1.6 10.3 0 .1.1.3.2.4.3-.5.3-1.1.6-1.7.9.3.7.7 1.3 1.1 1.9 1.8-.6 3.6-1.4 5.5-2.8.4-4.4-.7-8.3-2.3-11.7ZM8.9 14.4c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1Zm6.2 0c-1 0-1.9-.9-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1Z" />
    </svg>
  );
}

export function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" />
    </svg>
  );
}

export function YoutubeIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M23 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.5.4A3 3 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a3 3 0 0 0 2.1 2.1c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4A3 3 0 0 0 22.6 17c.4-1.6.4-5 .4-5ZM9.8 15.5v-7l6 3.5-6 3.5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.75h5V21h-5V9.75Zm8 0h4.8v1.54h.07c.67-1.2 2.3-2.47 4.73-2.47 5.06 0 6 3.3 6 7.6V21h-5v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v5.8h-5V9.75Z" />
    </svg>
  );
}

export function MoonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        d="M4 12h15M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path
        d="M4 12.5l5.5 5.5L20 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path
        d="M12 3l7 3v5.5c0 4.6-3 8.4-7 9.5-4-1.1-7-4.9-7-9.5V6l7-3Z"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LayersIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="m12 3 9 5-9 5-9-5 9-5Z" strokeLinejoin="round" />
      <path d="m3 13 9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CookieIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-label="hidden"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14" cy="9" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="13" cy="14" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
