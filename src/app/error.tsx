"use client";

import { useEffect } from "react";
import StatusPage from "@/components/layouts/StatusPage";

/** Shown when something in a page throws. `reset` retries rendering that page. */
const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Digest only: it lets a server log line be matched to this screen without showing the user
    // (or a screenshot of the user's screen) any internal message.
    console.error("Page error", error.digest ?? "");
  }, [error]);

  return (
    <StatusPage
      code="Error"
      title="Something went wrong"
      message="An unexpected error stopped this page from loading. You can try again."
      action={{ label: "Try again", onClick: reset }}
    />
  );
};

export default ErrorPage;
