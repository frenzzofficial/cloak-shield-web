"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

interface LayoutProps<_T> {
  children: React.ReactNode;
}

/**
 * The signed-out guard for everything under (protected). It waits for AuthProvider's
 * mount-time `getMe()`, which renews an expired access cookie from the refresh cookie first, and
 * only then redirects to /signin?next=<this page>. `src/proxy.ts` cannot do this job: it cannot
 * see the refresh cookie, so it could not tell "signed out" from "access cookie just expired".
 */
const ProtectedLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const here = `${window.location.pathname}${window.location.search}`;
      router.replace(`/signin?next=${encodeURIComponent(here)}`);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedLayout;
