import { cva } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/libs/utils';

/** Surface treatment — how the badge is rendered visually. */
export type BadgeVariant = 'soft' | 'solid' | 'outlined';

/** Semantic color palette applied across all badge variants. */
export type BadgeColor =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-semibold transition-colors select-none',
  {
    variants: {
      // ── Style axis ─────────────────────────────────────────────────────────
      variant: {
        soft: '',
        solid: '',
        outlined: 'bg-transparent border',
      },
      // ── Color axis ─────────────────────────────────────────────────────────
      color: {
        neutral: '',
        primary: '',
        secondary: '',
        info: '',
        success: '',
        warning: '',
        error: '',
      },
      // ── Size axis ──────────────────────────────────────────────────────────
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-full',
        md: 'text-xs px-2.5 py-1 rounded-full',
      },
    },

    // ── Compound variants: soft ─────────────────────────────────────────────
    compoundVariants: [
      {
        variant: 'soft',
        color: 'neutral',
        className: 'bg-muted text-muted-foreground border border-border',
      },
      {
        variant: 'soft',
        color: 'primary',
        className: 'bg-primary/10 text-primary border border-primary/20',
      },
      {
        variant: 'soft',
        color: 'secondary',
        className: 'bg-secondary/20 text-secondary-foreground border border-secondary/30',
      },
      {
        variant: 'soft',
        color: 'info',
        className: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
      },
      {
        variant: 'soft',
        color: 'success',
        className:
          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
      },
      {
        variant: 'soft',
        color: 'warning',
        className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
      },
      {
        variant: 'soft',
        color: 'error',
        className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
      },

      // ── Compound variants: solid ────────────────────────────────────────────
      {
        variant: 'solid',
        color: 'neutral',
        className: 'bg-foreground text-background border-transparent',
      },
      {
        variant: 'solid',
        color: 'primary',
        className: 'bg-primary text-primary-foreground border-transparent',
      },
      {
        variant: 'solid',
        color: 'secondary',
        className: 'bg-secondary text-secondary-foreground border-transparent',
      },
      { variant: 'solid', color: 'info', className: 'bg-blue-600 text-white border-transparent' },
      {
        variant: 'solid',
        color: 'success',
        className: 'bg-emerald-600 text-white border-transparent',
      },
      {
        variant: 'solid',
        color: 'warning',
        className: 'bg-amber-500 text-white border-transparent',
      },
      { variant: 'solid', color: 'error', className: 'bg-rose-600 text-white border-transparent' },

      // ── Compound variants: outlined ─────────────────────────────────────────
      {
        variant: 'outlined',
        color: 'neutral',
        className: 'border-border text-foreground hover:bg-muted/40',
      },
      { variant: 'outlined', color: 'primary', className: 'border-primary/50 text-primary' },
      {
        variant: 'outlined',
        color: 'secondary',
        className: 'border-secondary/50 text-secondary-foreground',
      },
      {
        variant: 'outlined',
        color: 'info',
        className: 'border-blue-500/50 text-blue-600 dark:text-blue-400',
      },
      {
        variant: 'outlined',
        color: 'success',
        className: 'border-emerald-500/50 text-emerald-600 dark:text-emerald-400',
      },
      {
        variant: 'outlined',
        color: 'warning',
        className: 'border-amber-500/50 text-amber-600 dark:text-amber-400',
      },
      {
        variant: 'outlined',
        color: 'error',
        className: 'border-rose-500/50 text-rose-600 dark:text-rose-400',
      },
    ],

    defaultVariants: {
      variant: 'soft',
      color: 'neutral',
      size: 'sm',
    },
  },
);

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Surface treatment: soft (tinted), solid (filled), or outlined (bordered). */
  variant?: BadgeVariant;
  /** Semantic color palette applied to the variant. */
  color?: BadgeColor;
  /** Size preset. */
  size?: 'sm' | 'md';
  /** Optional status dot color indicator. */
  dot?: boolean;
  disable?: boolean;
  /** Dot ping/pulse animation (e.g., live stream, running status). */
  pulse?: boolean;
  /** Leading icon slot. */
  icon?: ReactNode;
  /** If provided, renders an accessible remove/close button. */
  onRemove?: () => void;
};

/**
 * Visual status badge with a 2-axis design system:
 * - `variant`: soft | solid | outlined (surface treatment)
 * - `color`: neutral | primary | secondary | info | success | warning | error (semantic palette)
 *
 * Supports pulse dot, leading icon slot, and removable dismiss button.
 * @param props - Badge component properties.
 * @returns Badge element.
 */
export function Badge(props: BadgeProps) {
  const {
    children,
    variant,
    color,
    size,
    dot = false,
    pulse = false,
    disable = false,
    icon,
    onRemove,
    className,
    ...rest
  } = props;

  return (
    <span
      {...rest}
      className={cn(
        badgeVariants({ variant, color, size }),
        className,
        disable ? 'opacity-50' : '',
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2 shrink-0">
          {pulse && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}

      {icon && <span className="shrink-0">{icon}</span>}

      <span>{children}</span>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            if (!disable) {
              e.stopPropagation();
              onRemove();
            }
          }}
          className={cn(
            '-mr-1 ml-0.5 rounded-full p-0.5 text-current hover:bg-foreground/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-none',
            disable ? 'pointer-events-none opacity-50' : '',
          )}
          aria-label="Remove badge"
        >
          <svg viewBox="0 0 14 14" className="h-3 w-3 fill-none stroke-current stroke-2">
            <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}
