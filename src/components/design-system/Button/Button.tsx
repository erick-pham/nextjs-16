import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';
import { Button as BaseButton } from '@/components/ui/button';
import { cn } from '@/libs/utils';

const appButtonVariants = cva('app-button', {
  variants: {
    variant: {
      primary: '',
      secondary: '',
      info: '',
      success: '',
      warning: '',
      destructive: '',
      link: '',
    },
    appearance: {
      default: '',
      gradient: '',
      outline: '',
      ghost: '',
    },
  },
  compoundVariants: [
    // default × primary
    {
      appearance: 'default',
      variant: 'primary',
      className: [
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'shadow-md shadow-primary/30',
        'focus-visible:outline-primary',
      ],
    },
    // default × secondary
    {
      appearance: 'default',
      variant: 'secondary',
      className: [
        'bg-secondary text-secondary-foreground',
        'hover:bg-secondary/80',
        'shadow-md shadow-secondary/30',
        'focus-visible:outline-secondary',
      ],
    },
    // default × info
    {
      appearance: 'default',
      variant: 'info',
      className: [
        'bg-blue-600 text-white',
        'hover:bg-blue-700',
        'shadow-md shadow-blue-600/30 dark:shadow-blue-950/40',
        'focus-visible:outline-blue-600',
      ],
    },
    // default × success
    {
      appearance: 'default',
      variant: 'success',
      className: [
        'bg-emerald-600 text-white',
        'hover:bg-emerald-700',
        'shadow-md shadow-emerald-600/30 dark:shadow-emerald-950/40',
        'focus-visible:outline-emerald-600',
      ],
    },
    // default × warning
    {
      appearance: 'default',
      variant: 'warning',
      className: [
        'bg-amber-500 text-white',
        'hover:bg-amber-600',
        'shadow-md shadow-amber-500/30 dark:shadow-amber-950/40',
        'focus-visible:outline-amber-500',
      ],
    },
    // contained × error
    {
      appearance: 'default',
      variant: 'destructive',
      className: [
        'bg-rose-600 text-white',
        'hover:bg-rose-700',
        'shadow-md shadow-rose-600/30 dark:shadow-rose-950/40',
        'focus-visible:outline-rose-600',
      ],
    },

    // ── Compound variants: outline ─────────────────────────────────────
    // outline × primary
    {
      appearance: 'outline',
      variant: 'primary',
      className: [
        'border-primary text-primary',
        'hover:bg-primary/8',
        'focus-visible:outline-primary',
      ],
    },
    // outline × secondary
    {
      appearance: 'outline',
      variant: 'secondary',
      className: [
        'border-secondary text-secondary-foreground',
        'hover:bg-secondary/10',
        'focus-visible:outline-secondary',
      ],
    },
    // outline × info
    {
      appearance: 'outline',
      variant: 'info',
      className: [
        'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400',
        'hover:bg-blue-600/8',
        'focus-visible:outline-blue-600',
      ],
    },
    // outline × success
    {
      appearance: 'outline',
      variant: 'success',
      className: [
        'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400',
        'hover:bg-emerald-600/8',
        'focus-visible:outline-emerald-600',
      ],
    },
    // outline × warning
    {
      appearance: 'outline',
      variant: 'warning',
      className: [
        'border-amber-500 text-amber-600 dark:text-amber-400 dark:border-amber-400',
        'hover:bg-amber-500/8',
        'focus-visible:outline-amber-500',
      ],
    },
    // outline × destructive
    {
      appearance: 'outline',
      variant: 'destructive',
      className: [
        'border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400',
        'hover:bg-rose-600/8',
        'focus-visible:outline-rose-600',
      ],
    },
  ],

  defaultVariants: {
    variant: 'primary',
    appearance: 'default',
  },
});

type BaseButtonProps = React.ComponentProps<typeof BaseButton>;

export type AppButtonProps = Omit<BaseButtonProps, 'variant' | 'size'> &
  VariantProps<typeof appButtonVariants> & {
    size?: BaseButtonProps['size'];
    loading?: boolean;
    fullWidth?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

export function Button({
  variant = 'primary',
  appearance = 'default',
  size = 'default',
  loading = false,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className,
  iconLeft,
  iconRight,
  children,
  ...props
}: AppButtonProps) {
  const baseVariant = appearance === 'gradient' ? 'default' : appearance;

  return (
    <BaseButton
      {...props}
      type={type}
      variant={variant === 'link' ? variant : baseVariant}
      size={size}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        appButtonVariants({ variant, appearance }),
        className,
        fullWidth ? 'w-full' : '',
      )}
    >
      {loading && (
        <LoaderCircle aria-hidden="true" className="animate-spin" data-icon="inline-start" />
      )}

      {iconLeft && (
        <span className="shrink-0" aria-hidden="true" data-icon="inline-start">
          {iconLeft}
        </span>
      )}

      {children}

      {iconRight && (
        <span className="shrink-0" aria-hidden="true" data-icon="inline-end">
          {iconRight}
        </span>
      )}
    </BaseButton>
  );
}
