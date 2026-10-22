import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authClient } from '@/libs/auth-client';
import { getQueryClient } from '../query-client';

async function signOut() {
  const { data, error } = await authClient.signOut();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export const useSignOutMutation = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: signOut,
    onSettled: () => {
      queryClient.clear();
    },
    onSuccess: () => {
      toast.success('Successfully signed out!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to sign out');
    },
  });
};
