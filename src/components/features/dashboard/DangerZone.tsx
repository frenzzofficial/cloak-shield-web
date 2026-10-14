"use client";

import { useNavigationFeature } from "@/components/features/navigation/NavigationProvider";
import DangerAlert from "@/components/features/profile/DangerAlert";
import { DangerButton } from "@/components/ui";
import { TrashIcon } from "@/components/ui/icon/Icons";
import { MODAL_IDS } from "@/packages/configs/modal.config";
import Panel from "./Panel";

/** Its own block, apart from Quick Actions, because deleting the account cannot be undone. */
const DangerZone = () => {
  const { open } = useNavigationFeature();

  return (
    <Panel
      title="Danger Zone"
      className="border-destructive/25"
      icon={<TrashIcon className="size-5 text-destructive" />}
    >
      <DangerAlert>
        <p className="font-medium">Deleting your account is permanent.</p>
        <p className="mt-1 text-muted-foreground">
          Your profile, devices and activity history are removed and cannot be
          recovered.
        </p>
      </DangerAlert>

      <DangerButton
        type="button"
        onClick={() => open(MODAL_IDS.deleteAccount)}
        className="mt-4 w-full"
      >
        Delete Account
      </DangerButton>
    </Panel>
  );
};

export default DangerZone;
