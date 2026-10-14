"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { Button, Card } from "@/components/ui";
import { CloseIcon } from "@/components/ui/icons/Icons";

interface ProfileModalFrameProps {
  titleId: string;
  onClose: () => void;
  icon: ReactNode;
  title: string;
  description: string;
  /** False while the form's data is still loading; focus moves into the form once it is true. */
  ready?: boolean;
  children: ReactNode;
}

/** The look every account dialog shares: card, close button, icon, heading, description. */
export const ProfileModalFrame = ({
  titleId,
  onClose,
  icon,
  title,
  description,
  ready = true,
  children,
}: ProfileModalFrameProps) => {
  const bodyRef = useRef<HTMLDivElement>(null);

  // The dialog focuses its [data-autofocus] field when it opens, but a form that loads its data
  // first does not exist yet at that moment: focus it as soon as it does.
  useEffect(() => {
    if (ready)
      bodyRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
  }, [ready]);

  return (
    <Card className="p-7 sm:p-8">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-0 right-0 flex size-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/3 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <CloseIcon className="size-4.5" />
      </button>

      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25 shadow-[0_0_30px_-8px_var(--primary)]">
        {icon}
      </span>

      <h2
        id={titleId}
        className="mt-5 text-2xl font-semibold tracking-tight sm:text-[28px]"
      >
        {title}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>

      <div ref={bodyRef}>{children}</div>
    </Card>
  );
};

/** Cancel + submit, for the `renderActions` slot of a form inside a dialog. */
export const modalActions =
  (onClose: () => void) =>
  ({ pending, submitLabel }: { pending: boolean; submitLabel: string }) => (
    <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
      <Button
        type="button"
        onClick={onClose}
        className="btn-outline flex-1"
        disabled={pending}
      >
        Cancel
      </Button>
      <Button type="submit" className="flex-[1.4]" disabled={pending}>
        {submitLabel}
      </Button>
    </div>
  );

/** Shown instead of a form while its data loads or when loading failed. */
export const ModalStatus = ({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => (
  <div className="mt-6 flex flex-col items-start gap-3 text-sm text-muted-foreground">
    {message ? (
      <>
        <p role="alert" className="text-destructive">
          {message}
        </p>
        {onRetry && (
          <Button type="button" onClick={onRetry} className="btn-outline">
            Try again
          </Button>
        )}
      </>
    ) : (
      <output>Loading…</output>
    )}
  </div>
);
