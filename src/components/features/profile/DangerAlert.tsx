import type { ReactNode } from "react";
import { AlertIcon } from "@/components/ui/icons/Icons";

/** The red warning box shared by the Danger Zone block and the delete dialog. */
const DangerAlert = ({ children }: { children: ReactNode }) => (
  <div
    role="alert"
    className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm"
  >
    <AlertIcon className="mt-0.5 size-5 shrink-0 text-destructive" />
    <div className="text-foreground/90">{children}</div>
  </div>
);

export default DangerAlert;
