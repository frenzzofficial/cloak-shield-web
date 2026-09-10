"use client";
import "@/styles/utils/form.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FieldErrors,
  type Resolver,
  type SubmitHandler,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { Button, Card, Link } from "@/components/ui";
import InputFactory, {
  type InputFactoryProps,
} from "@/components/ui/inputs/Inputfactory";
import { formsConfig } from "@/packages/configs/forms.config";
import {
  type AuthSchemaKey,
  authFormConfig,
  authSchemaMap,
  type FormInputType,
  type FormListType,
} from "@/packages/forms/auth.form";

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthFormProps {
  formKey: AuthSchemaKey;
  onSubmit?: (data: unknown) => void;
  isLoading?: boolean | undefined;
  className?: string;
}

interface FormLayoutProps {
  form: FormListType;
  children: React.ReactNode;
  className?: string;
  // animationDirection?: AnimationDirectionType;
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
  formKey: AuthSchemaKey,
): Record<string, unknown> => {
  const form = authFormConfig[formKey];
  const values: Record<string, unknown> = {};
  const defaultValues = formsConfig.defualtValues;

  form.formInputs.forEach((field) => {
    const preset = defaultValues[field.id as keyof typeof defaultValues];
    values[field.id] =
      preset !== undefined ? preset : field.type === "checkbox" ? false : "";
  });

  return values;
};

// ─── useAuthForm ──────────────────────────────────────────────────────────────
const useAuthForm = (formKey: AuthSchemaKey) => {
  const schema = authSchemaMap[formKey];
  const defaultValues = buildDefaultValues(formKey);
  const resolver = zodResolver(
    schema as Parameters<typeof zodResolver>[0],
  ) as unknown as Resolver<Record<string, unknown>>;

  return useForm<Record<string, unknown>>({
    resolver: resolver,
    defaultValues,
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

            {errorMessage && input.type !== "checkbox" && (
              <span className="text-destructive text-xs">{errorMessage}</span>
            )}
          </div>
        );
      })}
    </>
  );
};

const FormLayout = ({ form, children, className }: FormLayoutProps) => {
  const { referTo } = form;

  return (
    <Card className={`form-card ${className ?? ""}`}>
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

// ─── AuthForm ─────────────────────────────────────────────────────────────────
const AuthForm = ({
  formKey,
  onSubmit: externalSubmit,
  isLoading = false,
  className,
}: AuthFormProps) => {
  const form = authFormConfig[formKey];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useAuthForm(formKey);

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    if (externalSubmit) {
      externalSubmit(data);
    } else {
      console.log(`[${formKey}] submitted:`, data);
      console.log(`[${formKey}] errors:`, errors);

      setTimeout(() => {
        toast.success(`${formKey.toLocaleLowerCase()} submitted`);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormLayout form={form} className={className}>
        <FormFields
          inputs={form.formInputs}
          register={register}
          control={control}
          errors={errors}
        />

        {form.submit && (
          <Button type="submit" disabled={isSubmitting}>
            {isLoading ? form.submit.onSubmitLabel : form.submit.label}
          </Button>
        )}
      </FormLayout>
    </form>
  );
};

export default AuthForm;
