import { Card } from "@/components/ui";
import {
  ClockIcon,
  CookieIcon,
  MailIcon,
  MonitorIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/ui/icon/Icons";
import {
  FEATURES,
  type FeatureIconName,
  featuresConfig,
} from "@/packages/configs/features.config";

const ICONS: Record<FeatureIconName, typeof UserIcon> = {
  cookie: CookieIcon,
  mail: MailIcon,
  user: UserIcon,
  monitor: MonitorIcon,
  clock: ClockIcon,
  shield: ShieldCheckIcon,
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative border-t border-white/5 bg-[#03060c] py-20"
    >
      <div className="mx-auto max-w-300 px-6">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow mb-4 text-[12px] font-medium text-foreground-muted">
              {featuresConfig.eyebrow}
            </p>
            <h2 className="max-w-md text-[30px] font-bold leading-tight text-white sm:text-[34px]">
              {featuresConfig.title}
            </h2>
          </div>
          <p className="max-w-95 text-[14.5px] leading-relaxed text-slate-400">
            {featuresConfig.description}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = ICONS[feature.icon];
            return (
              <Card key={feature.id}>
                <span className="mb-4 flex h-9 w-9 items-center justify-center text-foreground-muted">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-[15px] font-semibold leading-snug text-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
