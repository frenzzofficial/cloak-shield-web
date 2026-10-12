import type { ComponentType, CSSProperties } from "react";
import { MODAL_IDS } from "@/packages/configs/modal.config";
import type { ProfileModalFormProps } from "@/types/modal";
import ChangePasswordForm from "../../components/features/profile/ChangePasswordForm";

/**
 * One entry per dialog that ProfileModal can show. To add a dialog:
 *   1. add its id to MODAL_IDS (packages/configs/modal.config.ts),
 *   2. write its form as a component that takes ProfileModalFormProps,
 *   3. add one line here.
 * A button anywhere then opens it with `open(MODAL_IDS.yourId)`; the frame, focus handling,
 * Escape / backdrop closing and the accessible name come from ProfileModal.
 */
export interface ProfileModalConfig {
  Form: ComponentType<ProfileModalFormProps>;
  maxWidth?: CSSProperties["maxWidth"];
  closeOnOverlay?: boolean;
}

export const PROFILE_MODALS = {
  [MODAL_IDS.changePassword]: { Form: ChangePasswordForm, maxWidth: "34rem" },
} as const satisfies Record<string, ProfileModalConfig>;

export type ProfileModalId = keyof typeof PROFILE_MODALS;

export const PROFILE_MODAL_IDS = Object.keys(
  PROFILE_MODALS,
) as ProfileModalId[];
