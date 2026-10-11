"use client";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getLocalStorageSet,
  setLocalStorageSet,
} from "@/packages/utils/local-storage.utils";

// Types
type NavigationContextValue = {
  openIds: ReadonlySet<string>;
  isOpen: (id: string) => boolean;
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  reset: () => void;
};

// Constants
const STORAGE_KEY = "app-navigation-state";

// Context
const NavigationContext = createContext<NavigationContextValue | null>(null);

// Provider
type NavigationProviderProps = {
  children: ReactNode;
};

export function NavigationProvider({ children }: NavigationProviderProps) {
  // Restore State Once
  const [openIds, setOpenIds] = useState<Set<string>>(() =>
    getLocalStorageSet(STORAGE_KEY),
  );

  // Skip Initial Persist
  const isInitialRender = useRef(true);

  // Persist State
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;

      return;
    }

    setLocalStorageSet(STORAGE_KEY, openIds);
  }, [openIds]);

  // Helpers
  const isOpen = useCallback(
    (id: string) => {
      return openIds.has(id);
    },
    [openIds],
  );

  const open = useCallback((id: string) => {
    setOpenIds((prev) => {
      if (prev.has(id)) {
        return prev;
      }

      const next = new Set(prev);

      next.add(id);

      return next;
    });
  }, []);

  const close = useCallback((id: string) => {
    setOpenIds((prev) => {
      if (!prev.has(id)) {
        return prev;
      }

      const next = new Set(prev);

      next.delete(id);

      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setOpenIds((prev) => {
      if (prev.size === 0) {
        return prev;
      }

      return new Set();
    });
  }, []);

  // Context Value
  const value = useMemo(
    () => ({
      openIds,
      isOpen,
      open,
      close,
      toggle,
      reset,
    }),
    [openIds, isOpen, open, close, toggle, reset],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

// Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useNavigationFeature = (): NavigationContextValue => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error(
      "useNavigationFeature must be used inside NavigationProvider",
    );
  }

  return context;
};
