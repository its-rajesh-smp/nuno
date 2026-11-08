import type { AuthField, SignInInput, SignUpInput, User } from '../types/user';

// Same origin by default (Next route handlers under /api). Set NEXT_PUBLIC_API_URL to point at a separate server.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

/** An error the API sent back. `field` lets the form put the message under the right input. */
export class AuthApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly field?: AuthField,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      // The session lives in an httpOnly cookie the API sets.
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...init?.headers },
    });
  } catch {
    throw new AuthApiError("Couldn't reach the server. Check your connection and try again.", 0);
  }

  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new AuthApiError(body?.error || 'Something went wrong. Please try again.', res.status, body?.field);
  }
  return body as T;
}

export async function signIn(input: SignInInput): Promise<User> {
  const { user } = await request<{ user: User }>('/api/auth/sign-in', { method: 'POST', body: JSON.stringify(input) });
  return user;
}

export async function signUp(input: SignUpInput): Promise<User> {
  const { user } = await request<{ user: User }>('/api/auth/sign-up', { method: 'POST', body: JSON.stringify(input) });
  return user;
}

export async function signOut(): Promise<void> {
  await request('/api/auth/sign-out', { method: 'POST' });
}

/** The signed-in user, or null for a guest. */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { user } = await request<{ user: User }>('/api/auth/me');
    return user;
  } catch (err) {
    if (err instanceof AuthApiError && err.status === 401) return null;
    throw err;
  }
}

/** Full-page redirect: the API runs the Google OAuth dance and sends the browser back to `redirectTo`. */
export function googleSignInUrl(redirectTo: string): string {
  const url = new URL(`${API_URL}/api/auth/google`, window.location.origin);
  url.searchParams.set('redirect', new URL(redirectTo, window.location.origin).toString());
  return url.toString();
}
