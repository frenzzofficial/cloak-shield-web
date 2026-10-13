import type { User } from "@/types/auth";

// GET / PATCH /v1/account/profile and PATCH /v1/account/preferences, as the backend sends them.

export interface UserProfile {
  username: string | null;
  bio: string | null;
  phone: string | null;
  /** YYYY-MM-DD */
  birthDate: string | null;
  gender: string | null;
  timezone: string | null;
  locale: string | null;
  website: string | null;
  twitterUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

export interface AccountResponse {
  success: boolean;
  user: User;
  profile: UserProfile;
  preferences: UserPreferences;
}

/** PATCH semantics: leave a field out to keep it, send null to clear it. */
export type UpdateProfileBody = Partial<{
  fullname: string;
  username: string | null;
  bio: string | null;
  phone: string | null;
  birthDate: string | null;
  gender: string | null;
  website: string | null;
  twitterUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
}>;

export type UpdatePreferencesBody = Partial<
  Pick<
    UserPreferences,
    | "theme"
    | "emailNotifications"
    | "pushNotifications"
    | "marketingEmails"
    | "reducedMotion"
    | "highContrast"
  >
>;

export interface ChangeEmailBody {
  newEmail: string;
  /** Left out for accounts without a password (created through a provider). */
  password?: string;
}
