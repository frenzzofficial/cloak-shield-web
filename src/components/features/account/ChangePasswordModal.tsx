"use client";

import { type FormEvent, useId, useRef, useState } from "react";
import { toast } from "sonner";
import CenteredModal from "@/components/features/navigation/modals/variants/CenteredModal";
import { useNavigationFeature } from "@/components/features/navigation/NavigationProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button, Card } from "@/components/ui";
import { CloseIcon, LockIcon } from "@/components/ui/icons/dashboard-icons";
import InputPassword from "@/components/ui/inputs/InputPassword";
import { MODAL_IDS } from "@/packages/configs/modal.config";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { changePassword } from "@/packages/services/auth.services";
import {
  PASSWORD_MAX_LENGTH,
  unmetPasswordRules,
} from "@/packages/utils/password-rules";
import PasswordStrength from "./PasswordStrength";

const TITLE_ID = "change-password-title";

interface FieldErrors {
  current?: string;
  next?: string;
  confirm?: string;
}

interface ChangePasswordFormProps {
  onChanged?: () => void;
}

/**
 * Mounted only while the dialog is open (CenteredModal renders nothing when closed), so every
 * opening starts from empty fields: a password never lingers in state after the dialog closes.
 */
const ChangePasswordForm = ({ onChanged }: ChangePasswordFormProps) => {
  const { close } = useNavigationFeature();
  const { user, refreshUser } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  const strengthId = useId();

  // Accounts created through Google have no password: for them this form SETS the first one,
  // and there is no current password to ask for.
  const hasPassword = user?.hasPassword !== false;

  const closeModal = () => close(MODAL_IDS.changePassword);

  const validate = (): FieldErrors => {
    const found: FieldErrors = {};
    if (hasPassword && !current) found.current = "Enter your current password";
    if (!next) found.next = "Enter a new password";
    else if (unmetPasswordRules(next).length > 0)
      found.next = "The new password doesn't meet every requirement yet";
    else if (hasPassword && next === current)
      found.next = "The new password must be different from the current one";
    if (!confirm) found.confirm = "Confirm your new password";
    else if (confirm !== next) found.confirm = "The passwords don't match";
    return found;
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting.current) return;

    const found = validate();
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length > 0) return;

    submitting.current = true;
    setPending(true);
    try {
      const res = await changePassword({
        ...(hasPassword ? { currentPassword: current } : {}),
        newPassword: next,
        confirmPassword: confirm,
      });
      toast.success(
        res.message || (hasPassword ? "Password changed." : "Password set."),
      );
      await refreshUser(); // hasPassword may have flipped to true
      onChanged?.(); // other devices were signed out: let the page reload its device list
      closeModal();
    } catch (err: unknown) {
      const message = getAuthErrorMessage(
        err,
        "Couldn't update your password. Please try again.",
      );
      // The wrong current password belongs under that field; anything else is general.
      if (/current password/i.test(message) && hasPassword) {
        setErrors({ current: message });
      } else {
        setFormError(message);
      }
    } finally {
      submitting.current = false;
      setPending(false);
    }
  };

  return (
    <Card className="p-7 sm:p-8">
      <button
        type="button"
        onClick={closeModal}
        aria-label="Close"
        className="absolute top-0 right-0 flex size-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/3 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <CloseIcon className="size-4.5" />
      </button>

      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/25 shadow-[0_0_30px_-8px_var(--primary)]">
        <LockIcon className="size-7" />
      </span>

      <h2
        id={TITLE_ID}
        className="mt-5 text-2xl font-semibold tracking-tight sm:text-[28px]"
      >
        {hasPassword ? "Change Password" : "Set a Password"}
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {hasPassword
          ? "Update your password to keep your account secure."
          : "Add a password so you can also sign in with your email and password."}
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        {/* Lets password managers file the new password under the right account. */}
        <input
          type="email"
          name="username"
          autoComplete="username"
          value={user?.email ?? ""}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
        />

        {hasPassword && (
          <InputPassword
            label="Current Password"
            name="currentPassword"
            autoComplete="current-password"
            placeholder="Enter your current password"
            value={current}
            onChange={(e) => {
              setCurrent(e.target.value);
              setErrors((prev) => ({ ...prev, current: undefined }));
            }}
            error={errors.current}
            maxLength={PASSWORD_MAX_LENGTH}
            data-autofocus
          />
        )}

        <InputPassword
          label="New Password"
          name="newPassword"
          autoComplete="new-password"
          placeholder="Enter your new password"
          value={next}
          onChange={(e) => {
            setNext(e.target.value);
            setErrors((prev) => ({ ...prev, next: undefined }));
          }}
          error={errors.next}
          maxLength={PASSWORD_MAX_LENGTH}
          aria-describedby={strengthId}
          {...(hasPassword ? {} : { "data-autofocus": true })}
        />

        <PasswordStrength id={strengthId} value={next} />

        <InputPassword
          label="Confirm New Password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            setErrors((prev) => ({ ...prev, confirm: undefined }));
          }}
          error={errors.confirm}
          maxLength={PASSWORD_MAX_LENGTH}
        />

        {formError && (
          <p
            role="alert"
            className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {formError}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          {hasPassword
            ? "Changing your password signs you out of your other devices."
            : "You will stay signed in on this device."}
        </p>

        <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
          <Button
            type="button"
            onClick={closeModal}
            className="btn-outline flex-1"
            disabled={pending}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-[1.4]" disabled={pending}>
            {pending
              ? "Saving…"
              : hasPassword
                ? "Update Password"
                : "Set Password"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

interface ChangePasswordModalProps {
  /** Called after a successful change, e.g. to reload the list of signed-in devices. */
  onChanged?: () => void;
}

const ChangePasswordModal = ({ onChanged }: ChangePasswordModalProps) => (
  <CenteredModal
    modalId={MODAL_IDS.changePassword}
    maxWidth="34rem"
    bare
    labelledBy={TITLE_ID}
  >
    <ChangePasswordForm onChanged={onChanged} />
  </CenteredModal>
);

export default ChangePasswordModal;
