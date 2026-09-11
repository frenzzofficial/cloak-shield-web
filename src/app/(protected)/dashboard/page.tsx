"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";

const DashboardPage = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [pending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOut();
        router.replace("/signin");
      } catch (err) {
        toast.error(
          getAuthErrorMessage(err, "Couldn't sign out. Please try again."),
        );
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as {user?.email}
          </p>
        </div>
        <Button
          className="btn-outline"
          onClick={handleSignOut}
          disabled={pending}
        >
          {pending ? "Signing out…" : "Sign out"}
        </Button>
      </div>

      <div className="glow-card rounded-xl border border-border/80 bg-card/60 p-6">
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
          Account
        </h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Full name</dt>
          <dd>{user?.fullname}</dd>
          <dt className="text-muted-foreground">Email</dt>
          <dd>{user?.email}</dd>
          <dt className="text-muted-foreground">Role</dt>
          <dd>{user?.role ?? "USER"}</dd>
        </dl>
      </div>
    </div>
  );
};

export default DashboardPage;
