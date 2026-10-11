"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
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
  /**
   * No white surface of its own: the children draw their own (e.g. a `Card`). The panel then
   * never clips them, so tilt and glow effects reach past the edges, and tall content scrolls
   * inside the viewport instead.
   */
  bare?: boolean;
  /** Accessible name for the dialog (use when the children have no visible heading). */
  label?: string;
  /** Id of the element that names the dialog, when it has a visible heading. */
  labelledBy?: string;
};

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

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
  bare = false,
  label,
  labelledBy,
}: CenteredModalProps) {
  const { isOpen, close } = useNavigationFeature();
  const open = isOpen(modalId);
  const panelRef = useRef<HTMLDivElement>(null);

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

  // Keyboard focus: move into the dialog, keep Tab inside it, and give focus back to whatever
  // opened it. Without this, Tab walks into the page hidden behind the backdrop.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = () =>
      [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (element) => element.offsetParent !== null,
      );
    (
      panel.querySelector<HTMLElement>("[data-autofocus]") ??
      focusables()[0] ??
      panel
    ).focus();

    const trap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) {
        event.preventDefault();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      opener?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      style={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={labelledBy ? undefined : label}
      aria-labelledby={labelledBy}
    >
      {/* Backdrop */}
      <div
        style={styles.overlay}
        onClick={closeOnOverlay ? () => close(modalId) : undefined}
        aria-hidden="true"
      />

      {/* Panel wrapper — flex center */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: pointer-only backdrop dismissal; Esc is the keyboard path */}
      <div
        style={bare ? styles.layoutScroll : styles.layout}
        onMouseDown={
          bare && closeOnOverlay
            ? (event) => {
                if (event.target === event.currentTarget) close(modalId);
              }
            : undefined
        }
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          style={bare ? styles.panelBare(maxWidth) : styles.panel(maxWidth)}
        >
          {children}
        </div>
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

  // Bare: the layer itself scrolls (so nothing the children do is clipped), and `margin: auto`
  // on the panel centres it when it fits and lets it scroll from the top when it does not.
  layoutScroll: {
    display: "flex",
    width: "100%",
    height: "100%",
    padding: "24px 16px",
    overflowY: "auto",
  } satisfies CSSProperties,

  panelBare: (maxWidth: CSSProperties["maxWidth"]): CSSProperties => ({
    position: "relative",
    width: "100%",
    maxWidth,
    margin: "auto",
    outline: "none",
    animation: "centeredModalIn 0.22s cubic-bezier(0.34,1.56,0.64,1)",
  }),

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
