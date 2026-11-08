import Link from 'next/link';

interface AuthFooterProps {
  prompt: string;
  action: string;
  href: string;
}

// Under the form: the sign-in/sign-up switch and the legal links.
export function AuthFooter({ prompt, action, href }: AuthFooterProps) {
  return (
    <>
      <p className="mt-6 text-center text-[14px] text-muted">
        {prompt}{' '}
        <Link
          href={href}
          className="font-semibold text-ink underline decoration-accent-edge decoration-2 underline-offset-4 outline-none hover:decoration-ink focus-visible:ring-2 focus-visible:ring-accent-edge"
        >
          {action}
        </Link>
      </p>
      <nav className="mt-6 flex justify-center gap-6 text-[14px] text-subtle">
        <a href="/privacy" className="hover:text-muted">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-muted">
          Terms of Service
        </a>
      </nav>
    </>
  );
}
