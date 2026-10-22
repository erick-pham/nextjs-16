import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/libs/utils';

const AVATAR_TONES = [
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200',
  'bg-sky-100 text-sky-800 dark:bg-sky-500/20 dark:text-sky-200',
  'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-200',
  'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-200',
  'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-200',
  'bg-violet-100 text-violet-800 dark:bg-violet-500/20 dark:text-violet-200',
];

const getInitials = (name: string) =>
  name
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

const getTone = (seed: string) => {
  const hash = Array.from(seed, (char) => char.codePointAt(0) ?? 0).reduce(
    (total, code) => total + code,
    0,
  );
  return AVATAR_TONES[hash % AVATAR_TONES.length];
};

// Square corners set organizations apart from people
export const TenantAvatar = (props: { name: string; size?: 'sm' | 'default' | 'lg' }) => (
  <Avatar size={props.size} className="rounded-md after:rounded-md">
    <AvatarFallback className={cn('rounded-md text-xs font-semibold', getTone(props.name))}>
      {getInitials(props.name)}
    </AvatarFallback>
  </Avatar>
);

export const UserAvatar = (props: { name: string; size?: 'sm' | 'default' | 'lg' }) => (
  <Avatar size={props.size}>
    <AvatarFallback className={cn('text-xs font-semibold', getTone(props.name))}>
      {getInitials(props.name)}
    </AvatarFallback>
  </Avatar>
);
