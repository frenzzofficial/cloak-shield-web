"use client";

import type { ReactNode } from "react";
import CenteredModal from "@/components/features/navigation/modals/variants/CenteredModal";
import { useNavigationFeature } from "@/components/features/navigation/NavigationProvider";
import {
  PROFILE_MODAL_IDS,
  PROFILE_MODALS,
  type ProfileModalConfig,
  type ProfileModalId,
} from "../../../packages/configs/profile-modals.config";

interface ProfileModalProps {
  /** Which dialog this is. Opening it from anywhere is `open(modalId)`. */
  modalId: ProfileModalId;
  /** Called after a successful change, e.g. to reload the list of signed-in devices. */
  onChanged?: (() => void) | undefined;
  /**
   * Show this instead of the form registered for `modalId`, inside the same frame. The
   * dialog's name is `${modalId}-title`: put that id on your heading.
   */
  children?: ReactNode;
}

/**
 * The single dialog for account forms. The id picks the form from PROFILE_MODALS; the frame is
 * always the same CenteredModal, so every dialog behaves alike.
 */
const ProfileModal = ({ modalId, onChanged, children }: ProfileModalProps) => {
  const { close } = useNavigationFeature();
  const config: ProfileModalConfig = PROFILE_MODALS[modalId];
  const titleId = `${modalId}-title`;

  return (
    <CenteredModal
      modalId={modalId}
      {...(config.maxWidth ? { maxWidth: config.maxWidth } : {})}
      {...(config.closeOnOverlay !== undefined
        ? { closeOnOverlay: config.closeOnOverlay }
        : {})}
      bare
      labelledBy={titleId}
    >
      {children ?? (
        <config.Form
          titleId={titleId}
          onClose={() => close(modalId)}
          onChanged={onChanged}
        />
      )}
    </CenteredModal>
  );
};

/** Mounts every registered dialog once; place it next to the buttons that open them. */
export const ProfileModals = ({
  onChanged,
}: Pick<ProfileModalProps, "onChanged">) => (
  <>
    {PROFILE_MODAL_IDS.map((id) => (
      <ProfileModal key={id} modalId={id} onChanged={onChanged} />
    ))}
  </>
);

export default ProfileModal;
