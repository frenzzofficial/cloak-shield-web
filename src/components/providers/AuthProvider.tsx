"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as authServices from "@/packages/services/auth.services";
import { onSessionExpired } from "@/packages/utils/session-events";
import type {
  AuthResponse,
  SigninRequestBody,
  SignupRequestBody,
  User,
} from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  /** True only during the initial session restore on mount. */
  isLoading: boolean;
  signIn: (credentials: SigninRequestBody) => Promise<User>;
  /**
   * When the server requires verified emails the account is created but nobody is signed in:
   * `requiresVerification` is then true and `user` stays null.
   */
  signUp: (credentials: SignupRequestBody) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  /** Re-fetches the current user (after a provider sign-in or a profile update). */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app once, in AppClientLayout. On mount it asks the backend who is signed in; the
 * browser sends the httpOnly session cookies by itself, and an expired access cookie is
 * renewed from the refresh cookie by the axios interceptor. A mid-session expiry is announced
 * through `onSessionExpired`, so `isAuthenticated` flips immediately.
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const me = await authServices.getMe();
      if (cancelled) return;
      setUser(me);
      setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => onSessionExpired(() => setUser(null)), []);

  const signIn = useCallback(async (credentials: SigninRequestBody) => {
    const res = await authServices.signIn(credentials);
    setUser(res.user);
    return res.user;
  }, []);

  const signUp = useCallback(async (credentials: SignupRequestBody) => {
    const res = await authServices.signUp(credentials);
    if (!res.requiresVerification) setUser(res.user);
    return res;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authServices.signOut();
    } finally {
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    setUser(await authServices.getMe());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signUp,
      signOut,
      refreshUser,
    }),
    [user, isLoading, signIn, signUp, signOut, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

export default AuthProvider;
