'use client';

import { useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/libs/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Semantic color palette matching Badge. */
export type AvatarColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

/** Active status indicator types: presence states + semantic color palette (following Badge). */
export type AvatarStatus =
  | 'online'
  | 'offline'
  | 'away'
  | 'busy'
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

const sizeMap: Record<AvatarSize, { container: string; text: string; badge: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-[10px]', badge: 'h-1.5 w-1.5' },
  sm: { container: 'h-8 w-8', text: 'text-xs', badge: 'h-2 w-2' },
  md: { container: 'h-10 w-10', text: 'text-sm', badge: 'h-2.5 w-2.5' },
  lg: { container: 'h-12 w-12', text: 'text-base', badge: 'h-3 w-3' },
  xl: { container: 'h-16 w-16', text: 'text-lg', badge: 'h-3.5 w-3.5' },
};

/** Active status badge colors following Badge semantic color system. */
const statusMap: Record<AvatarStatus, string> = {
  // Presence aliases
  online: 'bg-emerald-500',
  offline: 'bg-muted-foreground/70 dark:bg-muted-foreground',
  away: 'bg-amber-500',
  busy: 'bg-rose-500',

  // Semantic palette matching Badge
  neutral: 'bg-muted-foreground/70 dark:bg-muted-foreground',
  primary: 'bg-primary',
  secondary: 'bg-secondary text-secondary-foreground',
  info: 'bg-blue-600 dark:bg-blue-500',
  success: 'bg-emerald-600 dark:bg-emerald-500',
  warning: 'bg-amber-500 dark:bg-amber-400',
  error: 'bg-rose-600 dark:bg-rose-500',
};

/** Surface color treatments for avatar fallbacks matching Badge soft variants. */
const colorMap: Record<AvatarColor, string> = {
  neutral: 'bg-muted text-muted-foreground border-border/80',
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
  info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  /** Image source URL. */
  src?: string;
  /** Alt description for accessibility. */
  alt?: string;
  /** Name to generate fallback initials from. */
  name?: string;
  /** Size variant. */
  size?: AvatarSize;
  /** Shape of the avatar. */
  shape?: 'circle' | 'rounded';
  /** Semantic color theme for fallback avatar (initials/icon), matching Badge color palette. */
  color?: AvatarColor;
  /** Optional active status indicator badge (presence or semantic color). */
  status?: AvatarStatus;
  /** Dot ping/pulse animation for active status (following Badge). */
  pulse?: boolean;
  /** Disables avatar with reduced opacity (following Badge). */
  disable?: boolean;
};

const getInitials = (str?: string) => {
  if (!str) {
    return '';
  }
  return str
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

/**
 * Avatar with image loading fallback to name initials or placeholder SVG,
 * active status indicator badge (with pulse animation and Badge color palette),
 * and size/shape controls.
 * @param props - Avatar component properties.
 * @returns Avatar element.
 */
export function Avatar(props: AvatarProps) {
  const {
    src,
    alt,
    name,
    size = 'md',
    shape = 'circle',
    color = 'neutral',
    status,
    pulse = false,
    disable = false,
    className,
    ...rest
  } = props;

  const [hasError, setHasError] = useState(false);
  const cfg = sizeMap[size];

  const initials = getInitials(name ?? alt);

  const renderAvatarContent = () => {
    if (src && !hasError) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt ?? name ?? 'Avatar'}
          onError={() => {
            setHasError(true);
          }}
          className={cn(
            'h-full w-full object-cover',
            shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          )}
        />
      );
    }

    if (initials) {
      return (
        <span
          className={cn(
            cfg.text,
            'font-semibold tracking-wider',
            color === 'neutral' ? 'text-foreground/80' : 'text-current',
          )}
        >
          {initials}
        </span>
      );
    }

    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-1/2 w-1/2 opacity-70"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  };

  return (
    <div
      {...rest}
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center font-medium shadow-xs border transition-colors',
        colorMap[color],
        cfg.container,
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        disable && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      {renderAvatarContent()}

      {status && (
        <span className={cn('absolute bottom-0 right-0 flex', cfg.badge)}>
          {pulse && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                statusMap[status],
              )}
            />
          )}
          <span
            className={cn(
              'relative h-full w-full rounded-full ring-2 ring-background',
              statusMap[status],
            )}
            aria-label={`Status: ${status}`}
          />
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── AvatarGroup ─── */

export type AvatarGroupProps = HTMLAttributes<HTMLDivElement> & {
  /** Children Avatar elements. */
  children: ReactNode;
  /** Maximum number of avatars shown before truncation badge (+N). */
  max?: number;
};

/**
 * AvatarGroup stacks multiple avatars horizontally with overlap.
 * @param props - AvatarGroup component properties.
 * @returns AvatarGroup element.
 */
export function AvatarGroup(props: AvatarGroupProps) {
  const { children, className, ...rest } = props;

  return (
    <div {...rest} className={cn('flex items-center -space-x-2.5 rtl:space-x-reverse', className)}>
      {children}
    </div>
  );
}
