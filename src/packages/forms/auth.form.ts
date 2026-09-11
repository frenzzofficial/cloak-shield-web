import type z from "zod";
import type { InputType } from "../../types/app";

import {
  forgetPasswordSchema,
  resetPasswordSchema,
  signinSchema,
  signupSchema,
  updateProfileSchema,
} from "../schemas/auth.schema";

//  TYPES
export interface FormInputType {
  key: string;
  id: string;
  label: string;
  type: InputType;
  placeholder: string;
  autoComplete?: string;
  options?: { label: string; value: string }[];
  required: boolean;
  errorMessage: string;
}

export interface ReferToType {
  href: string;
  label: string;
}

export interface SubmitType {
  label: string;
  onSubmitLabel: string;
}

export interface FormListType {
  key: string;
  title: string;
  description: string;
  icon?: string;
  submit?: SubmitType;
  referTo?: ReferToType;
  formInputs: FormInputType[];
}

//  CONFIG (OBJECT MAP ✅)
export const authFormConfig: Record<string, FormListType> = {
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

  UPDATE_PROFILE: {
    key: "UPDATE_PROFILE",
    title: "Update Profile",
    description: "Update your personal information",
    icon: "UserCog",
    submit: {
      label: "Update",
      onSubmitLabel: "Updating...",
    },
    referTo: {
      href: "signin",
      label: "Back to login?",
    },
    formInputs: [
      {
        key: "UPDATE-FULLNAME",
        id: "fullname",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        autoComplete: "name",
        required: true,
        errorMessage: "Full Name is required",
      },
      {
        key: "UPDATE-EMAIL",
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        autoComplete: "email",
        required: true,
        errorMessage: "Email is required",
      },
      {
        key: "UPDATE-PHONE",
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+1 555 000 1234",
        autoComplete: "tel",
        required: false,
        errorMessage: "Enter a valid phone number",
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
  UPDATE_PROFILE: updateProfileSchema,
} as const;

export type AuthSchemaMap = typeof authSchemaMap;

export type AuthSchemaKey = keyof AuthSchemaMap;

export type AuthSchemaType<K extends AuthSchemaKey> = z.infer<AuthSchemaMap[K]>;
