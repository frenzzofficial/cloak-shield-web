"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader/Loader";

const SEEN_KEY = "cs:landing-intro-seen";
// Long enough for the shield to finish drawing once, short enough not to hold anyone up.
const MIN_VISIBLE_MS = 1600;
const FADE_MS = 500;

const alreadySeen = (): boolean => {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

const markSeen = (): void => {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Storage can be unavailable (private windows); the intro then just plays again.
  }
};

type Phase = "showing" | "leaving" | "gone";

/**
 * Landing-page intro. It is part of the server-rendered HTML, so it covers the page from the
 * very first paint instead of appearing after hydration, then fades out once the page has
 * finished loading (and has been up for MIN_VISIBLE_MS). It plays once per browser session.
 */
const LandingLoader = () => {
  const [phase, setPhase] = useState<Phase>("showing");

  useEffect(() => {
    if (alreadySeen()) {
      setPhase("gone");
      return;
    }

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden"; // nothing scrolls behind the overlay

    const startedAt = performance.now();
    const timers: number[] = [];
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(
        0,
        MIN_VISIBLE_MS - (performance.now() - startedAt),
      );
      timers.push(
        window.setTimeout(() => {
          markSeen();
          root.style.overflow = previousOverflow;
          setPhase("leaving");
          timers.push(window.setTimeout(() => setPhase("gone"), FADE_MS));
        }, wait),
      );
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      window.removeEventListener("load", finish);
      for (const timer of timers) window.clearTimeout(timer);
      root.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`cs-load-overlay${phase === "leaving" ? " cs-load-overlay--leaving" : ""}`}
    >
      <Loader fullscreen />
    </div>
  );
};

export default LandingLoader;
