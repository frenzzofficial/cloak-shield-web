"use client";

import { type CSSProperties, useRef } from "react";
import { Button } from "@/components/ui";
import { useNavigationFeature } from "../NavigationProvider";
import CenteredModal from "./variants/CenteredModal";
import ContainedModal from "./variants/ContainedModal";
import FullscreenModal from "./variants/FullscreenModal";

//  Modal Example
export const ModalPage = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Modal Examples</h1>

      <Section title="1 · Centered (global)">
        <CenteredExample />
      </Section>

      <Section title="2 · Fullscreen">
        <FullscreenExample />
      </Section>

      <Section title="3 · Contained (scoped)">
        <ContainedExample />
      </Section>
    </div>
  );
};

export default ModalPage;

//  Shared Section
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section style={styles.section}>
      <h3>{title}</h3>
      {children}
    </section>
  );
};

//  Shared Modal Content
type ModalContentProps = {
  title: string;
  message: string;
  actions: string[];

  onClose: (id: string) => void;
};

const ModalContent = ({
  title,
  message,
  actions,
  onClose,
}: ModalContentProps) => {
  return (
    <div style={styles.modalCard}>
      <h3 style={styles.modalTitle}>{title}</h3>

      <p style={styles.modalBody}>{message}</p>

      <div style={styles.modalFooter}>
        {actions.map((action) => (
          <Button key={action} onClick={() => onClose(action)}>
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
};

//  Centered Example

const CenteredExample = () => {
  const { open, close } = useNavigationFeature();

  return (
    <>
      <Button onClick={() => open("centered-demo")}>Open centered modal</Button>

      <CenteredModal modalId="centered-demo" maxWidth="28rem">
        <ModalContent
          title="Confirm action"
          message="This is a standard centered dialog. The rest of the app is locked while it is open."
          actions={["Cancel", "Confirm"]}
          onClose={() => close("centered-demo")}
        />
      </CenteredModal>
    </>
  );
};

//  Fullscreen Example
const FullscreenExample = () => {
  const { open, close } = useNavigationFeature();

  return (
    <>
      <Button onClick={() => open("fullscreen-demo")}>
        Open fullscreen modal
      </Button>

      <FullscreenModal modalId="fullscreen-demo">
        <div style={styles.fullscreenRoot}>
          <header style={styles.fullscreenHeader}>
            <span style={styles.fullscreenLogo}>⬛ Editor</span>

            <Button onClick={() => close("fullscreen-demo")}>✕ Close</Button>
          </header>

          <main style={styles.fullscreenMain}>
            <p style={styles.fullscreenHint}>
              This panel fills the entire screen. Press Esc or click Close to
              exit.
            </p>
          </main>
        </div>
      </FullscreenModal>
    </>
  );
};

//  Contained Example
const ContainedExample = () => {
  const { open, close } = useNavigationFeature();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div style={styles.dashboard} className="card">
      <div ref={containerRef} style={styles.dashboardPanel}>
        <div style={styles.dashboardPanelHeader}>
          <span>Data panel</span>

          <Button onClick={() => open("contained-demo")}>Open settings</Button>
        </div>

        <p style={styles.dashboardBody}>
          Regular panel content. The modal below will appear inside this box,
          not over the whole app.
        </p>

        <ContainedModal modalId="contained-demo" containerRef={containerRef}>
          <ModalContent
            title="Panel settings"
            message="This modal is scoped entirely inside the data panel above."
            actions={["Dismiss", "Apply"]}
            onClose={() => close("contained-demo")}
          />
        </ContainedModal>
      </div>
    </div>
  );
};

//  Styles
const styles: Record<string, CSSProperties> = {
  page: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "2rem 1rem",
  },

  title: {
    marginBottom: "2rem",
  },

  section: {
    marginBottom: "2rem",
  },

  modalCard: {
    padding: "1.5rem",
    background: "hsl(var(--card, 0 0% 100%))",

    border: "1px solid hsl(var(--border, 0 0% 90%))",

    borderRadius: 16,
  },

  modalTitle: {
    margin: "0 0 0.5rem",
    fontSize: "1.125rem",
    fontWeight: 700,
  },

  modalBody: {
    margin: "0 0 1.5rem",
    color: "hsl(var(--foreground, 0 0% 20%) / 0.7)",
  },

  modalFooter: {
    display: "flex",
    gap: 8,
    justifyContent: "flex-end",
  },

  fullscreenRoot: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  fullscreenHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "1rem 1.5rem",

    borderBottom: "1px solid #e5e7eb",
  },

  fullscreenLogo: {
    fontWeight: 700,
  },

  fullscreenMain: {
    flex: 1,

    display: "flex",

    alignItems: "center",
    justifyContent: "center",
  },

  fullscreenHint: {
    color: "#555",
    textAlign: "center",
  },

  dashboard: {
    height: 360,
  },

  dashboardPanel: {
    position: "relative",

    height: "100%",

    padding: "1rem",

    overflow: "hidden",

    borderRadius: 16,
  },

  dashboardPanelHeader: {
    display: "flex",

    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: 12,

    fontWeight: 600,
  },

  dashboardBody: {
    fontSize: "0.875rem",

    lineHeight: 1.6,

    color: "hsl(var(--foreground, 0 0% 20%) / 0.7)",
  },
};
