"use client";

import { Button } from "@/components/ui";
import { LogOutIcon } from "@/components/ui/icon/Icons";
import { useSignOut } from "@/packages/hooks/useSignOut";
import { todayLabel } from "@/packages/utils/dashboard.utils";

const DashboardHeader = ({ firstName }: { firstName: string }) => {
  const { pending, handleSignOut } = useSignOut();

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome back, <span className="text-gradient-blue">{firstName}</span>
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Here&apos;s an overview of your account and security status.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="hidden text-sm text-muted-foreground sm:block">
          {todayLabel()}
        </p>
        <Button
          className="btn-outline"
          onClick={handleSignOut}
          disabled={pending}
        >
          <LogOutIcon className="size-4" />
          {pending ? "Signing out…" : "Sign out"}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
