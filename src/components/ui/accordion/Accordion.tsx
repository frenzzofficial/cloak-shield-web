"use client";

import { type ReactNode, useId, useState } from "react";
import { ChevronRightIcon } from "@/components/ui/icon/Icons";
import { cn } from "@/packages/utils/cn";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: readonly AccordionItem[];
  /** Let several items stay open at once. By default opening one closes the others. */
  multiple?: boolean;
  /** Ids open on first render. */
  defaultOpen?: readonly string[];
  className?: string;
}

/** Disclosure list: each title is a real button with aria-expanded, so it works by keyboard. */
const Accordion = ({
  items,
  multiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) => {
  const uid = useId();
  const [openIds, setOpenIds] = useState<readonly string[]>(defaultOpen);

  const toggle = (id: string) =>
    setOpenIds((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      return multiple ? [...current, id] : [id];
    });

  return (
    <div
      className={cn(
        "divide-y divide-white/8 overflow-hidden rounded-2xl border border-white/8 bg-[#080d16]/80",
        className,
      )}
    >
      {items.map((item) => {
        const open = openIds.includes(item.id);
        const buttonId = `${uid}-${item.id}-button`;
        const panelId = `${uid}-${item.id}-panel`;
        return (
          <div key={item.id} id={item.id} className="scroll-mt-24">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-white/3 focus-visible:bg-white/3 focus-visible:outline-none sm:text-base"
              >
                <span>{item.title}</span>
                <ChevronRightIcon
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none",
                    open && "rotate-90 text-primary",
                  )}
                />
              </button>
            </h3>
            <section
              id={panelId}
              aria-labelledby={buttonId}
              inert={!open}
              className={cn(
                "grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none",
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm text-muted-foreground">
                  {item.content}
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
