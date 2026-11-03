import type { ComponentProps } from 'react';
import type { ClerkProvider } from '@clerk/nextjs';

type Appearance = NonNullable<ComponentProps<typeof ClerkProvider>['appearance']>;

// Colours and radius come from the --clerk-* variables in globals.css, so they follow the theme.
// Clerk's own sizing is kept; only the sign-in/sign-up switch moves out of the card (see AuthFooter).
export const clerkAppearance: Appearance = {
  cssLayerName: 'clerk',
  options: { socialButtonsVariant: 'blockButton' },
  elements: {
    footerAction: 'hidden',
  },
};
