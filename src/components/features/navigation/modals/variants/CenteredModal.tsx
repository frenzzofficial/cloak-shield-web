"use client";

import { type CSSProperties, type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDrawerEscape } from "@/packages/hooks/useDrawer";
import { useNavigationFeature } from "../../NavigationProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

type CenteredModalProps = {
  modalId: string;
  children: ReactNode;
  /** Whether clicking the backdrop closes the modal. Defaults to true. */
  closeOnOverlay?: boolean;
  /** Max width of the modal panel. Defaults to "32rem". */
  maxWidth?: CSSProperties["maxWidth"];
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * CenteredModal
 *
 * A classic global modal. Rendered into document.body via a portal.
 * Locks body scroll while open. Darkened backdrop with blur.
 *
 * @example
 * <CenteredModal modalId="confirm-delete" closeOnOverlay>
 *   <ConfirmDeleteForm />
 * </CenteredModal>
 */
export default function CenteredModal({
  modalId,
  children,
  closeOnOverlay = true,
  maxWidth = "32rem",
}: CenteredModalProps) {
  const { isOpen, close } = useNavigationFeature();
  const open = isOpen(modalId);

  useDrawerEscape(() => close(modalId), open);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div style={styles.root} role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        style={styles.overlay}
        onClick={closeOnOverlay ? () => close(modalId) : undefined}
        aria-hidden="true"
      />

      {/* Panel wrapper — flex center */}
      <div style={styles.layout}>
        <div style={styles.panel(maxWidth)}>{children}</div>
      </div>

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
  } satisfies CSSProperties,

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
  } satisfies CSSProperties,

  layout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "16px",
    pointerEvents: "none",
  } satisfies CSSProperties,

  panel: (maxWidth: CSSProperties["maxWidth"]): CSSProperties => ({
    position: "relative",
    width: "100%",
    maxWidth,
    maxHeight: "90vh",
    overflowY: "auto",
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
    animation: "centeredModalIn 0.22s cubic-bezier(0.34,1.56,0.64,1)",
    pointerEvents: "all",
  }),
} as const;

const KEYFRAMES = `
  @keyframes centeredModalIn {
    from { opacity: 0; transform: scale(0.94) translateY(8px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);   }
  }
`;
