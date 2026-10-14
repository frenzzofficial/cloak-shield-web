"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import ProfileForm, {
  type ProfileFormValues,
} from "@/components/features/profile/ProfileForm";
import {
  ModalStatus,
  modalActions,
  ProfileModalFrame,
} from "@/components/features/profile/ProfileModalFrame";
import { MailIcon } from "@/components/ui/icons/Icons";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { useAccount } from "@/packages/hooks/useAccount";
import { updatePreferences } from "@/packages/services/account.services";
import { changedFields } from "@/packages/utils/form-diff";
import type { UpdatePreferencesBody } from "@/types/account";
import type { FormHelpers } from "@/types/form";
import type { ProfileModalFormProps } from "@/types/modal";

const config = profileFormConfig.UPDATE_PREFERENCES;

const PreferencesForm = ({
  titleId,
  onClose,
  onChanged,
}: ProfileModalFormProps) => {
  const { state, reload } = useAccount();

  const initial = useMemo((): Record<string, string | boolean> => {
    if (state.status !== "ready") return {};
    const { preferences } = state.account;
    return {
      theme: preferences.theme,
      emailNotifications: preferences.emailNotifications,
      pushNotifications: preferences.pushNotifications,
      marketingEmails: preferences.marketingEmails,
      reducedMotion: preferences.reducedMotion,
      highContrast: preferences.highContrast,
    };
  }, [state]);

  const onSubmit = async (
    values: ProfileFormValues<"UPDATE_PREFERENCES">,
    helpers: FormHelpers,
  ) => {
    const body = changedFields(initial, values) as UpdatePreferencesBody;
    if (Object.keys(body).length === 0) {
      onClose();
      return;
    }

    try {
      await updatePreferences(body);
      toast.success("Preferences saved.");
      onChanged?.();
      onClose();
    } catch (err: unknown) {
      helpers.setFormError(
        getAuthErrorMessage(err, "Couldn't save your preferences."),
      );
    }
  };

  return (
    <ProfileModalFrame
      titleId={titleId}
      onClose={onClose}
      icon={<MailIcon className="size-7" />}
      title={config.title}
      description={config.description}
      ready={state.status === "ready"}
    >
      {state.status === "ready" ? (
        <ProfileForm
          formKey="UPDATE_PREFERENCES"
          layout="plain"
          className="mt-6"
          fieldsClassName="flex flex-col gap-4"
          initialValues={initial}
          onSubmit={onSubmit}
          renderActions={modalActions(onClose)}
        />
      ) : (
        <ModalStatus
          {...(state.status === "error"
            ? { message: state.message, onRetry: reload }
            : {})}
        />
      )}
    </ProfileModalFrame>
  );
};

export default PreferencesForm;
