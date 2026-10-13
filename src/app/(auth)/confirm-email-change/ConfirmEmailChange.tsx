"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import Loader from "@/components/ui/loader/Loader";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { confirmEmailChange } from "@/packages/services/account.services";

type State =
  | { kind: "confirming" }
  | { kind: "confirmed" }
  | { kind: "failed"; message: string };

/**
 * The page the change-email message links to: `/confirm-email-change?token=...`. Like the
 * verify-email page, the token is spent on the first call, so it must run exactly once.
 */
const ConfirmEmailChange = () => {
  const token = useSearchParams().get("token") ?? "";
  const { refreshUser } = useAuth();
  const [state, setState] = useState<State>(
    token
      ? { kind: "confirming" }
      : { kind: "failed", message: "This link is missing its token." },
  );
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    confirmEmailChange(token)
      .then(async () => {
        await refreshUser(); // the signed-in user's address just changed
        setState({ kind: "confirmed" });
      })
      .catch((err: unknown) =>
        setState({
          kind: "failed",
          message: getAuthErrorMessage(
            err,
            "This link is invalid or has expired.",
          ),
        }),
      );
  }, [token, refreshUser]);

  if (state.kind === "confirming") {
    return <Loader fullscreen label="Confirming your new email" />;
  }

  return (
    <div className="form-card sm:min-w-120 max-w-200">
      <div className="form-card__content items-center text-center">
        {state.kind === "confirmed" ? (
          <>
            <p className="text-sm">
              Your email address was changed. Use it the next time you sign in.
            </p>
            <a href="/dashboard" className="text-sm underline">
              Go to dashboard
            </a>
          </>
        ) : (
          <>
            <p className="text-sm text-destructive">{state.message}</p>
            <a href="/signin" className="text-sm underline">
              Back to sign in
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailChange;
