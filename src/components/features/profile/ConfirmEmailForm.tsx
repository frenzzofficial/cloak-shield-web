"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import ProfileForm, {
  type ProfileFormValues,
} from "@/components/features/profile/ProfileForm";
import {
  modalActions,
  ProfileModalFrame,
} from "@/components/features/profile/ProfileModalFrame";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui";
import { ShieldCheckIcon } from "@/components/ui/icons/Icons";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { useAccountSummary } from "@/packages/hooks/useAccountSummary";
import { resendVerification } from "@/packages/services/auth.services";
import type { FormHelpers } from "@/types/form";
import type { ProfileModalFormProps } from "@/types/modal";

const config = profileFormConfig.CONFIRM_EMAIL;

/**
 * Verifies the account's own address: the backend emails a link, and opening it
 * (/verify-email?token=...) marks the address verified. Once it is verified the dialog says so
 * instead of offering to send another link.
 */
const ConfirmEmailForm = ({ titleId, onClose }: ProfileModalFormProps) => {
  const { refreshUser } = useAuth();
  const { user, emailVerified } = useAccountSummary();

  // The link may have been opened in another tab since this page loaded.
  // biome-ignore lint/correctness/useExhaustiveDependencies: refresh once per opening
  useEffect(() => {
    void refreshUser();
  }, []);

  const onSubmit = async (
    values: ProfileFormValues<"CONFIRM_EMAIL">,
    helpers: FormHelpers,
  ) => {
    try {
      const res = await resendVerification(values.email);
      toast.success(
        res.message || `We sent a verification link to ${values.email}.`,
      );
      onClose();
    } catch (err: unknown) {
      helpers.setFormError(
        getAuthErrorMessage(
          err,
          "Couldn't send the verification link. Please try again.",
        ),
      );
    }
  };

  return (
    <ProfileModalFrame
      titleId={titleId}
      onClose={onClose}
      icon={<ShieldCheckIcon className="size-7" />}
      title={config.title}
      description={
        emailVerified ? "Your email address is verified." : config.description
      }
    >
      {emailVerified ? (
        <div className="mt-6 flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            {user?.email} is confirmed. Nothing more to do here.
          </p>
          <Button type="button" onClick={onClose} className="btn-outline">
            Close
          </Button>
        </div>
      ) : (
        <ProfileForm
          formKey="CONFIRM_EMAIL"
          layout="plain"
          className="mt-6"
          fieldsClassName="flex flex-col gap-5"
          initialValues={{ email: user?.email ?? "" }}
          onSubmit={onSubmit}
          renderActions={modalActions(onClose)}
        >
          <p className="text-xs text-muted-foreground">
            Open the link in that message to finish. It expires after a short
            time; you can request a new one here.
          </p>
        </ProfileForm>
      )}
    </ProfileModalFrame>
  );
};

export default ConfirmEmailForm;
