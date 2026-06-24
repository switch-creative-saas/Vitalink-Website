export {};

declare global {
  interface Window {
    Tawk_API?: {
      visitor?: {
        name?: string;
        email?: string;
      };
      setAttributes?: (
        attributes: Record<string, string | number | boolean>,
        callback?: (error?: unknown) => void
      ) => void;
      logout?: (callback?: (error?: unknown) => void) => void;
      maximize?: () => void;
      minimize?: () => void;
      toggle?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
      onLoad?: () => void;
      customStyle?: Record<string, unknown>;
    };
    Tawk_LoadStart?: Date;
    __vitalinkTawkLoaded?: boolean;
    __vitalinkTawkErrorGuard?: boolean;
  }
}
