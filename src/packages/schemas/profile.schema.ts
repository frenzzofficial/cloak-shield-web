import { z } from "zod";
import {
  bioRules,
  birthDateStringRules,
  confirmPasswordRules,
  emailRules,
  fullnameRules,
  genderRules,
  httpsUrlRules,
  optionalRules,
  passwordRules,
  phoneRules,
  schemaMessages,
  usernameRules,
  withFieldsMatch,
} from "../configs/schema.config";

// Account-side schemas: what a signed-in user edits about themselves. They sit next to
// auth.schema.ts (which is about getting IN) and follow the same conventions: field rules come
// from schema.config.ts, cross-field checks are wrapped around the finished object.
//
// Optional text fields accept "" because a form sends "" for an empty input. The caller turns
// "" into "clear this field" (null) when it builds the API request.

// SCHEMA
/** Mirrors PATCH /account/profile. The email is NOT here: it changes through CHANGE_EMAIL. */
export const updateProfileSchema = z.object({
  fullname: fullnameRules,
  username: optionalRules(usernameRules),
  phone: optionalRules(phoneRules),
  birthDate: optionalRules(birthDateStringRules),
  gender: optionalRules(genderRules),
  bio: optionalRules(bioRules),
  website: optionalRules(httpsUrlRules),
  twitterUrl: optionalRules(httpsUrlRules),
  githubUrl: optionalRules(httpsUrlRules),
  linkedinUrl: optionalRules(httpsUrlRules),
});

/** Mirrors POST /auth/email/change-password. */
export const changePasswordSchema = withFieldsMatch(
  z.object({
    // Not held to the complexity rules: it only has to be what the user already has, and a
    // password from before a policy change must still be accepted here.
    currentPassword: z.string().min(1, schemaMessages.passwordRequired),
    newPassword: passwordRules,
    confirmPassword: confirmPasswordRules,
  }),
  "newPassword",
  "confirmPassword",
)
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ["newPassword"],
  })
  .describe("Change password form");

/**
 * Mirrors the same endpoint for accounts that have NO password yet (created through Google):
 * there is no current password to ask for, so this form SETS the first one.
 */
export const setPasswordSchema = withFieldsMatch(
  z.object({
    newPassword: passwordRules,
    confirmPassword: confirmPasswordRules,
  }),
  "newPassword",
  "confirmPassword",
).describe("Set password form");

/** Mirrors POST /auth/email/change-email (a confirmation link goes to the new address). */
export const changeEmailSchema = z.object({
  newEmail: emailRules,
  // Re-authentication. Provider-only accounts have no password and are sent through a recent
  // sign-in instead, so the field is optional here and the backend decides.
  password: z.string().optional(),
});

/** Mirrors PATCH /account/preferences. */
export const updatePreferencesSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  marketingEmails: z.boolean(),
  reducedMotion: z.boolean(),
  highContrast: z.boolean(),
});

// SCHEMA OUTPUT
export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
export type SetPasswordValues = z.infer<typeof setPasswordSchema>;
export type ChangeEmailValues = z.infer<typeof changeEmailSchema>;
export type UpdatePreferencesValues = z.infer<typeof updatePreferencesSchema>;
