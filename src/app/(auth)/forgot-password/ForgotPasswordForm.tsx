"use client";

import { useState, useTransition } from "react";
import AuthForm from "@/components/features/auth/forms/AuthForm";
import { forgotPassword } from "@/packages/services/auth.services";
import type { ForgotPasswordRequestBody } from "@/types/auth";

const ForgotPasswordForm = () => {
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);

  const submit = (data: unknown): void => {
    const body = data as ForgotPasswordRequestBody;

    startTransition(async () => {
      try {
        await forgotPassword(body);
      } catch (err: unknown) {
        // Deliberately don't surface this to the user, and don't
        // branch the confirmation screen on success vs failure — see
        // the note in the confirmation copy below. Revealing "no
        // account with that email" is a classic email-enumeration
        // leak; the backend should behave the same way (constant-time,
        // same response) regardless of whether the address exists.
        if (process.env.NODE_ENV === "development") {
          console.warn("[forgot-password] request failed:", err);
        }
      } finally {
        setSubmitted(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="form-card sm:min-w-120 max-w-200">
        <div className="form-card__content">
          <p className="text-sm text-muted-foreground">
            If an account exists for that email, a password reset link is on its
            way. Check your inbox (and spam folder) — the link expires after a
            short while.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthForm
      formKey="FORGOT_PASSWORD"
      onSubmit={submit}
      isLoading={pending}
      className="max-w-200"
    />
  );
};

export default ForgotPasswordForm;
