"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Loader from "@/components/ui/loader/Loader";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { verifyEmail } from "@/packages/services/auth.services";

type State =
  | { kind: "verifying" }
  | { kind: "verified" }
  | { kind: "failed"; message: string };

/**
 * The page the verification email links to: `/verify-email?token=...`. The token is spent on
 * the first call, so the request must run exactly once (StrictMode runs effects twice in dev).
 */
const VerifyEmail = () => {
  const token = useSearchParams().get("token") ?? "";
  const [state, setState] = useState<State>(
    token
      ? { kind: "verifying" }
      : {
          kind: "failed",
          message: "This verification link is missing its token.",
        },
  );
  const hasRun = useRef(false);

  useEffect(() => {
    if (!token || hasRun.current) return;
    hasRun.current = true;

    verifyEmail(token)
      .then(() => setState({ kind: "verified" }))
      .catch((err: unknown) =>
        setState({
          kind: "failed",
          message: getAuthErrorMessage(
            err,
            "This verification link is invalid or has expired.",
          ),
        }),
      );
  }, [token]);

  if (state.kind === "verifying") {
    return <Loader fullscreen label="Verifying your email" />;
  }

  return (
    <div className="form-card sm:min-w-120 max-w-200">
      <div className="form-card__content items-center text-center">
        {state.kind === "verified" && (
          <>
            <p className="text-sm">Your email is verified. You can sign in.</p>
            <a href="/signin" className="text-sm underline">
              Go to sign in
            </a>
          </>
        )}
        {state.kind === "failed" && (
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

export default VerifyEmail;
