"use client";

import type { ReactNode } from "react";
import { useNavigationFeature } from "@/components/features/navigation/NavigationProvider";
import {
  AtIcon,
  ChevronRightIcon,
  LockIcon,
  MailIcon,
  MonitorIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@/components/ui/icon/Icons";
import { MODAL_IDS } from "@/packages/configs/modal.config";
import { useAccountSummary } from "@/packages/hooks/useAccountSummary";
import { cn } from "@/packages/utils/cn";
import Panel from "./Panel";

interface QuickAction {
  key: string;
  title: string;
  description: string;
  icon: ReactNode;
  /** Set for actions that exist today. The rest are shown, but cannot be clicked yet. */
  modalId?: string;
}

const ACTIONS: readonly QuickAction[] = [
  {
    key: "profile",
    title: "Update Profile",
    description: "Change your personal information",
    icon: <UserIcon className="size-5" />,
    modalId: MODAL_IDS.updateProfile,
  },
  {
    key: "password",
    title: "Change Password",
    description: "Keep your account secure",
    icon: <LockIcon className="size-5" />,
    modalId: MODAL_IDS.changePassword,
  },
  {
    key: "devices",
    title: "Manage Devices",
    description: "View and manage trusted devices",
    icon: <MonitorIcon className="size-5" />,
  },
  {
    key: "email",
    title: "Email Preferences",
    description: "Configure your notifications",
    icon: <MailIcon className="size-5" />,
    modalId: MODAL_IDS.preferences,
  },
  {
    key: "confirm-email",
    title: "Confirm Email",
    description: "Verify your email address",
    icon: <ShieldCheckIcon className="size-5" />,
    modalId: MODAL_IDS.confirmEmail,
  },
  {
    key: "change-email",
    title: "Change Email",
    description: "Use a different email address",
    icon: <AtIcon className="size-5" />,
    modalId: MODAL_IDS.changeEmail,
  },
];

const QuickActions = () => {
  const { open } = useNavigationFeature();
  const { emailVerified } = useAccountSummary();

  return (
    <Panel title="Quick Actions">
      <ul className="-mx-1 flex flex-col gap-1">
        {ACTIONS.map((action) => {
          const { modalId } = action;
          const available = modalId !== undefined;
          return (
            <li key={action.key}>
              <button
                type="button"
                disabled={!available}
                onClick={modalId ? () => open(modalId) : undefined}
                className={cn(
                  "group flex w-full items-center gap-3.5 rounded-xl border border-transparent p-2.5 text-left transition-colors",
                  available
                    ? "cursor-pointer hover:border-primary/30 hover:bg-primary/8 focus-visible:border-primary/50 focus-visible:bg-primary/8 focus-visible:outline-none"
                    : "cursor-not-allowed opacity-55",
                )}
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-foreground/90 ring-1 ring-white/8 transition-colors",
                    available &&
                      "group-hover:bg-primary/15 group-hover:text-primary group-hover:ring-primary/30",
                  )}
                >
                  {action.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <span className="truncate">{action.title}</span>
                    {!available && (
                      <span className="shrink-0 rounded-full border border-white/10 px-1.5 py-px text-[9px] font-medium tracking-wide text-muted-foreground uppercase">
                        Soon
                      </span>
                    )}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {action.key === "confirm-email" && emailVerified
                      ? "Your email address is verified"
                      : action.description}
                  </span>
                </span>
                {available && (
                  <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
};

export default QuickActions;
