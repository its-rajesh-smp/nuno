import { create } from 'zustand';
import { getCurrentUser, signOut } from '../services/authApi';
import type { User } from '../types/user';

interface AuthStore {
  user: User | null;
  /** False until the first session check finishes. */
  loaded: boolean;
  setUser: (user: User | null) => void;
  load: () => Promise<void>;
  signOut: () => Promise<void>;
}

let loading: Promise<void> | null = null;

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loaded: false,
  setUser: (user) => set({ user, loaded: true }),
  // Shared so several components mounting at once only ask the API once.
  load: () =>
    (loading ??= getCurrentUser()
      .then((user) => set({ user, loaded: true }))
      // Server down: treat as a guest so notes still work.
      .catch(() => set({ user: null, loaded: true }))
      .finally(() => {
        loading = null;
      })),
  signOut: async () => {
    await signOut();
    set({ user: null });
  },
}));
