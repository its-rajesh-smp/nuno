import type { Account } from '../../hooks/useAccount';
import { AccountAvatar } from './AccountAvatar';

// Avatar, name and one line underneath. Shared by the account menu and settings.
export function AccountSummary({ account }: { account: Account | null }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <AccountAvatar imageUrl={account?.imageUrl} className="size-9" />
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-ink">{account?.name ?? 'Guest'}</div>
        <div className="truncate text-[13px] text-muted">{account ? (account.email ?? 'Signed in') : 'Notes stay in this browser'}</div>
      </div>
    </div>
  );
}
