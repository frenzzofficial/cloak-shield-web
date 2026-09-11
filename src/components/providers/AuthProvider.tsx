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
import { subscribeToAccessToken } from "@/packages/utils/token-store";
import type { SigninRequestBody, SignupRequestBody, User } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  /** True only during the initial silent-refresh hydration on mount. */
  isLoading: boolean;
  signIn: (credentials: SigninRequestBody) => Promise<User>;
  signUp: (credentials: SignupRequestBody) => Promise<User>;
  signOut: () => Promise<void>;
  /** Re-fetches the current user (e.g. after updateProfile). */
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app once, in AppClientLayout. On mount, attempts a silent
 * refresh using the httpOnly refresh-token cookie (the in-memory
 * access token doesn't survive a page reload) — if that succeeds, it
 * fetches the current user; if not, the app just renders as signed
 * out. The 401 → hard-redirect-to-/signin path (axios/interceptor.axios.ts)
 * is separate and handles session *expiry* mid-session; this effect
 * only handles session *restoration* on load.
 */
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const session = await authServices.refreshSession();
      if (cancelled) return;

      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await authServices.getMe();
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // If the interceptor clears the token after a failed refresh
  // mid-session (see interceptor.axios.ts), mirror that into user
  // state too, so components relying on `isAuthenticated` update
  // immediately rather than only after the next full page load.
  useEffect(() => {
    return subscribeToAccessToken((token) => {
      if (!token) setUser(null);
    });
  }, []);

  const signIn = useCallback(async (credentials: SigninRequestBody) => {
    const res = await authServices.signIn(credentials);
    setUser(res.user);
    return res.user;
  }, []);

  const signUp = useCallback(async (credentials: SignupRequestBody) => {
    const res = await authServices.signUp(credentials);
    setUser(res.user);
    return res.user;
  }, []);

  const signOut = useCallback(async () => {
    await authServices.signOut();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const me = await authServices.getMe();
    setUser(me);
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
