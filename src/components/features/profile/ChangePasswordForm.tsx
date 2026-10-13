"use client";

import { useId, useMemo } from "react";
import { toast } from "sonner";
import ProfileForm from "@/components/features/profile/ProfileForm";
import {
  modalActions,
  ProfileModalFrame,
} from "@/components/features/profile/ProfileModalFrame";
import { useAuth } from "@/components/providers/AuthProvider";
import { LockIcon } from "@/components/ui/icons/dashboard-icons";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { changePassword } from "@/packages/services/auth.services";
import { PASSWORD_MAX_LENGTH } from "@/packages/utils/password-rules";
import type { FieldOverride, FormHelpers } from "@/types/form";
import type { ProfileModalFormProps } from "@/types/modal";
import PasswordStrength from "../../layouts/PasswordStrength";

/** What both password forms hand over; `currentPassword` exists only on CHANGE_PASSWORD. */
interface PasswordFormValues {
  currentPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * The Change Password / Set a Password dialog content. Mounted only while the dialog is open (CenteredModal renders nothing when closed), so every
 * opening starts from empty fields: a password never lingers in state after the dialog closes.
 *
 * The fields, rules and validation come from profile.form.ts / profile.schema.ts. This file
 * only adds what is specific to the dialog: its frame, the strength meter, the buttons and what
 * happens after the request.
 */
const ChangePasswordForm = ({
  titleId,
  onClose,
  onChanged,
}: ProfileModalFormProps) => {
  const { user, refreshUser } = useAuth();
  const strengthId = useId();

  // Accounts created through Google have no password: for them SET_PASSWORD creates the first
  // one, and there is no current password to ask for.
  const hasPassword = user?.hasPassword !== false;
  const formKey = hasPassword ? "CHANGE_PASSWORD" : "SET_PASSWORD";
  const config = profileFormConfig[formKey];

  const fieldOverrides = useMemo<Record<string, FieldOverride>>(
    () => ({
      currentPassword: { maxLength: PASSWORD_MAX_LENGTH, autoFocus: true },
      newPassword: {
        maxLength: PASSWORD_MAX_LENGTH,
        describedBy: strengthId,
        autoFocus: !hasPassword,
      },
      confirmPassword: { maxLength: PASSWORD_MAX_LENGTH },
    }),
    [hasPassword, strengthId],
  );

  const onSubmit = async (values: PasswordFormValues, helpers: FormHelpers) => {
    try {
      const res = await changePassword({
        ...(hasPassword ? { currentPassword: values.currentPassword } : {}),
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      toast.success(
        res.message || (hasPassword ? "Password changed." : "Password set."),
      );
      await refreshUser(); // hasPassword may have flipped to true
      onChanged?.(); // other devices were signed out: let the page reload its device list
      onClose();
    } catch (err: unknown) {
      const message = getAuthErrorMessage(
        err,
        "Couldn't update your password. Please try again.",
      );
      // The wrong current password belongs under that field; anything else is general.
      if (/current password/i.test(message) && hasPassword) {
        helpers.setFieldError("currentPassword", message);
      } else {
        helpers.setFormError(message);
      }
    }
  };

  return (
    <ProfileModalFrame
      titleId={titleId}
      onClose={onClose}
      icon={<LockIcon className="size-7" />}
      title={config.title}
      description={config.description}
    >
      {/* key: switching between the two forms (hasPassword flips) starts a fresh form. */}
      <ProfileForm
        key={formKey}
        formKey={formKey}
        layout="plain"
        className="mt-6"
        fieldsClassName="flex flex-col gap-5"
        fieldOverrides={fieldOverrides}
        fieldSlots={{
          newPassword: (value) => (
            <PasswordStrength
              id={strengthId}
              value={typeof value === "string" ? value : ""}
            />
          ),
        }}
        // Lets password managers file the new password under the right account.
        header={
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
        }
        onSubmit={onSubmit}
        renderActions={modalActions(onClose)}
      >
        <p className="text-xs text-muted-foreground">
          {hasPassword
            ? "Changing your password signs you out of your other devices."
            : "You will stay signed in on this device."}
        </p>
      </ProfileForm>
    </ProfileModalFrame>
  );
};

export default ChangePasswordForm;
