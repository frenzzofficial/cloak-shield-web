"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import AuthForm from "@/components/features/auth/forms/AuthForm";
import SocialSignIn from "@/components/features/auth/social/SocialSignIn";
import { useAuth } from "@/components/providers/AuthProvider";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
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
        await signUp(credentials);
        toast.success("Account created. Welcome!");
        router.replace(searchParams.get("next") || "/dashboard");
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
    />
  );
};

export default SignupForm;
