"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { cn } from "@/packages/utils/cn";
import Panel from "../../../components/features/dashboard/Panel";
import StatCard from "../../../components/features/dashboard/StatCard";
import ShieldArt from "../../../components/layouts/ShieldArt";
import {
  AlertIcon,
  BadgeIcon,
  ClockIcon,
  IdIcon,
  KeyIcon,
  LogOutIcon,
  MailIcon,
  MonitorIcon,
  ShieldCheckIcon,
  UserIcon,
} from "../../../components/ui/icons/dashboard-icons";
import {
  type ActivityEntry,
  type DeviceSession,
  eventLabel,
  getActivity,
  getSessions,
  STATUS_LABELS,
  timeAgo,
} from "../../../packages/configs/dashboard.config";

type Loadable<T> =
  | { state: "loading" }
  | { state: "error" }
  | { state: "ready"; data: T };

const todayLabel = () =>
  new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

const titleCase = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase();

const deviceTitle = (session: DeviceSession) =>
  session.deviceName ??
  ([session.browser, session.os].filter(Boolean).join(" on ") ||
    "Unknown device");

const Row = ({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-4 border-b border-white/5 py-3 text-sm last:border-b-0">
    <span className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-muted-foreground">
      {icon && <span className="size-4 text-muted-foreground/80">{icon}</span>}
      {label}
    </span>
    <span className="min-w-0 wrap-break-word text-right font-medium text-foreground">
      {children}
    </span>
  </div>
);

const SKELETON_KEYS = ["first", "second", "third", "fourth", "fifth"] as const;

const ListSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <div className="space-y-3" aria-busy="true">
    {SKELETON_KEYS.slice(0, rows).map((key) => (
      <div key={key} className="flex items-center gap-3">
        <div className="size-8 animate-pulse rounded-full bg-white/8" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-2/3 animate-pulse rounded bg-white/8" />
          <div className="h-2.5 w-1/3 animate-pulse rounded bg-white/5" />
        </div>
      </div>
    ))}
  </div>
);

const Unavailable = ({ what }: { what: string }) => (
  <p className="flex items-center gap-2 text-sm text-muted-foreground">
    <AlertIcon className="size-4 text-chart-4" />
    {what} couldn&apos;t be loaded right now.
  </p>
);

const DashboardPage = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [pending, startTransition] = useTransition();
  const [sessions, setSessions] = useState<Loadable<DeviceSession[]>>({
    state: "loading",
  });
  const [activity, setActivity] = useState<Loadable<ActivityEntry[]>>({
    state: "loading",
  });

  useEffect(() => {
    let cancelled = false;

    getSessions()
      .then((data) => !cancelled && setSessions({ state: "ready", data }))
      .catch(() => !cancelled && setSessions({ state: "error" }));
    getActivity(6)
      .then((data) => !cancelled && setActivity({ state: "ready", data }))
      .catch(() => !cancelled && setActivity({ state: "error" }));

    return () => {
      cancelled = true;
    };
  }, []);

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

  const fullname = user?.fullname ?? "";
  const firstName = fullname.split(" ")[0] || "there";
  const status = STATUS_LABELS[user?.status ?? "ACTIVE"] ?? {
    label: titleCase(user?.status ?? "Unknown"),
    ok: false,
  };
  const role = titleCase(user?.role ?? "USER");
  const emailVerified = user?.status !== "PENDING_VERIFICATION";
  const latest = activity.state === "ready" ? activity.data[0] : undefined;

  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Welcome back,{" "}
            <span className="text-gradient-blue">{firstName}</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Here&apos;s an overview of your account and security status.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden text-sm text-muted-foreground sm:block">
            {todayLabel()}
          </p>
          <Button
            className="btn-outline"
            onClick={handleSignOut}
            disabled={pending}
          >
            <LogOutIcon className="size-4" />
            {pending ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_21rem]">
        {/* ── Main column ──────────────────────────────────────── */}
        <div className="flex min-w-0 flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
              icon={<ShieldCheckIcon className="size-5" />}
              label="Account status"
              value={status.label}
              tone={status.ok ? "ok" : "warn"}
              hint={
                emailVerified
                  ? "Email verified"
                  : "Open the link we emailed you"
              }
            />
            <StatCard
              icon={<BadgeIcon className="size-5" />}
              label="Role"
              value={role}
              hint={
                user?.role === "ADMIN"
                  ? "Administrator access"
                  : "Standard access"
              }
            />
            <StatCard
              icon={<MonitorIcon className="size-5" />}
              label="Active devices"
              loading={sessions.state === "loading"}
              value={sessions.state === "ready" ? sessions.data.length : "—"}
              hint={
                sessions.state === "ready"
                  ? "Including this one"
                  : "Unavailable right now"
              }
            />
            <StatCard
              icon={<ClockIcon className="size-5" />}
              label="Last activity"
              loading={activity.state === "loading"}
              value={latest ? timeAgo(latest.createdAt) : "—"}
              hint={
                latest
                  ? (latest.deviceName ?? eventLabel(latest.event))
                  : "No activity yet"
              }
            />
          </div>

          {/* ── Protection banner ──────────────────────────────── */}
          <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-[#0a1a33] via-[#07111f] to-[#050b17] p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 top-1/2 size-80 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
            />
            <div className="relative flex items-center justify-between gap-6">
              <div className="max-w-md">
                <p className="eyebrow text-xs font-medium uppercase text-primary">
                  Account security
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                  Your session is protected
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Your sign-in lives in cookies that scripts can&apos;t read,
                  refresh tokens rotate every time they&apos;re used, and every
                  sign-in is recorded in your activity log.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                  {[
                    "HttpOnly cookies",
                    "Rotating refresh tokens",
                    "CSRF protection",
                  ].map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              </div>
              <ShieldArt className="hidden size-48 shrink-0 sm:block lg:size-56" />
            </div>
          </section>

          {/* ── Account info + activity ────────────────────────── */}
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <Panel
              title="Account information"
              subtitle="Your personal details and sign-in method."
              icon={<UserIcon className="size-5" />}
            >
              <Row icon={<UserIcon />} label="Full name">
                {fullname || "—"}
              </Row>
              <Row icon={<MailIcon />} label="Email address">
                <span className="text-[13px] wrap-anywhere">
                  {user?.email ?? "—"}
                </span>
              </Row>
              <Row icon={<KeyIcon />} label="Password">
                {user?.hasPassword === false ? (
                  <span className="text-muted-foreground">
                    Not set (provider sign-in)
                  </span>
                ) : (
                  "Set"
                )}
              </Row>
              <Row icon={<IdIcon />} label="Account ID">
                <span className="font-mono text-xs text-muted-foreground">
                  {user?.id ? `${user.id.slice(0, 8)}…` : "—"}
                </span>
              </Row>
            </Panel>

            <Panel
              title="Recent activity"
              subtitle="Your latest security events."
              icon={<ClockIcon className="size-5" />}
            >
              {activity.state === "loading" && <ListSkeleton rows={4} />}
              {activity.state === "error" && <Unavailable what="Activity" />}
              {activity.state === "ready" && activity.data.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing to show yet.
                </p>
              )}
              {activity.state === "ready" && activity.data.length > 0 && (
                <ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-4 before:w-px before:bg-white/8">
                  {activity.data.map((entry) => {
                    const failed = entry.outcome === "FAILURE";
                    return (
                      <li key={entry.id} className="relative flex gap-3">
                        <span
                          className={cn(
                            "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full ring-4 ring-[#080d16]",
                            failed
                              ? "bg-destructive/15 text-destructive"
                              : "bg-chart-2/15 text-chart-2",
                          )}
                        >
                          {failed ? (
                            <AlertIcon className="size-4" />
                          ) : (
                            <ShieldCheckIcon className="size-4" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {eventLabel(entry.event)}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {timeAgo(entry.createdAt)}
                            {entry.deviceName ? ` · ${entry.deviceName}` : ""}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </Panel>
          </div>
        </div>

        {/* ── Side column ──────────────────────────────────────── */}
        <aside className="flex min-w-0 flex-col gap-6">
          <Panel title="Profile overview">
            <div className="flex items-center gap-4">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#5fd4f7] to-[#2f8ff0] text-xl font-semibold text-[#02121f] shadow-[0_0_30px_-6px_#33a9f2]">
                {(fullname[0] ?? "?").toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{fullname || "—"}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Row label="Role">
                <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-xs text-primary">
                  {role}
                </span>
              </Row>
              <Row label="Account status">
                <span className="inline-flex items-center gap-2">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      status.ok
                        ? "bg-chart-2 shadow-[0_0_8px_var(--chart-2)]"
                        : "bg-chart-4 shadow-[0_0_8px_var(--chart-4)]",
                    )}
                  />
                  {status.label}
                </span>
              </Row>
              <Row label="Email">
                {emailVerified ? "Verified" : "Not verified"}
              </Row>
            </div>
          </Panel>

          <Panel
            title="Active devices"
            subtitle="Where you're signed in."
            icon={<MonitorIcon className="size-5" />}
          >
            {sessions.state === "loading" && <ListSkeleton rows={2} />}
            {sessions.state === "error" && <Unavailable what="Devices" />}
            {sessions.state === "ready" && (
              <ul className="space-y-3">
                {sessions.data.slice(0, 5).map((session) => (
                  <li
                    key={session.id}
                    className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/2 p-3"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MonitorIcon className="size-4.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {deviceTitle(session)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session.current
                          ? "This device"
                          : `Active ${timeAgo(session.lastSeenAt)}`}
                      </p>
                    </div>
                    {session.current && (
                      <span className="rounded-full bg-chart-2/15 px-2 py-0.5 text-[11px] font-medium text-chart-2">
                        Current
                      </span>
                    )}
                  </li>
                ))}
                {sessions.data.length > 5 && (
                  <li className="text-center text-xs text-muted-foreground">
                    +{sessions.data.length - 5} more
                  </li>
                )}
              </ul>
            )}
          </Panel>
        </aside>
      </div>
    </div>
  );
};

export default DashboardPage;
