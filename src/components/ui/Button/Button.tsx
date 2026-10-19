'use client';

import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/libs/utils';
import type { ButtonProps } from './Button.types';

/**
 * Color palette tokens keyed by ButtonColor.
 * Each entry drives the contained, outlined, and text variants via compound variants.
 */

const buttonVariants = cva(
  // Base — applied to every button regardless of variant/color
  [
    'inline-flex items-center justify-center gap-2',
    'font-bold whitespace-nowrap select-none',
    'rounded-xl cursor-pointer',
    'transition-all duration-150 ease-out',
    'focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
    'active:scale-95',
  ],
  {
    variants: {
      // ── Style axis ────────────────────────────────────────────────────────
      variant: {
        contained: '',
        outlined: 'border-2 bg-transparent',
        text: 'bg-transparent shadow-none',
      },
      // ── Color axis ────────────────────────────────────────────────────────
      color: {
        primary: '',
        secondary: '',
        info: '',
        success: '',
        warning: '',
        error: '',
      },
      // ── Size axis ─────────────────────────────────────────────────────────
      size: {
        sm: 'h-8 px-3.5 text-xs rounded-lg',
        md: 'h-10 px-5 text-sm rounded-xl',
        lg: 'h-12 px-6 text-base rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },

    // ── Compound variants: contained ────────────────────────────────────────
    compoundVariants: [
      // contained × primary
      {
        variant: 'contained',
        color: 'primary',
        className: [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90',
          'shadow-md shadow-primary/30',
          'focus-visible:outline-primary',
        ],
      },
      // contained × secondary
      {
        variant: 'contained',
        color: 'secondary',
        className: [
          'bg-secondary text-secondary-foreground',
          'hover:bg-secondary/80',
          'shadow-md shadow-secondary/30',
          'focus-visible:outline-secondary',
        ],
      },
      // contained × info
      {
        variant: 'contained',
        color: 'info',
        className: [
          'bg-blue-600 text-white',
          'hover:bg-blue-700',
          'shadow-md shadow-blue-600/30 dark:shadow-blue-950/40',
          'focus-visible:outline-blue-600',
        ],
      },
      // contained × success
      {
        variant: 'contained',
        color: 'success',
        className: [
          'bg-emerald-600 text-white',
          'hover:bg-emerald-700',
          'shadow-md shadow-emerald-600/30 dark:shadow-emerald-950/40',
          'focus-visible:outline-emerald-600',
        ],
      },
      // contained × warning
      {
        variant: 'contained',
        color: 'warning',
        className: [
          'bg-amber-500 text-white',
          'hover:bg-amber-600',
          'shadow-md shadow-amber-500/30 dark:shadow-amber-950/40',
          'focus-visible:outline-amber-500',
        ],
      },
      // contained × error
      {
        variant: 'contained',
        color: 'error',
        className: [
          'bg-rose-600 text-white',
          'hover:bg-rose-700',
          'shadow-md shadow-rose-600/30 dark:shadow-rose-950/40',
          'focus-visible:outline-rose-600',
        ],
      },

      // ── Compound variants: outlined ─────────────────────────────────────
      // outlined × primary
      {
        variant: 'outlined',
        color: 'primary',
        className: [
          'border-primary text-primary',
          'hover:bg-primary/8',
          'focus-visible:outline-primary',
        ],
      },
      // outlined × secondary
      {
        variant: 'outlined',
        color: 'secondary',
        className: [
          'border-secondary text-secondary-foreground',
          'hover:bg-secondary/10',
          'focus-visible:outline-secondary',
        ],
      },
      // outlined × info
      {
        variant: 'outlined',
        color: 'info',
        className: [
          'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400',
          'hover:bg-blue-600/8',
          'focus-visible:outline-blue-600',
        ],
      },
      // outlined × success
      {
        variant: 'outlined',
        color: 'success',
        className: [
          'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400',
          'hover:bg-emerald-600/8',
          'focus-visible:outline-emerald-600',
        ],
      },
      // outlined × warning
      {
        variant: 'outlined',
        color: 'warning',
        className: [
          'border-amber-500 text-amber-600 dark:text-amber-400 dark:border-amber-400',
          'hover:bg-amber-500/8',
          'focus-visible:outline-amber-500',
        ],
      },
      // outlined × error
      {
        variant: 'outlined',
        color: 'error',
        className: [
          'border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400',
          'hover:bg-rose-600/8',
          'focus-visible:outline-rose-600',
        ],
      },

      // ── Compound variants: text ─────────────────────────────────────────
      // text × primary
      {
        variant: 'text',
        color: 'primary',
        className: ['text-primary', 'hover:bg-primary/8', 'focus-visible:outline-primary'],
      },
      // text × secondary
      {
        variant: 'text',
        color: 'secondary',
        className: [
          'text-secondary-foreground',
          'hover:bg-secondary/10',
          'focus-visible:outline-secondary',
        ],
      },
      // text × info
      {
        variant: 'text',
        color: 'info',
        className: [
          'text-blue-600 dark:text-blue-400',
          'hover:bg-blue-600/8',
          'focus-visible:outline-blue-600',
        ],
      },
      // text × success
      {
        variant: 'text',
        color: 'success',
        className: [
          'text-emerald-600 dark:text-emerald-400',
          'hover:bg-emerald-600/8',
          'focus-visible:outline-emerald-600',
        ],
      },
      // text × warning
      {
        variant: 'text',
        color: 'warning',
        className: [
          'text-amber-600 dark:text-amber-400',
          'hover:bg-amber-500/8',
          'focus-visible:outline-amber-500',
        ],
      },
      // text × error
      {
        variant: 'text',
        color: 'error',
        className: [
          'text-rose-600 dark:text-rose-400',
          'hover:bg-rose-600/8',
          'focus-visible:outline-rose-600',
        ],
      },
    ],

    defaultVariants: {
      variant: 'contained',
      color: 'primary',
      size: 'md',
    },
  },
);

/**
 * Versatile button with a 2-axis design system:
 * - `variant`: contained | outlined | text (surface treatment)
 * - `color`: primary | secondary | info | success | warning | error (semantic palette)
 *
 * Supports 3 sizes, loading spinner, and left/right icon slots. WCAG 2.1 AA compliant.
 * @param props - Button component properties.
 * @returns Button element.
 */
export function Button(props: ButtonProps) {
  const {
    variant,
    color,
    size,
    isLoading = false,
    iconLeft,
    iconRight,
    fullWidth,
    disabled,
    className,
    children,
    ...rest
  } = props;

  // oxlint-disable-next-line unicorn/no-nested-ternary
  const iconSize = size === 'lg' ? 20 : size === 'sm' ? 14 : 16;

  return (
    <button
      type="button"
      {...rest}
      disabled={disabled ?? isLoading}
      className={cn(buttonVariants({ variant, color, size, fullWidth }), className)}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <Loader2 size={iconSize} className="animate-spin" aria-hidden="true" />
      ) : (
        iconLeft && (
          <span className="shrink-0" aria-hidden="true">
            {iconLeft}
          </span>
        )
      )}

      {children}

      {!isLoading && iconRight && (
        <span className="shrink-0" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}
