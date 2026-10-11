import type { ReactNode } from "react";

interface InfoRowProps {
  icon?: ReactNode;
  label: string;
  children: ReactNode;
}

/** One "label … value" line inside a Panel. */
const InfoRow = ({ icon, label, children }: InfoRowProps) => (
  <div className="flex items-center justify-between gap-4 border-b border-white/5 py-3 text-sm last:border-b-0">
    <span className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-muted-foreground">
      {icon && <span className="size-4 text-muted-foreground/80">{icon}</span>}
      {label}
    </span>
    <span className="min-w-0 wrap-break-word text-right font-medium text-foreground">
      {children}
    </span>
  </div>
);

export default InfoRow;
