'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/Spinner';
import { authRoutes } from '../helpers/authRoutes';
import { googleSignInUrl } from '../services/authApi';
import { GoogleIcon } from './ui/GoogleIcon';

export function GoogleButton({ disabled }: { disabled?: boolean }) {
  const [redirecting, setRedirecting] = useState(false);

  const start = () => {
    setRedirecting(true);
    window.location.assign(googleSignInUrl(authRoutes.afterAuth));
  };

  return (
    <Button type="button" variant="secondary" className="w-full" onClick={start} disabled={disabled || redirecting}>
      {redirecting ? <Spinner className="size-4" /> : <GoogleIcon className="size-4" />}
      Continue with Google
    </Button>
  );
}
