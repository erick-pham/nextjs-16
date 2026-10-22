import { BoxesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const AppSidebar = () => {
  const t = useTranslations('AdminPage');

  return (
    <div className="flex h-full flex-col gap-4 bg-sidebar p-3 text-sidebar-foreground">
      <div className="flex items-center gap-2 px-1 pt-1">
        <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <BoxesIcon className="size-4" aria-hidden="true" />
        </span>
        <span className="text-sm font-bold tracking-tight">{t('app_name')}</span>
      </div>
      <span className="text-sm font-bold tracking-tight">{t('app_name')}</span>
    </div>
  );
};
