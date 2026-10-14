"use client";

import { useState } from "react";
import { Link } from "@/components/ui";
import { CheckIcon } from "@/components/ui/icon/Icons";
import {
  type BillingPeriod,
  PLANS,
  priceConfig,
} from "@/packages/configs/price.config";
import { cn } from "@/packages/utils/cn";
import {
  amountFor,
  formatPrice,
  yearlySavingPercent,
} from "@/packages/utils/price.utils";

const PERIODS: readonly { id: BillingPeriod; label: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

/** The yearly option only appears when at least one plan actually saves money on it. */
const bestSaving = Math.max(
  0,
  ...PLANS.map((plan) => (plan.price ? yearlySavingPercent(plan.price) : 0)),
);

const PricingPlans = () => {
  const [period, setPeriod] = useState<BillingPeriod>(
    priceConfig.defaultPeriod,
  );
  const showToggle = PLANS.some((plan) => plan.price && plan.price.yearly > 0);

  return (
    <>
      {showToggle && (
        <fieldset className="mx-auto mt-8 flex w-fit gap-1 rounded-full border border-white/10 bg-white/3 p-1">
          <legend className="sr-only">Billing period</legend>
          {PERIODS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={period === id}
              onClick={() => setPeriod(id)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                period === id
                  ? "bg-primary/20 text-white"
                  : "text-slate-400 hover:text-slate-200",
              )}
            >
              {label}
              {id === "yearly" && bestSaving > 0 && (
                <span className="ml-2 text-[11px] text-primary">
                  Save {bestSaving}%
                </span>
              )}
            </button>
          ))}
        </fieldset>
      )}

      <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {PLANS.map((plan) => {
          const amount = plan.price ? amountFor(plan.price, period) : null;
          return (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-[#080d16]/95 p-7",
                plan.highlighted
                  ? "border-primary/50 shadow-[0_0_50px_-20px_rgba(51,191,242,0.5)]"
                  : "border-white/10",
              )}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-0.5 text-[11px] font-semibold text-[#02121f]">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="mt-1 text-[13px] text-slate-400">
                {plan.description}
              </p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-white">
                  {amount === null
                    ? priceConfig.customLabel
                    : formatPrice(amount)}
                </span>
                {amount !== null && amount > 0 && (
                  <span className="text-[13px] text-slate-500">
                    / {period === "monthly" ? "month" : "year"}
                  </span>
                )}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3 text-[13.5px] text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.cta.href}
                variant={plan.highlighted ? "primary" : "outline"}
                className="mt-8 justify-center text-center"
              >
                {plan.cta.label}
              </Link>
            </article>
          );
        })}
      </div>
    </>
  );
};

export default PricingPlans;
