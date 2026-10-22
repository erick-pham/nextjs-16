'use client';

import { ChevronDownIcon, LogOutIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { useSessionQuery } from '@/data/user/session-query';
import { useSignOutMutation } from '@/data/user/sign-out-mutation';
import { useRouter } from '@/libs/I18nNavigation';
import { UserAvatar } from './Avatars';

export default function UserDropdown() {
  const t = useTranslations('AdminPage');
  const { theme, setTheme } = useTheme();
  const session = useSessionQuery();
  const signOut = useSignOutMutation();
  const name = session.data?.user.name ?? t('profile_fallback_name');

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={t('profile_menu_label')}
        className="group flex cursor-pointer items-center gap-2 rounded-lg p-1 transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:bg-muted md:pr-2"
      >
        <UserAvatar name={name} />
        <span className="flex flex-col text-left leading-tight">
          <span className="max-w-32 truncate text-sm font-medium">{name}</span>
          <span className="text-xs text-muted-foreground">{t('profile_role')}</span>
        </span>
        <ChevronDownIcon className="size-5 text-gray-500 transition-transform duration-200 group-aria-expanded:rotate-180 dark:text-gray-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 p-5" sideOffset={14}>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex flex-col gap-0.5 py-1.5">
            <span className="truncate text-sm font-medium text-foreground">{name}</span>
            <span className="truncate font-normal">{session.data?.user.email}</span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t('theme_label')}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={theme ?? 'system'} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="light">
              <SunIcon aria-hidden="true" />
              {t('theme_light')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark">
              <MoonIcon aria-hidden="true" />
              {t('theme_dark')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="system">
              <MonitorIcon aria-hidden="true" />
              {t('theme_system')}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            disabled={signOut.isPending}
            onClick={() => {
              signOut.mutate(undefined, {
                onSuccess: () => {
                  router.push('/sign-in');
                },
              });
            }}
          >
            <LogOutIcon aria-hidden="true" />
            {t('sign_out')}
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
