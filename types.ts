export type CallStatus = 'idle' | 'connecting' | 'active' | 'ending';

export interface VapiInstance {
  start: (id: string) => void;
  stop: () => void;
  on: (event: string, callback: () => void) => void;
}

declare global {
  interface Window {
    vapi: any; // Using any to avoid complex SDK typing in this demo environment
  }
}