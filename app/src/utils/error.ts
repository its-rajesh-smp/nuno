export const getErrorMessage = (err: unknown, defaultMessage: string): string =>
  err instanceof Error && err.message ? err.message : defaultMessage;
