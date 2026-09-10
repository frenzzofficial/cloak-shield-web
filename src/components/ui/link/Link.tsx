import { cva, type VariantProps } from "class-variance-authority";
import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/packages/utils/cn";

const linkVariants = cva("transition-colors", {
  variants: {
    variant: {
      primary: [
        "btn-gradient flex items-center gap-1.5 rounded-full",
        "px-5 py-2.5 text-[14px] font-medium text-[#02121f]",
        "shadow-glow transition-transform",
        "hover:scale-[1.03]",
        "motion-reduce:transition-none motion-reduce:hover:scale-100",
      ],
      secondary: [
        "relative inline-flex w-fit pb-1",
        "text-[14.5px]",
        "text-slate-400 hover:text-slate-200",
        "after:absolute after:bottom-[-2px] after:left-1/2",
        "after:h-0.5 after:w-0 after:-translate-x-1/2",
        "after:rounded-full after:bg-primary-500",
        "after:transition-[width] after:duration-300 after:ease-out",
        "hover:after:w-full",
      ],
      outline: [
        "rounded-lg border border-primary-500/40 px-6 py-3 text-[14.5px] font-semibold text-primary-400 transition-colors hover:border-primary-500 hover:text-primary-300",
      ],
    },
    active: { true: "text-white after:w-full", false: "" },
  },
  defaultVariants: { variant: "primary", active: false },
});
type LinkPropsWithVariants = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  VariantProps<typeof linkVariants>;
const Link = ({
  className,
  children,
  variant,
  active,
  ...props
}: LinkPropsWithVariants) => {
  return (
    <NextLink
      {...props}
      className={cn(linkVariants({ variant, active }), className)}
    >
      {" "}
      {children}{" "}
    </NextLink>
  );
};
export default Link;
