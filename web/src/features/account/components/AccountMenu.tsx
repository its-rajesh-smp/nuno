import { ChevronsUpDown, LogIn, LogOut, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { authRoutes } from '@/features/auth/helpers/authRoutes';
import { useAccount } from '../hooks/useAccount';
import { AccountAvatar } from './ui/AccountAvatar';
import { AccountSummary } from './ui/AccountSummary';
import { MenuItem } from './ui/MenuItem';

export function AccountMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { loaded, account, signOut } = useAccount();

  const choose = (action: () => void) => () => {
    setOpen(false);
    action();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={!loaded}
        className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pr-3 pl-1 outline-none hover:bg-sunken focus-visible:ring-2 focus-visible:ring-accent-edge disabled:opacity-60 data-[state=open]:bg-sunken"
      >
        <AccountAvatar imageUrl={account?.imageUrl} />
        <span className="truncate text-sm font-semibold text-muted">{account?.name ?? 'Guest'}</span>
        <ChevronsUpDown className="size-3.5 shrink-0 text-subtle" />
      </PopoverTrigger>
      <PopoverContent side="top" className="w-64">
        <div className="px-2.5 py-2">
          <AccountSummary account={account} />
        </div>
        <div className="my-1.5 h-px bg-line" />
        {account ? (
          <MenuItem onClick={choose(signOut)}>
            <LogOut />
            Sign out
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={choose(() => router.push(authRoutes.signIn))}>
              <LogIn />
              Sign in
            </MenuItem>
            <MenuItem onClick={choose(() => router.push(authRoutes.signUp))}>
              <UserPlus />
              Create account
            </MenuItem>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
