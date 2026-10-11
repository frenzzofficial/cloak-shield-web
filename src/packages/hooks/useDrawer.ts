"use client";
import { useEffect } from "react";

// Body Scroll Lock
export const useBodyScrollLock = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [enabled]);
};

// Escape Key
export const useDrawerEscape = (callback: () => void, enabled: boolean) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [callback, enabled]);
};

// Outside Click
export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [callback, enabled, ref]);
};

// Escape Key

export const useEscapeKey = (callback: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [callback, enabled]);
};
