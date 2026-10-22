import type { ReadonlyURLSearchParams } from 'next/navigation';

const allowedCallbackSet = new Set<string>([
  '/dashboard',
  '/dashboard/profile',
  '/dashboard/settings',
]);

export const getCallbackURL = (queryParams: ReadonlyURLSearchParams): string => {
  const callbackUrl = queryParams.get('callbackUrl');
  if (callbackUrl) {
    if (allowedCallbackSet.has(callbackUrl)) {
      return callbackUrl;
    }
    return '/dashboard';
  }
  return '/dashboard';
};
