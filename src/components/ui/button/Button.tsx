import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/packages/utils/cn";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        "btn-gradient",
        "flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5",
        "text-[14px] font-medium text-[#02121f]",
        "shadow-glow transition-transform",
        "hover:scale-[1.03]",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
        "cursor-pointer",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
