import {
  type BillingPeriod,
  type PlanPrice,
  priceConfig,
} from "@/packages/configs/price.config";

const formatter = new Intl.NumberFormat(priceConfig.locale, {
  style: "currency",
  currency: priceConfig.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** 19 -> "$19", 0 -> the config's free label. */
export const formatPrice = (amount: number): string =>
  amount === 0 ? priceConfig.freeLabel : formatter.format(amount);

export const amountFor = (price: PlanPrice, period: BillingPeriod): number =>
  price[period];

/** Whole-number percent saved by paying yearly, or 0 when there is no saving. */
export const yearlySavingPercent = (price: PlanPrice): number => {
  const full = price.monthly * 12;
  if (full <= 0 || price.yearly >= full) return 0;
  return Math.round((1 - price.yearly / full) * 100);
};
