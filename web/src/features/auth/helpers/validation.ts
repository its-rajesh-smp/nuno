import type { AuthField } from '../types/user';

export const MIN_PASSWORD_LENGTH = 8;

export type FieldErrors = Partial<Record<AuthField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Quick checks before hitting the API. The server must validate again.
export function validateAuthForm(values: { name?: string; email: string; password: string }, mode: 'sign-in' | 'sign-up') {
  const errors: FieldErrors = {};
  if (mode === 'sign-up' && !values.name?.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) errors.email = 'Enter your email.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!values.password) errors.password = 'Enter your password.';
  else if (mode === 'sign-up' && values.password.length < MIN_PASSWORD_LENGTH)
    errors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  return errors;
}

// Codes the Google callback can send back as ?error=… on the sign-in page.
const OAUTH_ERRORS: Record<string, string> = {
  access_denied: 'Google sign-in was cancelled.',
  oauth_failed: "Couldn't sign in with Google. Please try again.",
};

export function oauthErrorMessage(code: string | undefined): string | null {
  if (!code) return null;
  return OAUTH_ERRORS[code] ?? OAUTH_ERRORS.oauth_failed;
}
