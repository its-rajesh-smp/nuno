import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono, Inter } from 'next/font/google';
import { authRoutes } from '@/features/auth/helpers/authRoutes';
import { clerkAppearance } from '@/features/auth/helpers/clerkAppearance';
import { themeScript } from '@/features/theme/helpers/theme';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-plex-mono' });

export const metadata: Metadata = {
  title: 'Zodnote',
  description: 'A notepad that just lets you write. No login, no clutter.',
};

export const viewport: Viewport = {
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf9' },
    { media: '(prefers-color-scheme: dark)', color: '#151312' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The theme script sets the `dark` class before hydration.
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      {/* Extensions add attributes to <body> (e.g. style="cursor: auto") before hydration. */}
      <body suppressHydrationWarning>
        <ClerkProvider appearance={clerkAppearance} signInUrl={authRoutes.signIn} signUpUrl={authRoutes.signUp}>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
