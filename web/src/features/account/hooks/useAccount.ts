import { useClerk, useUser } from '@clerk/nextjs';

export interface Account {
  name: string;
  email: string | null;
  imageUrl: string | null;
}

// The signed-in user in the shape the sidebar needs, or null for a guest.
export function useAccount() {
  const { isLoaded, user } = useUser();
  const clerk = useClerk();

  const account: Account | null = user
    ? {
        name: user.fullName || user.primaryEmailAddress?.emailAddress || 'Your account',
        email: user.fullName ? (user.primaryEmailAddress?.emailAddress ?? null) : null,
        imageUrl: user.hasImage ? user.imageUrl : null,
      }
    : null;

  return {
    loaded: isLoaded,
    account,
    manageAccount: () => clerk.openUserProfile(),
    signOut: () => clerk.signOut(),
  };
}
