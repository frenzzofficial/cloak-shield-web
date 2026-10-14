import {
  AlertIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons/Icons";
import {
  type ActivityEntry,
  eventLabel,
  timeAgo,
} from "@/packages/configs/dashboard.config";
import { cn } from "@/packages/utils/cn";
import type { Loadable } from "@/types/loadable";
import ListSkeleton from "./ListSkeleton";
import Panel from "./Panel";
import Unavailable from "./Unavailable";

const RecentActivityPanel = ({
  activity,
}: {
  activity: Loadable<ActivityEntry[]>;
}) => (
  <Panel
    title="Recent activity"
    subtitle="Your latest security events."
    icon={<ClockIcon className="size-5" />}
  >
    {activity.state === "loading" && <ListSkeleton rows={4} />}
    {activity.state === "error" && <Unavailable what="Activity" />}
    {activity.state === "ready" && activity.data.length === 0 && (
      <p className="text-sm text-muted-foreground">Nothing to show yet.</p>
    )}
    {activity.state === "ready" && activity.data.length > 0 && (
      <ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-4 before:w-px before:bg-white/8">
        {activity.data.map((entry) => {
          const failed = entry.outcome === "FAILURE";
          return (
            <li key={entry.id} className="relative flex gap-3">
              <span
                className={cn(
                  "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-[#080d16]",
                  failed
                    ? "bg-destructive/15 text-destructive"
                    : "bg-chart-2/15 text-chart-2",
                )}
              >
                {failed ? (
                  <AlertIcon className="size-4" />
                ) : (
                  <ShieldCheckIcon className="size-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {eventLabel(entry.event)}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {timeAgo(entry.createdAt)}
                  {entry.deviceName ? ` · ${entry.deviceName}` : ""}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    )}
  </Panel>
);

export default RecentActivityPanel;
