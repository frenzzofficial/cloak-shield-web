/** What ProfileModal hands to the form it shows. Every form of a profile dialog takes these. */
export interface ProfileModalFormProps {
  /** id of the element that names the dialog: put it on the form's visible heading. */
  titleId: string;
  /** Closes this dialog. */
  onClose: () => void;
  /** Tell the page something changed, e.g. to reload the list of signed-in devices. */
  onChanged?: (() => void) | undefined;
}
