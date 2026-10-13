import type { UserRole } from "@/packages/configs/roles.config";

// The user exactly as the backend sends it (GET /v1/auth/email/me, sign-in, sign-up).
export interface User {
  id: string;
  email: string;
  fullname: string;
  role?: UserRole;
  status?: string;
  /** False for accounts created through a provider (e.g. Google) that never set a password. */
  hasPassword?: boolean;
  avatarUrl?: string | null;
}

// Re-exported so existing `import type { UserRole } from "@/types/auth"`
// call sites keep working. `roles.config.ts` (packages/configs) is the
// single source of truth.
export type { UserRole };

export interface SignupRequestBody {
  email: string;
  password: string;
  fullname: string;
}

export interface SigninRequestBody {
  email: string;
  password: string;
  remember: boolean;
}

export interface ForgotPasswordRequestBody {
  email: string;
}

export interface ResetPasswordRequestBody {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequestBody {
  /** Left out for accounts that have no password yet (created through a provider). */
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  /** How many OTHER devices were signed out by the change. */
  revokedSessions: number;
}

export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data?: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  field?: string;
  issues?: unknown;
}

export type ApiResponse<T = unknown> = SuccessResponse<T> | ErrorResponse;

// Sign-in and sign-up answer with success/message/user at the top level. When the server
// requires verified emails, sign-up creates the account but does NOT sign the user in:
// `requiresVerification` is true and the session cookies are not set.
export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  requiresVerification?: boolean;
}

export interface MeResponse {
  success: boolean;
  message: string;
  user: User;
}

/** One entry of GET /v1/auth/providers — the sign-in methods this server offers. */
export interface AuthProviderInfo {
  id: string;
  kind: "password" | "oauth";
  label: string;
  /** For "oauth" methods: the path a "Continue with ..." button navigates to. */
  startPath?: string;
}

export interface ProvidersResponse {
  success: boolean;
  providers: AuthProviderInfo[];
}
