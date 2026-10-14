import {
  BadgeIcon,
  ClockIcon,
  MonitorIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons/Icons";
import {
  type ActivityEntry,
  type DeviceSession,
  eventLabel,
  timeAgo,
} from "@/packages/configs/dashboard.config";
import type { AccountSummary } from "@/packages/hooks/useAccountSummary";
import type { Loadable } from "@/types/loadable";
import StatCard from "./StatCard";

interface StatsGridProps {
  account: AccountSummary;
  sessions: Loadable<DeviceSession[]>;
  activity: Loadable<ActivityEntry[]>;
}

const StatsGrid = ({ account, sessions, activity }: StatsGridProps) => {
  const latest = activity.state === "ready" ? activity.data[0] : undefined;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        icon={<ShieldCheckIcon className="size-5" />}
        label="Account status"
        value={account.status.label}
        tone={account.status.ok ? "ok" : "warn"}
        hint={
          account.emailVerified
            ? "Email verified"
            : "Open the link we emailed you"
        }
      />
      <StatCard
        icon={<BadgeIcon className="size-5" />}
        label="Role"
        value={account.role}
        hint={account.isAdmin ? "Administrator access" : "Standard access"}
      />
      <StatCard
        icon={<MonitorIcon className="size-5" />}
        label="Active devices"
        loading={sessions.state === "loading"}
        value={sessions.state === "ready" ? sessions.data.length : "—"}
        hint={
          sessions.state === "ready"
            ? "Including this one"
            : "Unavailable right now"
        }
      />
      <StatCard
        icon={<ClockIcon className="size-5" />}
        label="Last activity"
        loading={activity.state === "loading"}
        value={latest ? timeAgo(latest.createdAt) : "—"}
        hint={
          latest
            ? (latest.deviceName ?? eventLabel(latest.event))
            : "No activity yet"
        }
      />
    </div>
  );
};

export default StatsGrid;
