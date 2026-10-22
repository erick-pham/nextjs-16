'use client';

import { useQuery } from '@tanstack/react-query';
import { authClient } from '@/libs/auth-client';
import { userKeys } from './keys';

async function getSession() {
  const { data, error } = await authClient.getSession();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export type SessionData = Awaited<ReturnType<typeof getSession>>;

export const useSessionQuery = (initialData?: SessionData) =>
  useQuery<SessionData>({
    queryFn: async () => await getSession(),
    queryKey: userKeys.session(),
    initialData,
    retry: 1,
  });
