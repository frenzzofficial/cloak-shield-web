"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import Loader from "@/components/ui/loader/Loader";

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
    return <Loader fullscreen label="Verifying session" />;
  }

  return <>{children}</>;
};

export default ProtectedLayout;
