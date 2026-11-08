'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/Spinner';
import { authRoutes } from '../helpers/authRoutes';
import { type FieldErrors, MIN_PASSWORD_LENGTH, validateAuthForm } from '../helpers/validation';
import { AuthApiError, signIn, signUp } from '../services/authApi';
import { useAuthStore } from '../stores/useAuthStore';
import { GoogleButton } from './GoogleButton';
import { AuthDivider } from './ui/AuthDivider';
import { FormError } from './ui/FormError';
import { PasswordField } from './ui/PasswordField';
import { TextField } from './ui/TextField';

type Mode = 'sign-in' | 'sign-up';

const copy: Record<Mode, { title: string; subtitle: string; submit: string }> = {
  'sign-in': { title: 'Welcome back', subtitle: 'Sign in to keep your notes in sync.', submit: 'Sign in' },
  'sign-up': { title: 'Create your account', subtitle: 'Sync your notes across every device.', submit: 'Create account' },
};

interface AuthFormProps {
  mode: Mode;
  /** E.g. a failed Google sign-in, passed back in the URL. */
  initialError?: string | null;
}

export function AuthForm({ mode, initialError = null }: AuthFormProps) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(initialError);
  const [submitting, setSubmitting] = useState(false);
  const text = copy[mode];

  const update = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (fieldErrors[field]) setFieldErrors((errs) => ({ ...errs, [field]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    const errors = validateAuthForm(values, mode);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    try {
      const email = values.email.trim();
      const user =
        mode === 'sign-in'
          ? await signIn({ email, password: values.password })
          : await signUp({ name: values.name.trim(), email, password: values.password });
      setUser(user);
      router.replace(authRoutes.afterAuth);
    } catch (err) {
      if (err instanceof AuthApiError && err.field) setFieldErrors({ [err.field]: err.message });
      else setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-7 text-center">
        <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-ink">{text.title}</h1>
        <p className="mt-1.5 text-[15px] text-muted">{text.subtitle}</p>
      </div>

      <div className="space-y-5">
        {formError && <FormError message={formError} />}
        <GoogleButton disabled={submitting} />
        <AuthDivider />

        <form onSubmit={submit} noValidate className="space-y-4">
          {mode === 'sign-up' && (
            <TextField
              label="Name"
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={update('name')}
              error={fieldErrors.name}
            />
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={update('email')}
            error={fieldErrors.email}
          />
          <PasswordField
            label="Password"
            name="password"
            autoComplete={mode === 'sign-in' ? 'current-password' : 'new-password'}
            placeholder={mode === 'sign-up' ? `At least ${MIN_PASSWORD_LENGTH} characters` : undefined}
            value={values.password}
            onChange={update('password')}
            error={fieldErrors.password}
          />
          <Button type="submit" className="mt-2 w-full" disabled={submitting}>
            {submitting && <Spinner className="size-4 border-canvas/30 border-t-canvas" />}
            {text.submit}
          </Button>
        </form>
      </div>
    </div>
  );
}
