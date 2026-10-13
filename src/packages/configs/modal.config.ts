/**
 * Every dialog opened through `useNavigationFeature().open(id)` has its id here, so a trigger
 * (a button in one place) and its modal (mounted in another) can never drift apart on a typo.
 * The `modal:` prefix keeps them out of localStorage, see NavigationProvider.
 */

export const TRANSIENT_PREFIX = "modal:";
export const MODAL_IDS = {
  changePassword: `${TRANSIENT_PREFIX}change-password`,
  updateProfile: `${TRANSIENT_PREFIX}update-profile`,
  preferences: `${TRANSIENT_PREFIX}preferences`,
  confirmEmail: `${TRANSIENT_PREFIX}confirm-email`,
  changeEmail: `${TRANSIENT_PREFIX}change-email`,
} as const;

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];
