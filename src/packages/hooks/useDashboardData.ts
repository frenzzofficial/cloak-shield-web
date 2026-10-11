"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type ActivityEntry,
  type DeviceSession,
  getActivity,
  getSessions,
} from "@/packages/configs/dashboard.config";
import type { Loadable } from "@/types/loadable";

const ACTIVITY_LIMIT = 6;

/**
 * Loads the signed-in devices and the recent activity for the dashboard. Each list has its own
 * loading / error / ready state, so one failing never blanks the other. `reload` fetches both
 * again without flashing back to the skeletons (used after a password change, which signs the
 * other devices out).
 */
export const useDashboardData = () => {
  const [sessions, setSessions] = useState<Loadable<DeviceSession[]>>({
    state: "loading",
  });
  const [activity, setActivity] = useState<Loadable<ActivityEntry[]>>({
    state: "loading",
  });
  const [reloadKey, setReloadKey] = useState(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reloadKey only re-triggers the load
  useEffect(() => {
    let cancelled = false;

    getSessions()
      .then((data) => !cancelled && setSessions({ state: "ready", data }))
      .catch(() => !cancelled && setSessions({ state: "error" }));
    getActivity(ACTIVITY_LIMIT)
      .then((data) => !cancelled && setActivity({ state: "ready", data }))
      .catch(() => !cancelled && setActivity({ state: "error" }));

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const reload = useCallback(() => setReloadKey((n) => n + 1), []);

  return { sessions, activity, reload };
};
