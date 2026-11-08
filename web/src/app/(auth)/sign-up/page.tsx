import type { Metadata } from 'next';
import { AuthFooter } from '@/features/auth/components/AuthFooter';
import { AuthForm } from '@/features/auth/components/AuthForm';
import { authRoutes } from '@/features/auth/helpers/authRoutes';

export const metadata: Metadata = { title: 'Create account · Zodnote' };

export default function SignUpPage() {
  return (
    <>
      <AuthForm mode="sign-up" />
      <AuthFooter prompt="Already have an account?" action="Sign in" href={authRoutes.signIn} />
    </>
  );
}
