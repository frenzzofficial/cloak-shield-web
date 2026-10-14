import { z } from "zod";

// Prices and the money settings behind the pricing section. Change them in .env.local (or in
// the Vercel project settings) and redeploy; no code edit needed. Plan names and feature lists
// stay in configs/price.config.ts.
//
// NEXT_PUBLIC_ means every value is inlined into the browser bundle at BUILD time: they are
// public by design (a price is shown to everyone), so never put a secret here, and a changed
// value only shows up after a new build.

/** An unset or blank variable falls back to the default instead of becoming 0 or "". */
const blankToUndefined = (value: unknown) => (value === "" ? undefined : value);

const amount = (fallback: number) =>
  z.preprocess(blankToUndefined, z.coerce.number().min(0).default(fallback));

const text = <T extends z.ZodType>(schema: T) =>
  z.preprocess(blankToUndefined, schema);

const priceEnvSchema = z.object({
  NEXT_PUBLIC_PRICE_CURRENCY: text(
    z
      .string()
      .length(3, "must be a 3-letter ISO currency code, e.g. USD or INR")
      .transform((code) => code.toUpperCase())
      .refine((code) => {
        try {
          new Intl.NumberFormat("en", { style: "currency", currency: code });
          return true;
        } catch {
          return false;
        }
      }, "is not a currency code this runtime knows")
      .default("USD"),
  ),
  NEXT_PUBLIC_PRICE_LOCALE: text(
    z
      .string()
      .refine((tag) => {
        try {
          new Intl.NumberFormat(tag);
          return true;
        } catch {
          return false;
        }
      }, "is not a valid locale tag, e.g. en-US or en-IN")
      .default("en-US"),
  ),
  NEXT_PUBLIC_PRICE_DEFAULT_PERIOD: text(
    z.enum(["monthly", "yearly"]).default("monthly"),
  ),
  NEXT_PUBLIC_PRICE_STARTER_MONTHLY: amount(0),
  NEXT_PUBLIC_PRICE_STARTER_YEARLY: amount(0),
  NEXT_PUBLIC_PRICE_PRO_MONTHLY: amount(19),
  NEXT_PUBLIC_PRICE_PRO_YEARLY: amount(190),
  NEXT_PUBLIC_PRICE_SALES_EMAIL: text(z.email().default("")),
});

// ✅ Validate process.env
// Each variable is read by its full name on purpose. Next.js only inlines literal
// `process.env.NEXT_PUBLIC_X` reads into the browser bundle; handing it the whole `process.env`
// object works on the server but leaves every value undefined in client components (this one is
// used by the pricing cards, which are client components).
const parsed = priceEnvSchema.safeParse({
  NEXT_PUBLIC_PRICE_CURRENCY: process.env.NEXT_PUBLIC_PRICE_CURRENCY,
  NEXT_PUBLIC_PRICE_LOCALE: process.env.NEXT_PUBLIC_PRICE_LOCALE,
  NEXT_PUBLIC_PRICE_DEFAULT_PERIOD:
    process.env.NEXT_PUBLIC_PRICE_DEFAULT_PERIOD,
  NEXT_PUBLIC_PRICE_STARTER_MONTHLY:
    process.env.NEXT_PUBLIC_PRICE_STARTER_MONTHLY,
  NEXT_PUBLIC_PRICE_STARTER_YEARLY:
    process.env.NEXT_PUBLIC_PRICE_STARTER_YEARLY,
  NEXT_PUBLIC_PRICE_PRO_MONTHLY: process.env.NEXT_PUBLIC_PRICE_PRO_MONTHLY,
  NEXT_PUBLIC_PRICE_PRO_YEARLY: process.env.NEXT_PUBLIC_PRICE_PRO_YEARLY,
  NEXT_PUBLIC_PRICE_SALES_EMAIL: process.env.NEXT_PUBLIC_PRICE_SALES_EMAIL,
});

if (!parsed.success) {
  throw new Error(
    `❌ Invalid Price environment variables:\n${parsed.error.issues
      .map((i) => `• ${i.path.join(".")}: ${i.message}`)
      .join("\n")}`,
  );
}

// ✅ Map validated vars to clean keys
export const envPriceConfig = Object.freeze({
  CURRENCY: parsed.data.NEXT_PUBLIC_PRICE_CURRENCY,
  LOCALE: parsed.data.NEXT_PUBLIC_PRICE_LOCALE,
  DEFAULT_PERIOD: parsed.data.NEXT_PUBLIC_PRICE_DEFAULT_PERIOD,
  STARTER_MONTHLY: parsed.data.NEXT_PUBLIC_PRICE_STARTER_MONTHLY,
  STARTER_YEARLY: parsed.data.NEXT_PUBLIC_PRICE_STARTER_YEARLY,
  PRO_MONTHLY: parsed.data.NEXT_PUBLIC_PRICE_PRO_MONTHLY,
  PRO_YEARLY: parsed.data.NEXT_PUBLIC_PRICE_PRO_YEARLY,
  SALES_EMAIL: parsed.data.NEXT_PUBLIC_PRICE_SALES_EMAIL,
});

// ✅ Optional: Type-safe config
export type EnvPriceConfig = typeof envPriceConfig;
