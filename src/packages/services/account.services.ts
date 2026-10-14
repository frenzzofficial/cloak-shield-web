import { apiClient } from "@/packages/api/axios.api";
import { AUTH_ENDPOINTS } from "@/packages/configs/endpoints.config";
import type {
  AccountResponse,
  ChangeEmailBody,
  UpdatePreferencesBody,
  UpdateProfileBody,
  UserPreferences,
} from "@/types/account";
import type { SuccessResponse } from "@/types/auth";

// The signed-in user's own account: profile, preferences, email address. Same conventions as
// auth.services.ts: thin wrappers around apiClient, bodies built from known fields only.

/** The account with its profile and preferences. */
export const getAccount = async (): Promise<AccountResponse> => {
  const { data } = await apiClient.get<AccountResponse>(AUTH_ENDPOINTS.profile);
  return data;
};

/** Send only what changed; `null` clears a field. Email is NOT changed here, see changeEmail. */
export const updateProfile = async (
  body: UpdateProfileBody,
): Promise<AccountResponse> => {
  const { data } = await apiClient.patch<AccountResponse>(
    AUTH_ENDPOINTS.profile,
    body,
  );
  return data;
};

export const updatePreferences = async (
  body: UpdatePreferencesBody,
): Promise<UserPreferences> => {
  const { data } = await apiClient.patch<{ preferences: UserPreferences }>(
    AUTH_ENDPOINTS.preferences,
    body,
  );
  return data.preferences;
};

/** Starts an email change: a confirmation link goes to the NEW address. */
export const changeEmail = async (
  body: ChangeEmailBody,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.changeEmail,
    {
      newEmail: body.newEmail,
      ...(body.password ? { password: body.password } : {}),
    },
  );
  return data;
};

/** The emailed link opens /confirm-email-change?token=...; the token is spent on first use. */
export const confirmEmailChange = async (
  token: string,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.confirmEmailChange,
    { token },
  );
  return data;
};

/**
 * Permanently deletes the signed-in account. The backend re-checks the password (accounts
 * without one send none), removes everything and clears the session cookies.
 */
export const deleteAccount = async (
  password?: string,
): Promise<SuccessResponse> => {
  const { data } = await apiClient.post<SuccessResponse>(
    AUTH_ENDPOINTS.deleteAccount,
    password ? { password } : {},
  );
  return data;
};
