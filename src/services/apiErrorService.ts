let showApiError: (() => void) | null = null;

export const registerApiErrorHandler = (
  handler: () => void
) => {
  showApiError = handler;
};

export const triggerApiError = () => {
  showApiError?.();
};