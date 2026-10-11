"use client";
import DynamicForm, {
  type DynamicFormProps,
} from "@/components/features/forms/DynamicForm";
import {
  type ProfileFormKey,
  profileFormConfig,
  profileSchemaMap,
} from "@/packages/forms/profile.form";
import type { FormValues } from "@/packages/utils/create-form-registry";

/** The values a given profile form submits, e.g. ProfileFormValues<"CHANGE_EMAIL">. */
export type ProfileFormValues<K extends ProfileFormKey> = FormValues<
  typeof profileSchemaMap,
  K
>;

interface ProfileFormProps<K extends ProfileFormKey> extends Omit<
  DynamicFormProps,
  "form" | "schema" | "onSubmit" | "initialValues" | "presetDefaults"
> {
  formKey: K;
  /** The user's current values; the form starts from them. Only keys of this form apply. */
  initialValues?: Partial<ProfileFormValues<K>>;
  /** Called with the validated values, already typed for this form. */
  onSubmit?: (values: ProfileFormValues<K>) => void;
}

/**
 * Profile, password, email and preference forms. All the work is in DynamicForm; this only
 * picks the config and schema for `formKey` and types what comes back.
 */
function ProfileForm<K extends ProfileFormKey>({
  formKey,
  initialValues,
  onSubmit,
  ...rest
}: ProfileFormProps<K>) {
  return (
    <DynamicForm
      form={profileFormConfig[formKey]}
      schema={profileSchemaMap[formKey]}
      initialValues={initialValues}
      onSubmit={onSubmit && ((data) => onSubmit(data as ProfileFormValues<K>))}
      {...rest}
    />
  );
}

export default ProfileForm;
