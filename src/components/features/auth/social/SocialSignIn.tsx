"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { DiscordIcon, GoogleIcon } from "@/components/ui/icon/Icons";
import {
  getOAuthProviders,
  startOAuthSignIn,
} from "@/packages/services/auth.services";
import type { AuthProviderInfo } from "@/types/auth";

const iconFor = (id: string, className: string): React.ReactNode => {
  if (id === "google") return <GoogleIcon className={className} />;
  if (id === "discord") return <DiscordIcon className={className} />;
  return null;
};

/**
 * Drop into an AuthForm's `footer` slot on signin/signup. The buttons are not hard-coded: the
 * backend lists the sign-in methods it has switched on (GET /v1/auth/providers), so a method
 * that is disabled — or not built yet, like Discord — simply never appears. Clicking one
 * navigates the browser to the backend, which takes it through the provider and finally back
 * to `/auth/callback` (see OAuthCallback.tsx).
 */
const SocialSignIn = () => {
  const searchParams = useSearchParams();
  const [providers, setProviders] = useState<AuthProviderInfo[]>([]);
  const [pendingId, setPendingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getOAuthProviders()
      .then((list) => {
        if (!cancelled) setProviders(list);
      })
      .catch(() => {
        // No buttons is a safe fallback: email sign-in still works.
        if (!cancelled) setProviders([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (providers.length === 0) return null;

  const handleClick = (provider: AuthProviderInfo) => {
    setPendingId(provider.id);
    try {
      startOAuthSignIn(provider, searchParams.get("next"));
      // The browser navigates away; this component goes with it.
    } catch {
      toast.error(
        `Couldn't start ${provider.label} sign-in. Please try again.`,
      );
      setPendingId(null);
    }
  };

  return (
    <div className="social-signin">
      <div className="social-signin__divider">
        <span>or continue with</span>
      </div>

      <div className="social-signin__row">
        {providers.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            className="social-signin__button btn-outline"
            disabled={pendingId !== null}
            aria-label={`Continue with ${provider.label}`}
            onClick={() => handleClick(provider)}
          >
            {iconFor(provider.id, "size-4")}
            <span>
              {pendingId === provider.id
                ? "Redirecting…"
                : `Continue with ${provider.label}`}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialSignIn;
