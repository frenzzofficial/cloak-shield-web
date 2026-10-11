"use client";
import DynamicForm, {
  type DynamicFormProps,
} from "@/components/features/forms/DynamicForm";
import {
  type AuthSchemaKey,
  authFormConfig,
  authSchemaMap,
} from "@/packages/forms/auth.form";

interface AuthFormProps
  extends Omit<DynamicFormProps, "form" | "schema" | "initialValues"> {
  formKey: AuthSchemaKey;
}

/** Sign-in, sign-up, forgot / reset password. All the work is in DynamicForm. */
const AuthForm = ({ formKey, ...rest }: AuthFormProps) => (
  <DynamicForm
    form={authFormConfig[formKey]}
    schema={authSchemaMap[formKey]}
    // Dev builds prefill the demo name/email on these forms.
    presetDefaults
    {...rest}
  />
);

export default AuthForm;
