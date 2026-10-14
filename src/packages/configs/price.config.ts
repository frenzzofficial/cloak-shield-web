// The pricing section reads everything from here. The money values (amounts, currency, locale,
// sales email) come from environment variables, see packages/env/price.env.ts and .env.example.
// Plan names, descriptions and feature lists live in this file.

import { envPriceConfig } from "@/packages/env/price.env";

export type BillingPeriod = "monthly" | "yearly";

export interface PlanPrice {
  /** Per month, billed monthly. */
  monthly: number;
  /** Per year, billed once a year. Set it below monthly * 12 to offer a discount. */
  yearly: number;
}

export interface PricePlan {
  id: string;
  name: string;
  description: string;
  /** `null` means "no listed price": the card shows `customLabel` and a contact button. */
  price: PlanPrice | null;
  features: readonly string[];
  cta: { label: string; href: string };
  /** The plan the page nudges people towards. At most one. */
  highlighted?: boolean;
  badge?: string;
}

export const priceConfig = {
  /** ISO 4217 code, passed to Intl.NumberFormat. From NEXT_PUBLIC_PRICE_CURRENCY. */
  currency: envPriceConfig.CURRENCY,
  /** BCP 47 locale for number formatting, e.g. "en-IN". From NEXT_PUBLIC_PRICE_LOCALE. */
  locale: envPriceConfig.LOCALE,
  defaultPeriod: envPriceConfig.DEFAULT_PERIOD as BillingPeriod,
  freeLabel: "Free",
  customLabel: "Custom",
  /** Where "contact us" buttons send mail. While empty they go to /signup instead. */
  salesEmail: envPriceConfig.SALES_EMAIL,
  eyebrow: "PRICING",
  title: "Simple pricing that grows with you",
  description:
    "Start free, upgrade when you need more. No hidden fees, cancel any time.",
} as const;

const contactHref = priceConfig.salesEmail
  ? `mailto:${priceConfig.salesEmail}`
  : "/signup";

export const PLANS: readonly PricePlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For side projects and trying things out.",
    price: {
      monthly: envPriceConfig.STARTER_MONTHLY,
      yearly: envPriceConfig.STARTER_YEARLY,
    },
    features: [
      "Email and password sign-in",
      "Email verification",
      "HTTP-only cookie sessions",
      "Community support",
    ],
    cta: { label: "Get started free", href: "/signup" },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For products with real users.",
    price: {
      monthly: envPriceConfig.PRO_MONTHLY,
      yearly: envPriceConfig.PRO_YEARLY,
    },
    features: [
      "Everything in Starter",
      "Google sign-in",
      "Safe email change and confirmation",
      "Active device and session overview",
      "Audit trail of account events",
      "Rate-limited, CSRF-protected endpoints",
      "Priority email support",
    ],
    cta: { label: "Start with Pro", href: "/signup" },
    highlighted: true,
    badge: "Most popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For teams with custom security needs.",
    price: null,
    features: [
      "Everything in Pro",
      "Custom backend runtime and hosting",
      "Security review and onboarding help",
      "Custom roles and access rules",
      "Dedicated support",
    ],
    cta: { label: "Contact us", href: contactHref },
  },
];
