"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { safeRedirectPath } from "@/packages/utils/safe-redirect";

interface GuestOnlyProps {
  children: React.ReactNode;
}

/**
 * Wrap pages that only make sense signed out (signin, signup, forgot-password). `src/proxy.ts`
 * already bounces visitors who still hold an access cookie; this covers the rest: someone
 * whose access cookie expired but whose session is alive, and anyone who becomes signed in
 * while the page is open (another tab, or a provider sign-in finishing).
 */
const GuestOnly = ({ children }: GuestOnlyProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(safeRedirectPath(searchParams.get("next")));
    }
  }, [isLoading, isAuthenticated, router, searchParams]);

  // Show the form while the session is still being checked (most visitors are signed out and
  // should not wait), but never to someone who is signed in.
  if (isAuthenticated) return null;

  return <>{children}</>;
};

export default GuestOnly;
