import { MonitorIcon } from "@/components/ui/icons/Icons";
import {
  type DeviceSession,
  timeAgo,
} from "@/packages/configs/dashboard.config";
import { deviceTitle } from "@/packages/utils/dashboard.utils";
import type { Loadable } from "@/types/loadable";
import ListSkeleton from "./ListSkeleton";
import Panel from "./Panel";
import Unavailable from "./Unavailable";

const MAX_SHOWN = 5;

const ActiveDevicesPanel = ({
  sessions,
}: {
  sessions: Loadable<DeviceSession[]>;
}) => (
  <Panel
    title="Active devices"
    subtitle="Where you're signed in."
    icon={<MonitorIcon className="size-5" />}
  >
    {sessions.state === "loading" && <ListSkeleton rows={2} />}
    {sessions.state === "error" && <Unavailable what="Devices" />}
    {sessions.state === "ready" && (
      <ul className="space-y-3">
        {sessions.data.slice(0, MAX_SHOWN).map((session) => (
          <li
            key={session.id}
            className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 p-3"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MonitorIcon className="size-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {deviceTitle(session)}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {session.current
                  ? "This device"
                  : `Active ${timeAgo(session.lastSeenAt)}`}
              </p>
            </div>
            {session.current && (
              <span className="rounded-full bg-chart-2/15 px-2 py-0.5 text-[11px] font-medium text-chart-2">
                Current
              </span>
            )}
          </li>
        ))}
        {sessions.data.length > MAX_SHOWN && (
          <li className="text-center text-xs text-muted-foreground">
            +{sessions.data.length - MAX_SHOWN} more
          </li>
        )}
      </ul>
    )}
  </Panel>
);

export default ActiveDevicesPanel;
