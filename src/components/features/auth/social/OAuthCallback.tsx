"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

// What the backend puts in `?error=` when a provider sign-in does not finish.
const ERROR_MESSAGES: Record<string, string> = {
  access_denied: "You cancelled the sign-in.",
  provider_error: "The provider reported a problem. Please try again.",
  state_invalid:
    "That sign-in attempt expired or was already used. Please start again.",
  exchange_failed: "We couldn't complete the sign-in. Please try again.",
  token_invalid: "The provider's response couldn't be verified.",
  email_missing: "The provider did not share an email address.",
  email_unverified:
    "The provider hasn't verified that email address, so we can't use it.",
  account_blocked: "This account can't sign in right now.",
  provider_conflict:
    "This email is already linked to a different account with that provider.",
  server_error: "Something went wrong on our side. Please try again.",
};

const DEFAULT_ERROR = "Sign-in failed. Please try again.";

// Only same-site paths: a callback URL must never become an open redirect.
const safePath = (value: string | null): string =>
  value?.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";

type Status = "finishing" | "error";

/**
 * Renders at `/auth/callback` — where the backend sends the browser after EVERY provider
 * attempt (it never answers with JSON, because the browser is mid-redirect):
 *   ?status=success&redirect=/path   → the session cookies are already set; load the user
 *   ?status=error&error=<code>       → show a message for that code
 */
const OAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState<Status>("finishing");
  const [errorMessage, setErrorMessage] = useState("");
  const hasRun = useRef(false);

  // Only the first mount's search params matter; re-running on identity changes would
  // just repeat the same one-time hand-off.
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time run on mount only
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (searchParams.get("status") !== "success") {
      const code = searchParams.get("error") ?? "";
      setStatus("error");
      setErrorMessage(ERROR_MESSAGES[code] ?? DEFAULT_ERROR);
      return;
    }

    (async () => {
      await refreshUser();
      router.replace(safePath(searchParams.get("redirect")));
    })();
  }, []);

  return (
    <div className="form-card sm:min-w-120 max-w-200">
      <div className="form-card__content items-center text-center">
        {status === "finishing" ? (
          <p className="text-sm text-muted-foreground">Completing sign-in…</p>
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
