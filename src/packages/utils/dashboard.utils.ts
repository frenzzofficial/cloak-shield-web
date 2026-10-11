import type { DeviceSession } from "@/packages/configs/dashboard.config";

export const todayLabel = (): string =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

/** "ADMIN" → "Admin". */
export const titleCase = (value: string): string =>
  value.charAt(0) + value.slice(1).toLowerCase();

/** The best name we have for a device: its own name, else "Browser on OS", else a placeholder. */
export const deviceTitle = (session: DeviceSession): string =>
  session.deviceName ??
  ([session.browser, session.os].filter(Boolean).join(" on ") ||
    "Unknown device");
