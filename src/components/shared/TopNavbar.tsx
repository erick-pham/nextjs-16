'use client';

import { MenuIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/providers/SidebarProvider';
import { GlobalSearch } from './GlobalSearch';
import { NotificationsPopover } from './NotificationsPopover';
import UserMenu from './UserMenu';

export const TopNavbar: React.FC = () => {
  const t = useTranslations('AdminPage');
  const inputRef = useRef<HTMLInputElement>(null);

  const { toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1280) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/95 px-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:gap-3 sm:px-4">
      <Button
        variant="ghost"
        size="icon-lg"
        className="lg:hidden"
        aria-label={t('open_navigation')}
        onClick={handleToggle}
      >
        <MenuIcon aria-hidden="true" />
      </Button>

      <div className="min-w-0 flex-1">
        <GlobalSearch
          tenants={[]}
          members={[]}
          onSelectTenant={() => null}
          onSelectMember={() => null}
          onSelectSection={() => null}
        />
      </div>

      <div className="flex items-center gap-1">
        <NotificationsPopover />
        <UserMenu />
      </div>
    </header>
  );
};
