"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui";
import { DiscordIcon, GoogleIcon } from "@/components/ui/icons/icons";
import {
  type OAuthProvider,
  redirectToOAuthProvider,
} from "@/packages/services/auth.services";

const PROVIDERS: {
  provider: OAuthProvider;
  label: string;
  icon: (className: string) => React.ReactNode;
}[] = [
  {
    provider: "google",
    label: "Continue with Google",
    icon: (className) => <GoogleIcon className={className} />,
  },
  {
    provider: "discord",
    label: "Continue with Discord",
    icon: (className) => <DiscordIcon className={className} />,
  },
];

/**
 * Drop into an AuthForm's `footer` slot on signin/signup. Kicks off
 * step 1 of the OAuth flow (see auth.services.ts) — asks the backend
 * for the provider's consent-screen URL, then hard-navigates there.
 * The provider eventually redirects back to `/signin-<provider>`,
 * which exchanges the returned `code` for a session (step 2).
 */
const SocialSignIn = () => {
  const [pendingProvider, setPendingProvider] = useState<OAuthProvider | null>(
    null,
  );

  const handleClick = async (provider: OAuthProvider) => {
    setPendingProvider(provider);
    try {
      await redirectToOAuthProvider(provider);
      // On success the browser navigates away — this component
      // unmounts. `finally` below only really fires on failure.
    } catch {
      toast.error(`Couldn't start ${provider} sign-in. Please try again.`);
      setPendingProvider(null);
    }
  };

  return (
    <div className="social-signin">
      <div className="social-signin__divider">
        <span>or continue with</span>
      </div>

      <div className="social-signin__row">
        {PROVIDERS.map(({ provider, label, icon }) => (
          <Button
            key={provider}
            type="button"
            className="social-signin__button btn-outline"
            disabled={pendingProvider !== null}
            aria-label={label}
            onClick={() => handleClick(provider)}
          >
            {icon("size-4")}
            <span>{pendingProvider === provider ? "Redirecting…" : label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialSignIn;
