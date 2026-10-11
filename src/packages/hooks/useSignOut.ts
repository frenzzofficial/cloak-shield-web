"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/AuthProvider";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";

/** Signs out, then goes to /signin. `pending` is true while the request is in flight. */
export const useSignOut = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const [pending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOut();
        router.replace("/signin");
      } catch (err) {
        toast.error(
          getAuthErrorMessage(err, "Couldn't sign out. Please try again."),
        );
      }
    });
  };

  return { pending, handleSignOut };
};
