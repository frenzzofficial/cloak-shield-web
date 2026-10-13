"use client";

import { useCallback, useEffect, useState } from "react";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { getAccount } from "@/packages/services/account.services";
import type { AccountResponse } from "@/types/account";

type AccountState =
  | { status: "loading" }
  | { status: "ready"; account: AccountResponse }
  | { status: "error"; message: string };

/** Loads the signed-in user's account (profile + preferences) once, with a retry. */
export const useAccount = () => {
  const [state, setState] = useState<AccountState>({ status: "loading" });

  const load = useCallback(() => {
    setState({ status: "loading" });
    getAccount()
      .then((account) => setState({ status: "ready", account }))
      .catch((err: unknown) =>
        setState({
          status: "error",
          message: getAuthErrorMessage(
            err,
            "Couldn't load your account. Please try again.",
          ),
        }),
      );
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: load is stable; this runs once
  useEffect(load, []);

  return { state, reload: load };
};
