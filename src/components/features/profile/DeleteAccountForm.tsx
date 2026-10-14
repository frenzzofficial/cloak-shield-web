"use client";

import DangerAlert from "@/components/features/profile/DangerAlert";
import ProfileForm, {
  type ProfileFormValues,
} from "@/components/features/profile/ProfileForm";
import { ProfileModalFrame } from "@/components/features/profile/ProfileModalFrame";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button, DangerButton } from "@/components/ui";
import { TrashIcon } from "@/components/ui/icons/Icons";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { deleteAccount } from "@/packages/services/account.services";
import type { FormHelpers } from "@/types/form";
import type { ProfileModalFormProps } from "@/types/modal";

const config = profileFormConfig.DELETE_ACCOUNT;

const OMIT_PASSWORD = ["password"];

const DeleteAccountForm = ({ titleId, onClose }: ProfileModalFormProps) => {
  const { user } = useAuth();
  // Accounts without a password (Google) re-authenticate by a recent sign-in instead.
  const hasPassword = user?.hasPassword !== false;

  const onSubmit = async (
    values: ProfileFormValues<"DELETE_ACCOUNT">,
    helpers: FormHelpers,
  ) => {
    if (hasPassword && !values.password) {
      helpers.setFieldError("password", "Enter your password to confirm");
      return;
    }

    try {
      await deleteAccount(hasPassword ? values.password : undefined);
    } catch (err: unknown) {
      const message = getAuthErrorMessage(
        err,
        "Couldn't delete your account. Please try again.",
      );
      if (hasPassword && /password/i.test(message)) {
        helpers.setFieldError("password", message);
      } else {
        helpers.setFormError(message);
      }
      return;
    }

    // The server already removed the account and cleared the cookies.
    // Full page load: the account is gone, so a client-side route change would race the protected
    // layout, which sends signed-out users to /signin?next=/dashboard.
    window.location.replace("/");
  };

  return (
    <ProfileModalFrame
      titleId={titleId}
      onClose={onClose}
      icon={<TrashIcon className="size-7" />}
      title={config.title}
      description={config.description}
    >
      <div className="mt-6">
        <DangerAlert>
          <p className="font-medium">This cannot be undone.</p>
          <p className="mt-1 text-muted-foreground">
            Your profile, sign-in methods, devices and activity history are
            removed for good, and every session is signed out.
          </p>
        </DangerAlert>
      </div>

      <ProfileForm
        formKey="DELETE_ACCOUNT"
        layout="plain"
        className="mt-6"
        fieldsClassName="flex flex-col gap-5"
        omitFields={hasPassword ? undefined : OMIT_PASSWORD}
        fieldOverrides={{
          [hasPassword ? "password" : "confirmation"]: { autoFocus: true },
        }}
        onSubmit={onSubmit}
        renderActions={({ pending, submitLabel }) => (
          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
            <Button
              type="button"
              onClick={onClose}
              className="btn-outline flex-1"
              disabled={pending}
            >
              Cancel
            </Button>
            <DangerButton
              type="submit"
              className="flex-[1.4]"
              disabled={pending}
            >
              {submitLabel}
            </DangerButton>
          </div>
        )}
      />
    </ProfileModalFrame>
  );
};

export default DeleteAccountForm;
