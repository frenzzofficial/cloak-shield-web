/**
 * The password policy, as the backend enforces it (passwordRules in the API's
 * schemas.config.ts): 8-128 characters with an uppercase letter, a lowercase letter, a number
 * and a special character, and no whitespace. This copy only gives live feedback while typing;
 * the backend remains the authority and its answer is what the form finally shows.
 */

export const PASSWORD_MAX_LENGTH = 128;

export interface PasswordRule {
  id: string;
  label: string;
  test: (value: string) => boolean;
}

export const PASSWORD_RULES: readonly PasswordRule[] = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (v) => v.length >= 8 && v.length <= PASSWORD_MAX_LENGTH,
  },
  {
    id: "upper",
    label: "Includes an uppercase letter",
    test: (v) => /[A-Z]/.test(v),
  },
  {
    id: "lower",
    label: "Includes a lowercase letter",
    test: (v) => /[a-z]/.test(v),
  },
  { id: "number", label: "Includes a number", test: (v) => /[0-9]/.test(v) },
  {
    id: "special",
    label: "Includes a special character",
    // The backend counts any non-alphanumeric as special, spaces included, but rejects spaces
    // separately, so a space alone must not tick this box.
    test: (v) => /[^A-Za-z0-9\s]/.test(v),
  },
  {
    id: "spaces",
    label: "No spaces",
    test: (v) => v.length > 0 && !/\s/.test(v),
  },
];

export const unmetPasswordRules = (value: string): PasswordRule[] =>
  PASSWORD_RULES.filter((rule) => !rule.test(value));

export type StrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordStrength {
  /** How many of the 5 meter segments to fill. */
  segments: 0 | 1 | 2 | 3 | 4 | 5;
  level: StrengthLevel;
  label: "" | "Weak" | "Fair" | "Good" | "Strong";
}

/** Rules met, plus a bonus for length: 12+ characters is worth more than any single rule. */
export const passwordStrength = (value: string): PasswordStrength => {
  if (!value) return { segments: 0, level: 0, label: "" };

  const met = PASSWORD_RULES.filter((rule) => rule.test(value)).length;
  const score =
    met + (value.length >= 12 ? 1 : 0) + (value.length >= 16 ? 1 : 0);
  const max = PASSWORD_RULES.length + 2;
  const segments = Math.max(1, Math.ceil((score / max) * 5)) as
    | 1
    | 2
    | 3
    | 4
    | 5;

  if (met < PASSWORD_RULES.length) {
    return segments <= 2
      ? { segments, level: 1, label: "Weak" }
      : { segments: Math.min(segments, 3) as 3, level: 2, label: "Fair" };
  }
  return segments >= 5
    ? { segments: 5, level: 4, label: "Strong" }
    : { segments: Math.max(segments, 4) as 4, level: 3, label: "Good" };
};
