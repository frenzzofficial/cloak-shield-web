"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import AuthForm from "@/components/features/auth/forms/AuthForm";
import SocialSignIn from "@/components/features/auth/social/SocialSignIn";
import { useAuth } from "@/components/providers/AuthProvider";
import { Link } from "@/components/ui";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import type { SigninRequestBody } from "@/types/auth";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [pending, startTransition] = useTransition();

  const submit = (data: unknown): void => {
    const credentials = data as SigninRequestBody;

    startTransition(async () => {
      try {
        await signIn(credentials);
        toast.success("Welcome back!");
        router.replace(searchParams.get("next") || "/dashboard");
      } catch (err: unknown) {
        toast.error(
          getAuthErrorMessage(err, "Sign-in failed. Please try again."),
        );
      }
    });
  };

  return (
    <AuthForm
      formKey="SIGNIN"
      onSubmit={submit}
      isLoading={pending}
      className="max-w-200"
      footer={<SocialSignIn />}
    >
      <div className="flex justify-end">
        <Link href="/forgot-password" variant="secondary" className="text-sm">
          Forgot password?
        </Link>
      </div>
    </AuthForm>
  );
};

export default SignInForm;
