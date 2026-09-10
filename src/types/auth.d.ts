// BASE ENTITIES
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface User extends BaseEntity {
  email: string;
  fullname: string;
  avatar_url?: string | null;
  is_verified?: boolean;
  role?: UserRole;
}

export type UserRole = "USER" | "ADMIN" | "MODERATOR";

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends SigninCredentials {
  fullname: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// Matches actual backend shape:
// { expires_at: 1782414815000, expires_in: 24 }
export interface Session {
  expires_at: number;
  expires_in: number;
}

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

export interface RefreshSessionRequestBody {
  refresh_token?: string;
}

export interface ForgotPasswordRequestBody {
  email: string;
}

export interface ResetPasswordRequestBody {
  token: string;
  password: string;
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

// Matches actual backend shape — user/session are top-level, not nested under data.
// { success, message, user, session, access_token? }
export interface AuthResponseData {
  user: User;
  session: Session;
  access_token?: string;
}

// The auth endpoints return a flat success response — success/message at the
// top level alongside user and session, not wrapped in a data envelope.
export type AuthResponse = {
  success: boolean;
  message: string;
  user: User;
  session: Session;
  access_token?: string;
};
