import { z } from "zod";
import {
  emailRules,
  fullnameRules,
  passwordRules,
} from "@/packages/configs/schema.config";
import { UserRoles, UserRolesValues } from "../configs/roles.config";

// ✅ Schema uses the actual env var names (with NEXT_PUBLIC_ prefix)
const envConfigSchema = z.object({
  NEXT_PUBLIC_DEFAULT_USER_ID: z.string().default("default-user-1"),
  NEXT_PUBLIC_DEFAULT_USER_FULLNAME: fullnameRules.default("John Doe"),
  NEXT_PUBLIC_DEFAULT_USER_EMAIL: emailRules.default("johndoe@gmail.com"),
  NEXT_PUBLIC_DEFAULT_USER_PASSWORD: passwordRules.default("Johndoe#1234"),
  NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL: z.string().default(""),
  NEXT_PUBLIC_DEFAULT_USER_ROLE: z
    .enum(UserRolesValues)
    .default(UserRoles.USER),
  NEXT_PUBLIC_DEFAULT_USER_STATUS: z
    .enum(["ACTIVE", "INACTIVE"])
    .default("INACTIVE"),
});

// ✅ Validate process.env
const parsed = envConfigSchema.safeParse(
  process.env as unknown as Record<string, string>,
);

if (!parsed.success) {
  throw new Error(
    `❌ Invalid default User environment variables:\n${parsed.error.issues
      .map((i) => `• ${i.path.join(".")}: ${i.message}`)
      .join("\n")}`,
  );
}

// ✅ Map validated vars to clean keys
export const envDefaultUserConfig = Object.freeze({
  DEFAULT_USER_ID: parsed.data.NEXT_PUBLIC_DEFAULT_USER_ID,
  DEFAULT_USER_FULLNAME: parsed.data.NEXT_PUBLIC_DEFAULT_USER_FULLNAME,
  DEFAULT_USER_EMAIL: parsed.data.NEXT_PUBLIC_DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD: parsed.data.NEXT_PUBLIC_DEFAULT_USER_PASSWORD,
  DEFAULT_USER_AVATAR_URL: parsed.data.NEXT_PUBLIC_DEFAULT_USER_AVATAR_URL,
  DEFAULT_USER_ROLE: parsed.data.NEXT_PUBLIC_DEFAULT_USER_ROLE,
  DEFAULT_USER_STATUS: parsed.data.NEXT_PUBLIC_DEFAULT_USER_STATUS,
});

// ✅ Optional: Type-safe config
export type EnvDefaultUserConfig = typeof envDefaultUserConfig;
