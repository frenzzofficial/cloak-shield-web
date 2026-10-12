"use client";
import "@/styles/ui/form.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import {
  type Control,
  type FieldErrors,
  type Resolver,
  type SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import type { z } from "zod";
import { Button, Card, Link } from "@/components/ui";
import InputFactory, {
  type InputFactoryProps,
} from "@/components/ui/inputs/Inputfactory";
import { formsConfig } from "@/packages/configs/forms.config";
import { cn } from "@/packages/utils/cn";
import type {
  FieldOverride,
  FormHelpers,
  FormInputType,
  FormListType,
  FormOverrides,
} from "@/types/form";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DynamicFormProps {
  /** What to draw: title, fields, submit labels. Comes from a *.form.ts config. */
  form: FormListType;
  /** What to enforce: the Zod schema that belongs to `form`. */
  schema: z.ZodType;
  /**
   * Gets the validated values. May be async: the button shows its "submitting" label until it
   * settles. `helpers` lets it report a server error under a field or above the buttons.
   */
  onSubmit?: (data: unknown, helpers: FormHelpers) => void | Promise<void>;
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
  /**
   * "card" (default) draws the form inside its own Card with the description and the
   * `referTo` footer. "plain" draws just the fields and buttons, for a place that already has
   * its own frame and heading, e.g. a modal.
   */
  layout?: "card" | "plain";
  /** Replace the config's title / description / submit labels / referTo for this use only. */
  overrides?: FormOverrides;
  /** Field ids to leave out of this use (they are neither drawn nor part of the values). */
  omitFields?: string[];
  /** Change single fields for this use only: label, placeholder, autoComplete, maxLength… */
  fieldOverrides?: Record<string, FieldOverride>;
  /**
   * Content drawn right under a field, keyed by field id. A function receives the field's
   * live value, e.g. a password strength meter under `newPassword`.
   */
  fieldSlots?: Record<
    string,
    React.ReactNode | ((value: unknown) => React.ReactNode)
  >;
  /** Rendered before the fields, e.g. a hidden username input for password managers. */
  header?: React.ReactNode;
  /** Replace the single submit button, e.g. Cancel + Save. */
  renderActions?: (state: {
    pending: boolean;
    submitLabel: string;
  }) => React.ReactNode;
  /** Classes for the box around the fields (spacing between them). */
  fieldsClassName?: string;
  /** Rendered after the fields, before the submit button — e.g. a "Forgot password?" link. */
  children?: React.ReactNode;
  /** Rendered after the submit button — e.g. a divider + social sign-in buttons. */
  footer?: React.ReactNode;
}

interface FormLayoutProps {
  form: FormListType;
  plain?: boolean | undefined;
  children: React.ReactNode;
  className?: string;
}

interface FormFieldsProps {
  inputs: FormInputType[];
  slots?: DynamicFormProps["fieldSlots"];
  className?: string | undefined;
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
const FieldSlot = ({
  id,
  control,
  slot,
}: {
  id: string;
  control: unknown;
  slot: React.ReactNode | ((value: unknown) => React.ReactNode);
}) => {
  const value = useWatch({
    control: control as Control<Record<string, unknown>>,
    name: id,
  });
  return <>{typeof slot === "function" ? slot(value) : slot}</>;
};

/** Only adds a box when the caller asked for classes; otherwise the fields stay direct children. */
const Wrapper = ({
  className,
  children,
}: {
  className?: string | undefined;
  children: React.ReactNode;
}) =>
  className ? (
    <div className={className}>{children}</div>
  ) : (
    <div>{children}</div>
  );

const FormFields = ({
  inputs,
  slots,
  className,
  register,
  control,
  errors,
}: FormFieldsProps) => {
  return (
    <Wrapper className={className}>
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

            {slots?.[input.id] !== undefined && (
              <FieldSlot
                id={input.id}
                control={control}
                slot={slots[input.id] as React.ReactNode}
              />
            )}
          </div>
        );
      })}
    </Wrapper>
  );
};

const FormLayout = ({ form, plain, children, className }: FormLayoutProps) => {
  const { referTo } = form;

  if (plain) return <div className={className}>{children}</div>;

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
  form: baseForm,
  schema,
  onSubmit: externalSubmit,
  isLoading = false,
  className,
  initialValues,
  presetDefaults = false,
  hiddenFields,
  layout = "card",
  overrides,
  omitFields,
  fieldOverrides,
  fieldSlots,
  header,
  renderActions,
  fieldsClassName,
  children,
  footer,
}: DynamicFormProps) => {
  // The config with this use's changes applied. The config object itself is never mutated.
  const form = useMemo<FormListType>(
    () => ({
      ...baseForm,
      ...overrides,
      formInputs: baseForm.formInputs
        .filter((input) => !omitFields?.includes(input.id))
        .map((input) => ({ ...input, ...fieldOverrides?.[input.id] })),
    }),
    [baseForm, overrides, omitFields, fieldOverrides],
  );

  const [formError, setFormError] = useState<string | null>(null);
  // Server-side messages live in our own state, not in react-hook-form's: it updates its errors
  // object in place, which React (and the React Compiler) would not see as a change.
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useDynamicForm(form, schema, {
    hiddenFields,
    initialValues,
    presetDefaults,
  });

  const helpers: FormHelpers = {
    setFieldError: (fieldId, message) =>
      setServerErrors((prev) => ({ ...prev, [fieldId]: message })),
    setFormError,
    reset: () => reset(),
  };

  // A server message belongs to the value that was sent: editing that field removes it.
  useEffect(() => {
    const subscription = watch((_values, { name }) => {
      if (!name) return;
      setServerErrors((prev) => {
        if (!(name in prev)) return prev;
        const { [name]: _removed, ...rest } = prev;
        return rest;
      });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<Record<string, unknown>> = async (data) => {
    setFormError(null);
    setServerErrors({});
    if (externalSubmit) {
      await externalSubmit(data, helpers);
    } else if (process.env.NODE_ENV === "development") {
      // Values are deliberately not logged: forms here carry passwords.
      console.warn(
        `[DynamicForm] "${form.key}" was submitted but has no onSubmit handler.`,
      );
    }
  };

  const plain = layout === "plain";
  const pending = isLoading || isSubmitting;
  const submitLabel = pending
    ? (form.submit?.onSubmitLabel ?? "")
    : (form.submit?.label ?? "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {hiddenFields &&
        Object.keys(hiddenFields).map((key) => (
          <input key={key} type="hidden" {...register(key)} />
        ))}

      <FormLayout
        form={form}
        plain={plain}
        className={cn(plain && "flex flex-col gap-5", className)}
      >
        {header}

        <FormFields
          inputs={form.formInputs}
          slots={fieldSlots}
          className={fieldsClassName}
          register={register}
          control={control}
          errors={{
            ...errors,
            ...Object.fromEntries(
              Object.entries(serverErrors).map(([id, message]) => [
                id,
                { type: "server", message },
              ]),
            ),
          }}
        />

        {children}

        {formError && (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {formError}
          </p>
        )}

        {renderActions
          ? renderActions({ pending, submitLabel })
          : form.submit && (
              <Button type="submit" disabled={pending}>
                {submitLabel}
              </Button>
            )}

        {footer}
      </FormLayout>
    </form>
  );
};

export default DynamicForm;
