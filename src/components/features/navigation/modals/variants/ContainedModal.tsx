"use client";

import {
  type CSSProperties,
  type ReactNode,
  type RefObject,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useNavigationFeature } from "../../NavigationProvider";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContainedModalProps = {
  modalId: string;
  children: ReactNode;
  /**
   * Ref to the element that will act as the portal mount point.
   * Parent element MUST have `position: relative` (or any non-static position)
   * so the modal is constrained inside it.
   */
  containerRef: RefObject<HTMLElement | null>;
  closeOnOverlay?: boolean;
};

// ─── Component ────────────────────────────────────────────────────────────────

//  ContainedModal
//  Renders a modal scoped entirely inside a parent container.
//  The rest of the app remains interactive — no global overlay, no scroll lock.

export const ContainedModal = ({
  modalId,
  children,
  containerRef,
  closeOnOverlay = true,
}: ContainedModalProps) => {
  const { isOpen, close } = useNavigationFeature();
  const open = isOpen(modalId);

  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(containerRef.current);
  }, [containerRef]);
  // ──────────────────────────────────────────────────────────────────────────

  // No portal target yet (before mount) or modal is closed → render nothing
  if (!open || !portalTarget) return null;

  return createPortal(
    <div style={styles.root} role="dialog" aria-modal="true">
      {/* Scoped backdrop — does NOT cover the rest of the app */}
      <div
        style={styles.overlay}
        onClick={closeOnOverlay ? () => close(modalId) : undefined}
        aria-hidden="true"
      />

      {/* Panel centered inside the container */}
      <div style={styles.layout}>
        <div style={styles.panel}>{children}</div>
      </div>

      <style>{KEYFRAMES}</style>
    </div>,
    portalTarget,
  );
};

export default ContainedModal;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  root: {
    position: "absolute",
    inset: 0,
    zIndex: 100,
  } satisfies CSSProperties,

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(3px)",
  } satisfies CSSProperties,

  layout: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    pointerEvents: "none",
  } satisfies CSSProperties,

  panel: {
    position: "relative",
    width: "100%",
    maxWidth: "28rem",
    maxHeight: "90%",
    overflowY: "auto",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 20px 40px -8px rgba(0,0,0,0.22)",
    animation: "containedModalIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
    pointerEvents: "all",
  } satisfies CSSProperties,
} as const;

const KEYFRAMES = `
  @keyframes containedModalIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1);    }
  }
`;
