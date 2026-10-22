'use client';

import { BellIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';

export const NotificationsPopover = () => {
  const t = useTranslations('AdminPage');
  const unreadCount = 1000;
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="relative"
            aria-label={t('notifications_label', { count: unreadCount })}
          />
        }
      >
        <BellIcon aria-hidden="true" />
        {unreadCount > 0 && (
          <span
            className="absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[0.625rem] leading-4 font-semibold text-white tabular-nums ring-2 ring-background"
            aria-hidden="true"
          >
            {unreadCount}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[min(24rem,calc(100vw-2rem))] gap-0 p-0"
        sideOffset={22}
      >
        <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
          <PopoverTitle>{t('notifications_title')}</PopoverTitle>
          <Button variant="ghost" size="sm">
            {t('notifications_mark_all')}
          </Button>
        </div>
        <ul className="max-h-96 divide-y overflow-y-auto" />
      </PopoverContent>
    </Popover>
  );
};
