"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

interface LayoutProps<_T> {
  children: React.ReactNode;
}

/**
 * Client-side backstop for everything under (protected). `middleware.ts`
 * already redirects signed-out visitors away before this ever mounts
 * in the common case (no refresh cookie present) — this handles the
 * gap middleware can't cover: a cookie that exists but turns out to
 * be expired/invalid once actually verified against the backend
 * (AuthProvider's mount-time refreshSession() call).
 */
const ProtectedLayout = ({ children }: LayoutProps<"/">) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/signin");
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
