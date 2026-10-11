"use client";

import { type CSSProperties, type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigationFeature } from "../../NavigationProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

type FullscreenModalProps = {
  modalId: string;
  children: ReactNode;
  /**
   * Whether pressing the Escape key closes the modal.
   * Defaults to true.
   */
  closeOnEscape?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * FullscreenModal
 *
 * Takes over the entire viewport. No backdrop — the panel itself IS the screen.
 * Locks body scroll while open. Escape key closes by default.
 *
 * @example
 * <FullscreenModal modalId="image-lightbox">
 *   <LightboxViewer />
 * </FullscreenModal>
 */
export default function FullscreenModal({
  modalId,
  children,
  closeOnEscape = true,
}: FullscreenModalProps) {
  const { isOpen, close } = useNavigationFeature();
  const open = isOpen(modalId);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(modalId);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEscape, close, modalId]);

  if (!open) return null;

  return createPortal(
    <div style={styles.root} role="dialog" aria-modal="true">
      {children}
      <style>{KEYFRAMES}</style>
    </div>,
    document.body,
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  root: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    background: "hsl(var(--background))",
    animation: "fullscreenModalIn 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
  } satisfies CSSProperties,
} as const;

const KEYFRAMES = `
  @keyframes fullscreenModalIn {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
`;
