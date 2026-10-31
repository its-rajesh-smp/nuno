import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-[13px] text-accent-edge">404</p>
      <h1 className="text-[36px] font-normal tracking-[-0.035em]">This page doesn't exist</h1>
      <Button asChild>
        <a href="/">Back to Nuno</a>
      </Button>
    </main>
  );
}
