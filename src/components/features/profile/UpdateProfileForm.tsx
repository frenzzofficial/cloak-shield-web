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
import { useAuth } from "@/components/providers/AuthProvider";
import { UserIcon } from "@/components/ui/icon/Icons";
import { getAuthErrorMessage } from "@/packages/errors/auth-error";
import { profileFormConfig } from "@/packages/forms/profile.form";
import { useAccount } from "@/packages/hooks/useAccount";
import { updateProfile } from "@/packages/services/account.services";
import { changedFields } from "@/packages/utils/form-diff";
import type { UpdateProfileBody } from "@/types/account";
import type { FormHelpers } from "@/types/form";
import type { ProfileModalFormProps } from "@/types/modal";

/** Fields the user may empty to clear them; everything except the name. */
const CLEARABLE = [
  "username",
  "phone",
  "birthDate",
  "gender",
  "bio",
  "website",
  "twitterUrl",
  "githubUrl",
  "linkedinUrl",
] as const;

const config = profileFormConfig.UPDATE_PROFILE;

const UpdateProfileForm = ({
  titleId,
  onClose,
  onChanged,
}: ProfileModalFormProps) => {
  const { refreshUser } = useAuth();
  const { state, reload } = useAccount();

  const initial = useMemo((): Record<string, string> => {
    if (state.status !== "ready") return {};
    const { user, profile } = state.account;
    return {
      fullname: user.fullname,
      username: profile.username ?? "",
      phone: profile.phone ?? "",
      birthDate: profile.birthDate ?? "",
      gender: profile.gender ?? "",
      bio: profile.bio ?? "",
      website: profile.website ?? "",
      twitterUrl: profile.twitterUrl ?? "",
      githubUrl: profile.githubUrl ?? "",
      linkedinUrl: profile.linkedinUrl ?? "",
    };
  }, [state]);

  const onSubmit = async (
    values: ProfileFormValues<"UPDATE_PROFILE">,
    helpers: FormHelpers,
  ) => {
    // Only what changed goes out: re-sending an unchanged username could trip "already taken".
    const body = changedFields(initial, values, CLEARABLE) as UpdateProfileBody;
    if (Object.keys(body).length === 0) {
      onClose();
      return;
    }

    try {
      await updateProfile(body);
      toast.success("Profile updated.");
      await refreshUser(); // the name shows in the header and dashboard
      onChanged?.();
      onClose();
    } catch (err: unknown) {
      const message = getAuthErrorMessage(
        err,
        "Couldn't save your profile. Please try again.",
      );
      if (/username/i.test(message)) helpers.setFieldError("username", message);
      else helpers.setFormError(message);
    }
  };

  return (
    <ProfileModalFrame
      titleId={titleId}
      onClose={onClose}
      icon={<UserIcon className="size-7" />}
      title={config.title}
      description={config.description}
      ready={state.status === "ready"}
    >
      {state.status === "ready" ? (
        <ProfileForm
          formKey="UPDATE_PROFILE"
          layout="plain"
          className="mt-6"
          fieldsClassName="grid gap-x-4 gap-y-4 sm:grid-cols-2"
          initialValues={initial}
          fieldOverrides={{ fullname: { autoFocus: true } }}
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

export default UpdateProfileForm;
