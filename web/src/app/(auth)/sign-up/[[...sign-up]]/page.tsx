import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { authRoutes } from '@/features/auth/helpers/authRoutes';

export const metadata: Metadata = { title: 'Create account · Zodnote' };

export default function SignUpPage() {
  return (
    <>
      <Suspense>
        <SignUp signInUrl={authRoutes.signIn} fallbackRedirectUrl={authRoutes.afterAuth} />
      </Suspense>
      <AuthFooter prompt="Already have an account?" action="Sign in" href={authRoutes.signIn} />
    </>
  );
}
