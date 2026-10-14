"use client";

import AccountInfoPanel from "@/components/features/dashboard/AccountInfoPanel";
import ActiveDevicesPanel from "@/components/features/dashboard/ActiveDevicesPanel";
import DangerZone from "@/components/features/dashboard/DangerZone";
import DashboardHeader from "@/components/features/dashboard/DashboardHeader";
import ProfileOverviewPanel from "@/components/features/dashboard/ProfileOverviewPanel";
import ProtectionBanner from "@/components/features/dashboard/ProtectionBanner";
import QuickActions from "@/components/features/dashboard/QuickActions";
import RecentActivityPanel from "@/components/features/dashboard/RecentActivityPanel";
import StatsGrid from "@/components/features/dashboard/StatsGrid";
import { ProfileModals } from "@/components/features/profile/ProfileModal";
import { useAccountSummary } from "@/packages/hooks/useAccountSummary";
import { useDashboardData } from "@/packages/hooks/useDashboardData";

/** Layout only: what to load lives in the hooks, what each block looks like in its component. */
const DashboardPage = () => {
  const account = useAccountSummary();
  const { sessions, activity, reload } = useDashboardData();

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader firstName={account.firstName} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        <div className="flex min-w-0 flex-col gap-6">
          <StatsGrid
            account={account}
            sessions={sessions}
            activity={activity}
          />
          <ProtectionBanner />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <AccountInfoPanel account={account} />
            <RecentActivityPanel activity={activity} />
          </div>
        </div>

        <aside className="flex min-w-0 flex-col gap-6">
          <ProfileOverviewPanel account={account} />
          <QuickActions />
          <ActiveDevicesPanel sessions={sessions} />
          <DangerZone />
        </aside>
      </div>

      <ProfileModals onChanged={reload} />
    </div>
  );
};

export default DashboardPage;
