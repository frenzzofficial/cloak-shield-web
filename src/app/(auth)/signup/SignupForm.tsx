"use client";
// import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import AuthForm from "@/components/features/auth/forms/AuthForm";

const SignupForm = () => {
  // const router = useRouter();
  const [pending, startTransition] = useTransition();

  const submit = (data: unknown): void => {
    startTransition(async () => {
      try {
        console.log(data);

        toast.success("Account created. Welcome!");
        // router.replace("/dashboard");
      } catch (err: unknown) {
        toast.error(
          // getAuthErrorMessage(err, "Sign-up failed. Please try again."),
          "Sign-up failed. Please try again.",
        );
        console.log(err);
      }
    });
  };

  return (
    <AuthForm
      formKey="SIGNUP"
      onSubmit={submit}
      isLoading={pending === true}
      className="max-w-200"
    />
  );
};

export default SignupForm;
