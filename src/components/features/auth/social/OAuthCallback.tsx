"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import {
  exchangeOAuthCode,
  type OAuthProvider,
} from "@/packages/services/auth.services";

interface OAuthCallbackProps {
  provider: OAuthProvider;
  providerLabel: string;
}

type Status = "exchanging" | "error";

/**
 * Renders at `/signin-google` and `/signin-discord` — the
 * `redirect_uri` the backend registers with each provider. The
 * provider lands the browser here with `?code=...` (or `?error=...`
 * if the user denied access), and this exchanges that code for a
 * session via `exchangeOAuthCode` (step 2 of the flow — step 1 is
 * `SocialSignIn.tsx` asking for the provider's consent URL).
 */
const OAuthCallback = ({ provider, providerLabel }: OAuthCallbackProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<Status>("exchanging");
  const [errorMessage, setErrorMessage] = useState("");
  const hasRun = useRef(false);

  // Only the first mount's search params matter for a code exchange;
  // re-running on provider/router/refreshUser identity changes would
  // just re-trigger the same one-time exchange.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time run on mount only, see comment above
  useEffect(() => {
    // Effects run twice in dev under StrictMode — an auth code can
    // only be exchanged once, so a second attempt would fail loudly
    // for no reason. Guard against that specifically (not against
    // legitimate re-navigation, which remounts this component fresh).
    if (hasRun.current) return;
    hasRun.current = true;

    const providerError = searchParams.get("error");
    const code = searchParams.get("code");

    if (providerError) {
      setStatus("error");
      setErrorMessage(
        providerError === "access_denied"
          ? `You cancelled ${providerLabel} sign-in.`
          : `${providerLabel} sign-in failed.`,
      );
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("Missing authorization code from the redirect.");
      return;
    }

    (async () => {
      try {
        await exchangeOAuthCode(provider, code);
        await refreshUser();
        router.replace("/dashboard");
      } catch (err) {
        setStatus("error");
        setErrorMessage(
          getAuthErrorMessage(
            err,
            `Couldn't complete ${providerLabel} sign-in.`,
          ),
        );
      }
    })();
  }, []);

  return (
    <div className="form-card sm:min-w-120 max-w-200">
      <div className="form-card__content items-center text-center">
        {status === "exchanging" ? (
          <p className="text-sm text-muted-foreground">
            Completing {providerLabel} sign-in…
          </p>
        ) : (
          <>
            <p className="text-sm text-destructive">{errorMessage}</p>
            <a href="/signin" className="text-sm underline">
              Back to sign in
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;
