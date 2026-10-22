'use client';

import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useSyncExternalStore } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { Organization, OrganizationMember } from '@/libs/auth';
import { TenantAvatar, UserAvatar } from './Avatars';

// Users only appear once the query is specific enough to keep the list short
const MIN_USER_QUERY_LENGTH = 2;

// The platform never changes, so there is nothing to subscribe to
const subscribeToNothing = () => () => null;

const useIsMac = () =>
  useSyncExternalStore(
    subscribeToNothing,
    () => /Mac|iPhone|iPad/u.test(navigator.userAgent),
    () => false,
  );

export const GlobalSearch = (props: {
  tenants: Organization[] | undefined;
  members: OrganizationMember[] | undefined;
  onSelectTenant: (tenantId: string) => void;
  onSelectMember: (member: OrganizationMember) => void;
  onSelectSection: (section: string) => void;
}) => {
  const t = useTranslations('AdminPage');
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Global hotkey has to listen on the document, outside React's tree
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((isOpen) => !isOpen);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const run = (action: () => void) => {
    action();
    setOpen(false);
    setSearch('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
        className="flex h-9 w-full max-w-md cursor-pointer items-center gap-2 rounded-lg border bg-background px-3 text-sm text-muted-foreground shadow-xs transition-colors outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <SearchIcon className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1 truncate text-left">{t('global_search_placeholder')}</span>
        <kbd className="hidden rounded border bg-muted px-1.5 font-sans text-xs font-medium sm:inline-block">
          {isMac ? '⌘K' : 'Ctrl K'}
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title={t('global_search_title')}
        description={t('global_search_description')}
        className="sm:max-w-xl"
      >
        <Command>
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={t('global_search_input_placeholder')}
          />
          <CommandList className="max-h-96">
            <CommandEmpty>
              {props.tenants ? t('global_search_empty') : t('global_search_loading')}
            </CommandEmpty>
            {props.tenants && (
              <CommandGroup heading={t('tenants_heading')}>
                {props.tenants.map((tenant) => (
                  <CommandItem
                    key={tenant.id}
                    value={`tenant ${tenant.name} ${tenant.domain} ${tenant.id}`}
                    onSelect={() => {
                      run(() => {
                        props.onSelectTenant(tenant.id);
                      });
                    }}
                  >
                    <TenantAvatar name={tenant.name} size="sm" />
                    <span className="flex-1 truncate">{tenant.name}</span>
                    <span className="truncate text-xs text-muted-foreground">{tenant.domain}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {props.members && search.trim().length >= MIN_USER_QUERY_LENGTH && (
              <CommandGroup heading={t('users_heading')}>
                {props.members.map((member) => (
                  <CommandItem
                    key={member.id}
                    value={`user ${member.user.name} ${member.user.email} ${member.id}`}
                    onSelect={() => {
                      run(() => {
                        props.onSelectMember(member);
                      });
                    }}
                  >
                    <UserAvatar name={member.user.name} size="sm" />
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate">{member.user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {member.user.email}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
