"use client";
import "@/styles/ui/form.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import {
  type FieldErrors,
  type Resolver,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import type { z } from "zod";
import { Button, Card, Link } from "@/components/ui";
import InputFactory, {
  type InputFactoryProps,
} from "@/components/ui/inputs/Inputfactory";
import { formsConfig } from "@/packages/configs/forms.config";
import type { FormInputType, FormListType } from "@/types/form";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DynamicFormProps {
  /** What to draw: title, fields, submit labels. Comes from a *.form.ts config. */
  form: FormListType;
  /** What to enforce: the Zod schema that belongs to `form`. */
  schema: z.ZodType;
  onSubmit?: (data: unknown) => void;
  isLoading?: boolean | undefined;
  className?: string;
  /**
   * Starting values, e.g. the signed-in user's current profile. Fields not listed start empty
   * (or unchecked). When this changes after mount the form follows, without discarding what
   * the user has already edited.
   */
  initialValues?: Record<string, unknown>;
  /**
   * Prefill fullname/email with the demo values from `formsConfig.defaultValues` (development
   * builds only). Meant for sign-in and sign-up; leave off for forms that edit real data.
   */
  presetDefaults?: boolean;
  /**
   * Values that must be part of the submitted payload but are never
   * user-editable — e.g. a password-reset `token` read from the URL.
   * Rendered as `<input type="hidden">` fields registered with
   * react-hook-form, so they're included in validation/submission
   * without appearing in `form.formInputs`.
   */
  hiddenFields?: Record<string, string>;
  /** Rendered after the fields, before the submit button — e.g. a "Forgot password?" link. */
  children?: React.ReactNode;
  /** Rendered after the submit button — e.g. a divider + social sign-in buttons. */
  footer?: React.ReactNode;
}

interface FormLayoutProps {
  form: FormListType;
  children: React.ReactNode;
  className?: string;
}

interface FormFieldsProps {
  inputs: FormInputType[];
  // all unknown — cast at point of use inside InputFactory
  register: unknown;
  control: unknown;
  errors: FieldErrors<Record<string, unknown>>;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const buildDefaultValues = (
  form: FormListType,
  options: {
    hiddenFields?: Record<string, string> | undefined;
    initialValues?: Record<string, unknown> | undefined;
    presetDefaults?: boolean | undefined;
  },
): Record<string, unknown> => {
  const values: Record<string, unknown> = { ...options.hiddenFields };
  const presets: Record<string, unknown> = options.presetDefaults
    ? formsConfig.defaultValues
    : {};

  for (const field of form.formInputs) {
    const initial = options.initialValues?.[field.id];
    const preset = presets[field.id];
    values[field.id] =
      initial !== undefined && initial !== null
        ? initial
        : preset !== undefined
          ? preset
          : (field.defaultValue ?? (field.type === "checkbox" ? false : ""));
  }

  return values;
};

// ─── useDynamicForm ───────────────────────────────────────────────────────────
const useDynamicForm = (
  form: FormListType,
  schema: z.ZodType,
  options: Parameters<typeof buildDefaultValues>[1],
) => {
  const defaultValues = buildDefaultValues(form, options);
  const resolver = zodResolver(
    schema as Parameters<typeof zodResolver>[0],
  ) as unknown as Resolver<Record<string, unknown>>;

  // `values` makes react-hook-form adopt new initial values (a profile that finished loading
  // after the form mounted) while `keepDirtyValues` protects anything already typed.
  const initialKey = JSON.stringify(options.initialValues ?? null);
  // biome-ignore lint/correctness/useExhaustiveDependencies: initialKey stands for initialValues
  const values = useMemo(
    () => (options.initialValues ? defaultValues : undefined),
    [initialKey],
  );

  return useForm<Record<string, unknown>>({
    resolver,
    defaultValues,
    ...(values ? { values, resetOptions: { keepDirtyValues: true } } : {}),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    shouldUnregister: false,
  });
};

// ─── FormFields ───────────────────────────────────────────────────────────────
const FormFields = ({ inputs, register, control, errors }: FormFieldsProps) => {
  return (
    <>
      {inputs.map((input) => {
        const renderer = InputFactory[input.type as keyof typeof InputFactory];

        const rawError = errors[input.id];
        const errorMessage =
          rawError && typeof rawError === "object" && "message" in rawError
            ? String((rawError as { message: unknown }).message)
            : "";

        const props: unknown = {
          ...input,
          register: register as InputFactoryProps["register"],
          control: control as InputFactoryProps["control"],
          error: { message: errorMessage },
        };

        if (!renderer && process.env.NODE_ENV === "development") {
          console.warn(
            `[DynamicForm] No InputFactory renderer registered for input type "${input.type}" (field "${input.id}"). It will not render. Add a case to InputFactory in Inputfactory.tsx.`,
          );
        }

        return (
          <div key={input.key} className="flex flex-col gap-2 p-1">
            {input.type !== "checkbox" && (
              <label htmlFor={input.id} className="text-sm font-medium">
                {input.label}
                {input.required && (
                  <span className="text-destructive ml-0.5">*</span>
                )}
              </label>
            )}

            {renderer ? renderer(props as unknown as InputFactoryProps) : null}
          </div>
        );
      })}
    </>
  );
};

const FormLayout = ({ form, children, className }: FormLayoutProps) => {
  const { referTo } = form;

  return (
    <Card className={`form-card sm:min-w-120 ${className ?? ""}`}>
      <header className="form-card__header">
        {form.description && (
          <p className="form-card__description">{form.description}</p>
        )}
      </header>

      <section className="form-card__content">{children}</section>

      {referTo && (
        <footer className="form-card__footer">
          <p className="form-card__footer-text">
            {referTo.label}{" "}
            <Link
              href={`/${referTo.href}`}
              variant="secondary"
              className="underline"
            >
              {referTo.href}
            </Link>
          </p>
        </footer>
      )}
    </Card>
  );
};

// ─── DynamicForm ──────────────────────────────────────────────────────────────
/**
 * The one form renderer. It knows nothing about auth or profiles: give it a config (what to
 * draw) and a schema (what to enforce) and it builds the fields, validates on change, and hands
 * the validated values to `onSubmit`. AuthForm, ProfileForm and any later family are thin
 * wrappers that only choose the config and schema.
 */
const DynamicForm = ({
  form,
  schema,
  onSubmit: externalSubmit,
  isLoading = false,
  className,
  initialValues,
  presetDefaults = false,
  hiddenFields,
  children,
  footer,
}: DynamicFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useDynamicForm(form, schema, {
    hiddenFields,
    initialValues,
    presetDefaults,
  });

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    if (externalSubmit) {
      externalSubmit(data);
    } else if (process.env.NODE_ENV === "development") {
      // Values are deliberately not logged: forms here carry passwords.
      console.warn(
        `[DynamicForm] "${form.key}" was submitted but has no onSubmit handler.`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {hiddenFields &&
        Object.keys(hiddenFields).map((key) => (
          <input key={key} type="hidden" {...register(key)} />
        ))}

      <FormLayout form={form} className={className}>
        <FormFields
          inputs={form.formInputs}
          register={register}
          control={control}
          errors={errors}
        />

        {children}

        {form.submit && (
          <Button type="submit" disabled={isSubmitting}>
            {isLoading ? form.submit.onSubmitLabel : form.submit.label}
          </Button>
        )}

        {footer}
      </FormLayout>
    </form>
  );
};

export default DynamicForm;
