import type { InputType } from "@/types/app";

// What a config-driven form is made of. Every form file (auth.form.ts, profile.form.ts, and
// whichever comes next) describes its forms with these types, and one renderer draws them all
// (components/features/forms/DynamicForm.tsx).

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
  /** Starting value when neither initialValues nor presets give one (e.g. theme: "system"). */
  defaultValue?: string | boolean;
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
