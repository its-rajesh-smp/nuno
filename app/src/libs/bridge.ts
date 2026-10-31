import type { NunoBridge } from '@shared/bridge';

declare global {
  interface Window {
    nuno: NunoBridge;
  }
}

// The only way the renderer talks to the main process (our "API client").
export const bridge: NunoBridge = window.nuno;
