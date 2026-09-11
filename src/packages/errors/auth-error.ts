import { isAxiosError } from "axios";
import type { ErrorResponse } from "@/types/auth";

/**
 * Pulls a readable message out of whatever an auth service call
 * rejected with — a backend `ErrorResponse` body, a network failure,
 * a timeout, or something unexpected — and falls back to
 * `fallback` rather than ever surfacing "[object Object]" or a raw
 * stack trace to the user.
 */
export const getAuthErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string => {
  if (isAxiosError<ErrorResponse>(error)) {
    if (error.code === "ECONNABORTED") {
      return "That took too long. Please check your connection and try again.";
    }
    if (!error.response) {
      return "Couldn't reach the server. Please check your connection.";
    }
    return error.response.data?.message ?? fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
