import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';

export interface Account {
  name: string;
  email: string | null;
  imageUrl: string | null;
}

// The signed-in user in the shape the sidebar needs, or null for a guest.
export function useAccount() {
  const user = useAuthStore((s) => s.user);
  const loaded = useAuthStore((s) => s.loaded);
  const load = useAuthStore((s) => s.load);
  const signOut = useAuthStore((s) => s.signOut);

  useEffect(() => {
    if (!loaded) load();
  }, [loaded, load]);

  const account: Account | null = user
    ? {
        name: user.name || user.email,
        email: user.name ? user.email : null,
        imageUrl: user.imageUrl,
      }
    : null;

  return {
    loaded,
    account,
    // Keep the local session cleared even if the request fails.
    signOut: () => signOut().catch(() => useAuthStore.getState().setUser(null)),
  };
}
