export const DEFAULT_REDIRECT = "/dashboard";

/**
 * Only same-site paths are allowed as a post-sign-in destination: `//host` and `/\host`
 * would otherwise turn `?next=` into an open redirect.
 */
export const safeRedirectPath = (
  value: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT,
): string =>
  value?.startsWith("/") && !value.startsWith("//") && !value.startsWith("/\\")
    ? value
    : fallback;
