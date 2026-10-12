import type z from "zod";
import type { FormListType } from "../../types/form";
import {
  forgetPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
} from "../schemas/auth.schema";
import { createFormRegistry } from "../utils/create-form-registry";

export type {
  FormInputType,
  FormListType,
  ReferToType,
  SubmitType,
} from "../../types/form";

//  CONFIG (OBJECT MAP ✅)
export const authFormConfig: Record<keyof typeof authSchemaMap, FormListType> =
  {
    SIGNIN: {
      key: "SIGNIN",
      title: "Sign In",
      description: "Welcome to Sign In",
      icon: "User",
      submit: {
        label: "Sign In",
        onSubmitLabel: "Signing In...",
      },
      referTo: {
        href: "signup",
        label: "Don't have an account?",
      },
      formInputs: [
        {
          key: "SIGNIN-EMAIL",
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          autoComplete: "email",
          required: true,
          errorMessage: "Email is required",
        },
        {
          key: "SIGNIN-PASSWORD",
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          autoComplete: "current-password",
          required: true,
          errorMessage: "Password is required",
        },
        {
          key: "SIGNIN-REMEMBER",
          id: "remember",
          label: "Remember me",
          type: "checkbox",
          placeholder: "",
          required: false,
          errorMessage: "you must accept the terms and conditions",
        },
      ],
    },

    SIGNUP: {
      key: "SIGNUP",
      title: "Create Account",
      description: "Sign up to get started",
      icon: "UserPlus",
      submit: {
        label: "Sign Up",
        onSubmitLabel: "Creating Account...",
      },
      referTo: {
        href: "signin",
        label: "Already have an account?",
      },
      formInputs: [
        {
          key: "SIGNUP-FULLNAME",
          id: "fullname",
          label: "Full Name",
          type: "text",
          placeholder: "Enter your full name",
          autoComplete: "name",
          required: true,
          errorMessage: "Full Name is required",
        },
        {
          key: "SIGNUP-EMAIL",
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          autoComplete: "email",
          required: true,
          errorMessage: "Email is required",
        },
        {
          key: "SIGNUP-PASSWORD",
          id: "password",
          label: "Password",
          type: "password",
          placeholder: "Create a password",
          autoComplete: "new-password",
          required: true,
          errorMessage: "Password is required",
        },
        {
          key: "SIGNUP-CONFIRM-PASSWORD",
          id: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm your password",
          autoComplete: "new-password",
          required: true,
          errorMessage: "Please confirm your password",
        },
        {
          key: "SIGNUP-AGREE-TERMS",
          id: "agreeToTerms",
          label: "I agree to the terms and conditions",
          type: "checkbox",
          placeholder: "",
          required: true,
          errorMessage: "You must accept the terms and conditions",
        },
      ],
    },

    FORGOT_PASSWORD: {
      key: "FORGOT_PASSWORD",
      title: "Forgot Password",
      description: "Enter your email to reset password",
      icon: "Key",
      submit: {
        label: "Send Reset Link",
        onSubmitLabel: "Sending...",
      },
      referTo: {
        href: "signin",
        label: "Back to login?",
      },
      formInputs: [
        {
          key: "FORGOT-EMAIL",
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          autoComplete: "email",
          required: true,
          errorMessage: "Email is required",
        },
      ],
    },

    RESET_PASSWORD: {
      key: "RESET_PASSWORD",
      title: "Reset Password",
      description: "Enter your new password",
      icon: "Lock",
      submit: {
        label: "Reset Password",
        onSubmitLabel: "Resetting...",
      },
      referTo: {
        href: "signin",
        label: "Back to login?",
      },
      formInputs: [
        {
          key: "RESET-PASSWORD",
          id: "password",
          label: "New Password",
          type: "password",
          placeholder: "Enter new password",
          autoComplete: "new-password",
          required: true,
          errorMessage: "Password is required",
        },
        {
          key: "RESET-CONFIRM",
          id: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "Confirm new password",
          autoComplete: "new-password",
          required: true,
          errorMessage: "Please confirm password",
        },
      ],
    },
  };

//  TYPESAFE KEY

export type AuthFormKey = keyof typeof authFormConfig;

export const authSchemaMap = {
  SIGNIN: signinSchema,
  SIGNUP: signupSchema,
  FORGOT_PASSWORD: forgetPasswordSchema,
  RESET_PASSWORD: resetPasswordSchema,
} as const;

export type AuthSchemaMap = typeof authSchemaMap;

export type AuthSchemaKey = keyof AuthSchemaMap;

export type AuthSchemaType<K extends AuthSchemaKey> = z.infer<AuthSchemaMap[K]>;

export const authForms = createFormRegistry(authFormConfig, authSchemaMap);
