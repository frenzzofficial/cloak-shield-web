import type { ReactNode } from "react";
import { cn } from "@/packages/utils/cn";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  /** Colours the small dot next to the value. */
  tone?: "ok" | "warn" | "neutral";
  loading?: boolean;
}

const DOT = {
  ok: "bg-chart-2 shadow-[0_0_10px_var(--chart-2)]",
  warn: "bg-chart-4 shadow-[0_0_10px_var(--chart-4)]",
  neutral: "",
} as const;

const StatCard = ({
  icon,
  label,
  value,
  hint,
  tone = "neutral",
  loading = false,
}: StatCardProps) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-[#080d16]/80 p-5 backdrop-blur-sm transition-colors hover:border-primary/30">
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
    />
    <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
      {icon}
    </span>
    <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>

    {loading ? (
      <div className="mt-2 space-y-2" aria-busy="true">
        <div className="h-7 w-24 animate-pulse rounded-md bg-white/8" />
        <div className="h-3 w-32 animate-pulse rounded bg-white/5" />
      </div>
    ) : (
      <>
        <p className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight text-foreground">
          {value}
          {tone !== "neutral" && (
            <span className={cn("size-2 rounded-full", DOT[tone])} />
          )}
        </p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </>
    )}
  </div>
);

export default StatCard;
