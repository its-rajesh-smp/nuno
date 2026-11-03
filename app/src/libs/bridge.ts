import type { ZodnoteBridge } from '@shared/bridge';

declare global {
  interface Window {
    zodnote: ZodnoteBridge;
  }
}

// The only way the renderer talks to the main process (our "API client").
export const bridge: ZodnoteBridge = window.zodnote;
