"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { STATUS_LABELS } from "@/packages/configs/dashboard.config";
import { titleCase } from "@/packages/utils/dashboard.utils";

/** What the dashboard shows about the signed-in user, derived once instead of in every block. */
export const useAccountSummary = () => {
  const { user } = useAuth();

  const fullname = user?.fullname ?? "";
  const status = STATUS_LABELS[user?.status ?? "ACTIVE"] ?? {
    label: titleCase(user?.status ?? "Unknown"),
    ok: false,
  };

  return {
    user,
    fullname,
    firstName: fullname.split(" ")[0] || "there",
    initial: (fullname[0] ?? "?").toUpperCase(),
    role: titleCase(user?.role ?? "USER"),
    isAdmin: user?.role === "ADMIN",
    status,
    emailVerified: user?.status !== "PENDING_VERIFICATION",
    hasPassword: user?.hasPassword !== false,
  };
};

export type AccountSummary = ReturnType<typeof useAccountSummary>;
