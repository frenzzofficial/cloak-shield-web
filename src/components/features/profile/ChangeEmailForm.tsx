"use client";

import { toast } from "sonner";
import ProfileForm, {
  type ProfileFormValues,
} from "@/components/features/profile/ProfileForm";
import {
  modalActions,
  ProfileModalFrame,
} from "@/components/features/profile/ProfileModalFrame";
import { useAuth } from "@/components/providers/AuthProvider";
import { AtIcon } from "@/components/ui/icons/Icons";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { changeEmail } from "@/packages/services/account.services";
import type { FormHelpers } from "@/types/form";
import type { ProfileModalFormProps } from "@/types/modal";

const config = profileFormConfig.CHANGE_EMAIL;

const OMIT_PASSWORD = ["password"];

const ChangeEmailForm = ({ titleId, onClose }: ProfileModalFormProps) => {
  const { user } = useAuth();
  // Accounts without a password (Google) re-authenticate by a recent sign-in instead.
  const hasPassword = user?.hasPassword !== false;

  const onSubmit = async (
    values: ProfileFormValues<"CHANGE_EMAIL">,
    helpers: FormHelpers,
  ) => {
    if (hasPassword && !values.password) {
      helpers.setFieldError("password", "Enter your password to confirm");
      return;
    }

    try {
      const res = await changeEmail({
        newEmail: values.newEmail,
        ...(hasPassword && values.password
          ? { password: values.password }
          : {}),
      });
      toast.success(
        res.message ||
          `We sent a confirmation link to ${values.newEmail}. Open it to finish.`,
      );
      onClose(); // the address only changes once the emailed link is opened
    } catch (err: unknown) {
      const message = getAuthErrorMessage(
        err,
        "Couldn't start the email change. Please try again.",
      );
      if (hasPassword && /password/i.test(message)) {
        helpers.setFieldError("password", message);
      } else {
        helpers.setFormError(message);
      }
    }
  };

  return (
    <ProfileModalFrame
      titleId={titleId}
      onClose={onClose}
      icon={<AtIcon className="size-7" />}
      title={config.title}
      description={config.description}
    >
      <ProfileForm
        formKey="CHANGE_EMAIL"
        layout="plain"
        className="mt-6"
        fieldsClassName="flex flex-col gap-5"
        omitFields={hasPassword ? undefined : OMIT_PASSWORD}
        fieldOverrides={{
          newEmail: { autoFocus: true },
          password: { required: true },
        }}
        onSubmit={onSubmit}
        renderActions={modalActions(onClose)}
      >
        <p className="text-xs text-muted-foreground">
          Your current address is {user?.email}. It stays in use until you open
          the link we send to the new one.
        </p>
      </ProfileForm>
    </ProfileModalFrame>
  );
};

export default ChangeEmailForm;
