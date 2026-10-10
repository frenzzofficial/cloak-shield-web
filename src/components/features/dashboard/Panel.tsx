import type { ReactNode } from "react";
import { cn } from "@/packages/utils/cn";

interface PanelProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** The one surface every dashboard block sits on: glassy dark card, thin border, soft glow. */
const Panel = ({
  title,
  subtitle,
  icon,
  action,
  className,
  children,
}: PanelProps) => (
  <section
    className={cn(
      "relative overflow-hidden rounded-2xl border border-white/8 bg-[#080d16]/80 p-5 backdrop-blur-sm",
      "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_20px_50px_-30px_rgba(0,0,0,0.9)]",
      className,
    )}
  >
    {(title || action) && (
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              {icon}
            </span>
          )}
          <div>
            <h2 className="text-[15px] font-semibold text-foreground">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {action}
      </header>
    )}
    {children}
  </section>
);

export default Panel;
