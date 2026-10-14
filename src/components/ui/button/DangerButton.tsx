import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/packages/utils/cn";

type DangerButtonProps = ComponentPropsWithoutRef<"button">;

/** Same shape as Button, in the destructive color: for actions that cannot be undone. */
const DangerButton = ({ className, children, ...props }: DangerButtonProps) => (
  <button
    {...props}
    className={cn(
      "flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5",
      "bg-destructive text-[14px] font-medium text-white",
      "transition-[transform,opacity] hover:opacity-90",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "motion-reduce:transition-none",
      "cursor-pointer",
      className,
    )}
  >
    {children}
  </button>
);

export default DangerButton;
