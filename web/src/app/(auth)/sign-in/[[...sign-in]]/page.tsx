import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { authRoutes } from '@/features/auth/helpers/authRoutes';

export const metadata: Metadata = { title: 'Sign in · Zodnote' };

export default function SignInPage() {
  return (
    <>
      <Suspense>
        <SignIn signUpUrl={authRoutes.signUp} fallbackRedirectUrl={authRoutes.afterAuth} />
      </Suspense>
      <AuthFooter prompt="Don't have an account?" action="Sign up" href={authRoutes.signUp} />
    </>
  );
}
