import { z } from "zod";
import {
  emailRules,
  fullnameRules,
  passwordRules,
  phoneRules,
  termsAcceptedRules,
  withPasswordConfirmation,
} from "../configs/schema.config";

// SCHEMA
export const signupSchema = withPasswordConfirmation(
  z.object({
    fullname: fullnameRules,
    email: emailRules,
    password: passwordRules,
    confirmPassword: passwordRules,
    agreeToTerms: termsAcceptedRules,
  }),
).describe("Registration form");

export const signinSchema = z.object({
  email: emailRules,
  password: passwordRules,
  remember: z.boolean().optional(),
});

export const forgetPasswordSchema = z.object({
  email: emailRules,
});

export const resetPasswordSchema = withPasswordConfirmation(
  z.object({
    token: z.string().min(1, "Token is required"),
    password: passwordRules,
    confirmPassword: passwordRules,
  }),
);

export const updatePasswordSchema = withPasswordConfirmation(
  z.object({
    password: passwordRules,
    confirmPassword: passwordRules,
  }),
);

export const updateProfileSchema = z.object({
  fullname: fullnameRules,
  email: emailRules,
  phone: z.union([phoneRules, z.literal("")]).optional(),
});

export const contactSchema = z.object({
  fullname: fullnameRules,
  email: emailRules,
  topic: z.string().trim().min(5, "Topic is required"),
  message: z.string().trim().min(5, "Message is required"),
  newsletter: z.boolean().optional(),
});

// SCHEMA OUTPUT
export type SignupSchemaInput = z.infer<typeof signupSchema>;
export type SignupSchemaOutput = z.output<typeof signupSchema>;
