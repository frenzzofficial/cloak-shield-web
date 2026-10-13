import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

// Small outline icons (24px grid, 1.8 stroke) so the dashboard needs no icon dependency.
const Icon = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3 5 6v5c0 4.5 3 8.4 7 10 4-1.6 7-5.5 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Icon>
);

export const BadgeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </Icon>
);

export const MonitorIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Icon>
);

export const AtIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
  </Icon>
);

export const KeyIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="m11 12 9-9M16 7l3 3" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
);

export const IdIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="12" r="2" />
    <path d="M14 10h4M14 14h4" />
  </Icon>
);

export const LogOutIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </Icon>
);

export const AlertIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4 2.5 20h19L12 4Z" />
    <path d="M12 10v4M12 17.5v.01" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    <path d="M12 15v2" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
