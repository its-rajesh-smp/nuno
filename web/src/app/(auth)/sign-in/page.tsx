import type { Metadata } from 'next';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { authRoutes } from '@/features/auth/helpers/authRoutes';
import { oauthErrorMessage } from '@/features/auth/helpers/validation';

export const metadata: Metadata = { title: 'Sign in · Zodnote' };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <>
      <AuthForm mode="sign-in" initialError={oauthErrorMessage(error)} />
      <AuthFooter prompt="Don't have an account?" action="Sign up" href={authRoutes.signUp} />
    </>
  );
}
