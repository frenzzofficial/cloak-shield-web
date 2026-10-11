import type { AccountSummary } from "@/packages/hooks/useAccountSummary";
import { cn } from "@/packages/utils/cn";
import InfoRow from "./InfoRow";
import Panel from "./Panel";

const ProfileOverviewPanel = ({ account }: { account: AccountSummary }) => {
  const { user, fullname, initial, role, status, emailVerified } = account;

  return (
    <Panel title="Profile overview">
      <div className="flex items-center gap-4">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#5fd4f7] to-[#2f8ff0] text-xl font-semibold text-[#02121f] shadow-[0_0_30px_-6px_#33a9f2]">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold">{fullname || "—"}</p>
          <p className="truncate text-sm text-muted-foreground">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <InfoRow label="Role">
          <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
            {role}
          </span>
        </InfoRow>
        <InfoRow label="Account status">
          <span className="inline-flex items-center gap-2">
            <span
              className={cn(
                "size-2 rounded-full",
                status.ok
                  ? "bg-chart-2 shadow-[0_0_8px_var(--chart-2)]"
                  : "bg-chart-4 shadow-[0_0_8px_var(--chart-4)]",
              )}
            />
            {status.label}
          </span>
        </InfoRow>
        <InfoRow label="Email">
          {emailVerified ? "Verified" : "Not verified"}
        </InfoRow>
      </div>
    </Panel>
  );
};

export default ProfileOverviewPanel;
