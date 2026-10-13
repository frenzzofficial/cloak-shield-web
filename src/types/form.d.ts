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
  maxLength?: number;
  /** Shown but not editable (still part of the submitted values). */
  readOnly?: boolean;
  /** In a two-column layout, take the whole row. */
  fullWidth?: boolean;
  /** Focus this field when its dialog opens (CenteredModal looks for [data-autofocus]). */
  autoFocus?: boolean;
  /** id of an element that describes the field, e.g. a strength meter shown under it. */
  describedBy?: string;
}

/** Per-use changes to a field of a config, without touching the config itself. */
export type FieldOverride = Partial<Omit<FormInputType, "key" | "id">>;

/** Per-use changes to the form-level texts of a config. */
export type FormOverrides = Partial<
  Pick<FormListType, "title" | "description" | "submit" | "referTo">
>;

/** What an onSubmit handler can do to the form it came from. */
export interface FormHelpers {
  /** Show a server-side message under one field; it clears when the user edits that field. */
  setFieldError: (fieldId: string, message: string) => void;
  /** Show a message above the buttons (null clears it). Cleared on every new submit. */
  setFormError: (message: string | null) => void;
  /** Back to the starting values. */
  reset: () => void;
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
