// The "best features" cards on the home page. Add or reorder items here. `icon` picks one of the
// icons mapped in components/features/home/sections/Features.tsx.

export type FeatureIconName =
  | "cookie"
  | "mail"
  | "user"
  | "monitor"
  | "clock"
  | "shield";

export interface FeatureItem {
  id: string;
  icon: FeatureIconName;
  title: string;
  description: string;
}

export const featuresConfig = {
  eyebrow: "BEST FEATURES",
  title: "Everything You Need for Secure Authentication",
  description:
    "The parts of sign-in that are easy to get wrong, already built, tested and ready to use.",
} as const;

export const FEATURES: readonly FeatureItem[] = [
  {
    id: "cookie-sessions",
    icon: "cookie",
    title: "HTTP-only cookie sessions",
    description:
      "Tokens live in secure, HTTP-only cookies that page scripts cannot read, and renew themselves quietly.",
  },
  {
    id: "email-flows",
    icon: "mail",
    title: "Complete email flows",
    description:
      "Verify your email, reset a forgotten password, and change your address safely through a confirmation link.",
  },
  {
    id: "social-signin",
    icon: "user",
    title: "Email and Google sign-in",
    description:
      "Let people sign in with a password or with Google, and add a password later from their dashboard.",
  },
  {
    id: "devices",
    icon: "monitor",
    title: "Know where you are signed in",
    description:
      "See your active devices and your last activity at a glance, and end other sessions when needed.",
  },
  {
    id: "audit",
    icon: "clock",
    title: "Audit trail",
    description:
      "Sensitive actions such as password changes and account deletion leave a record you can review.",
  },
  {
    id: "hardening",
    icon: "shield",
    title: "Hardened by default",
    description:
      "CSRF protection, rate-limited endpoints and strong password rules are on from the first request.",
  },
];
