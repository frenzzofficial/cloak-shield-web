import PricingPlans from "@/components/features/pricing/PricingPlans";
import { priceConfig } from "@/packages/configs/price.config";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-white/5 bg-[#02040a] py-20"
    >
      <div className="mx-auto max-w-300 px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="eyebrow mb-4 text-[12px] font-medium text-foreground-muted">
            {priceConfig.eyebrow}
          </p>
          <h2 className="text-[30px] font-bold leading-tight text-white sm:text-[34px]">
            {priceConfig.title}
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-slate-400">
            {priceConfig.description}
          </p>
        </div>
        <PricingPlans />
      </div>
    </section>
  );
}
