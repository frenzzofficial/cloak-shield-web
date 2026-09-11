"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import AuthForm from "@/components/features/auth/forms/AuthForm";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { resetPassword } from "@/packages/services/auth.services";
import type { ResetPasswordRequestBody } from "@/types/auth";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [pending, startTransition] = useTransition();

  if (!token) {
    return (
      <div className="form-card sm:min-w-120 max-w-200">
        <div className="form-card__content">
          <p className="text-sm text-muted-foreground">
            This reset link is missing or invalid. Request a new one from the{" "}
            <a href="/forgot-password" className="underline">
              forgot password
            </a>{" "}
            page.
          </p>
        </div>
      </div>
    );
  }

  const submit = (data: unknown): void => {
    // `data` already includes `token` — AuthForm registers hiddenFields
    // as real form values, not just UI decoration.
    const body = data as ResetPasswordRequestBody;

    startTransition(async () => {
      try {
        await resetPassword(body);
        toast.success("Password reset. Please sign in.");
        router.replace("/signin");
      } catch (err: unknown) {
        toast.error(
          getAuthErrorMessage(
            err,
            "Couldn't reset your password. The link may have expired.",
          ),
        );
      }
    });
  };

  return (
    <AuthForm
      formKey="RESET_PASSWORD"
      onSubmit={submit}
      isLoading={pending}
      className="max-w-200"
      hiddenFields={{ token }}
    />
  );
};

export default ResetPasswordForm;
