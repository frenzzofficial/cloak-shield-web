"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import AuthForm from "@/components/features/auth/forms/AuthForm";
import SocialSignIn from "@/components/features/auth/social/SocialSignIn";
import { useAuth } from "@/components/providers/AuthProvider";
import { Link } from "@/components/ui";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { safeRedirectPath } from "@/packages/utils/safe-redirect";
import type { SignupRequestBody } from "@/types/auth";

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signUp } = useAuth();
  const [pending, startTransition] = useTransition();

  const submit = (data: unknown): void => {
    const credentials = data as SignupRequestBody;

    startTransition(async () => {
      try {
        const res = await signUp(credentials);

        if (res.requiresVerification) {
          // The account exists but is not signed in until the emailed link is opened.
          toast.success(res.message);
          router.replace("/signin");
          return;
        }

        toast.success("Account created. Welcome!");
        router.replace(safeRedirectPath(searchParams.get("next")));
      } catch (err: unknown) {
        toast.error(
          getAuthErrorMessage(err, "Sign-up failed. Please try again."),
        );
      }
    });
  };

  return (
    <AuthForm
      formKey="SIGNUP"
      onSubmit={submit}
      isLoading={pending}
      className="max-w-200"
      footer={<SocialSignIn />}
    >
      <p className="text-xs text-muted-foreground">
        Read the{" "}
        <Link href="/terms" variant="secondary" className="text-xs underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" variant="secondary" className="text-xs underline">
          Privacy Policy
        </Link>
        .
      </p>
    </AuthForm>
  );
};

export default SignupForm;
