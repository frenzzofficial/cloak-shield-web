import {
  IdIcon,
  KeyIcon,
  MailIcon,
  UserIcon,
} from "@/components/ui/icons/dashboard-icons";
import type { AccountSummary } from "@/packages/hooks/useAccountSummary";
import InfoRow from "./InfoRow";
import Panel from "./Panel";

const AccountInfoPanel = ({ account }: { account: AccountSummary }) => {
  const { user, fullname, hasPassword } = account;

  return (
    <Panel
      title="Account information"
      subtitle="Your personal details and sign-in method."
      icon={<UserIcon className="size-5" />}
    >
      <InfoRow icon={<UserIcon />} label="Full name">
        {fullname || "—"}
      </InfoRow>
      <InfoRow icon={<MailIcon />} label="Email address">
        <span className="text-[13px] wrap-anywhere">{user?.email ?? "—"}</span>
      </InfoRow>
      <InfoRow icon={<KeyIcon />} label="Password">
        {hasPassword ? (
          "Set"
        ) : (
          <span className="text-muted-foreground">
            Not set (provider sign-in)
          </span>
        )}
      </InfoRow>
      <InfoRow icon={<IdIcon />} label="Account ID">
        <span className="font-mono text-xs text-muted-foreground">
          {user?.id ? `${user.id.slice(0, 8)}…` : "—"}
        </span>
      </InfoRow>
    </Panel>
  );
};

export default AccountInfoPanel;
