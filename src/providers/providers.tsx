'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/data/query-client';
import { SidebarProvider } from './SidebarProvider';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        client={queryClient}
        initialIsOpen={false}
        buttonPosition="bottom-right"
        position="bottom"
      />
      <SidebarProvider>{children}</SidebarProvider>
    </QueryClientProvider>
  );
};

export default Providers;
