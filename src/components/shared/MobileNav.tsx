'use client';

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/providers/SidebarProvider';

// Off-canvas drawer that hosts the sidebar below the `lg` breakpoint
export const MobileNav = (props: { children: React.ReactNode }) => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const t = useTranslations('AdminPage');

  return (
    <DialogPrimitive.Root open={isExpanded} onOpenChange={toggleSidebar}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/40 duration-200 motion-reduce:animate-none lg:hidden data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r shadow-xl duration-200 outline-none motion-reduce:animate-none lg:hidden data-open:animate-in data-open:slide-in-from-left data-closed:animate-out data-closed:slide-out-to-left">
          <DialogPrimitive.Title className="sr-only">{t('nav_label')}</DialogPrimitive.Title>
          <DialogPrimitive.Close
            render={
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 z-10"
                aria-label={t('close_navigation')}
              />
            }
          >
            <XIcon aria-hidden="true" />
          </DialogPrimitive.Close>
          {props.children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
