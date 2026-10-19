'use client';

import type { InputHTMLAttributes } from 'react';
import { cn } from '@/libs/utils';

type SwitchSize = 'sm' | 'md';

/** Props for the Switch/Toggle component. */
export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> & {
  /** Size variant. */
  size?: SwitchSize;
  /** Label displayed next to the toggle. */
  label?: string;
  /** Position of the label relative to the toggle. */
  labelPosition?: 'left' | 'right';
  /** Helper/description text. */
  description?: string;
};

const trackSize: Record<SwitchSize, string> = {
  sm: 'h-4 w-7',
  md: 'h-6 w-11',
};

const thumbSize: Record<SwitchSize, string> = {
  sm: 'h-3 w-3',
  md: 'h-5 w-5',
};

const thumbTranslate: Record<SwitchSize, string> = {
  sm: 'peer-checked:translate-x-3',
  md: 'peer-checked:translate-x-5',
};

/**
 * Toggle/Switch with high-contrast track & thumb visibility in both light and dark modes,
 * spring-eased sliding thumb, and precise horizontal centerline alignment with label text.
 * @param props - Switch component properties.
 * @returns Switch element.
 */
export function Switch(props: SwitchProps) {
  const {
    size = 'md',
    label,
    labelPosition = 'right',
    description,
    disabled,
    className,
    ...rest
  } = props;

  const toggle = (
    <div className="relative flex shrink-0 items-center">
      <input {...rest} type="checkbox" disabled={disabled} className="peer sr-only" />
      {/* Track */}
      <div
        className={cn(
          trackSize[size],
          'rounded-full border transition-all duration-200 ease-out',
          // Unchecked track: high contrast in both light and dark modes
          'bg-slate-200 border-slate-300 hover:bg-slate-300/80',
          'dark:bg-slate-700 dark:border-white/20 dark:hover:bg-slate-600',
          // Checked track: primary brand color
          'peer-checked:bg-primary peer-checked:border-primary',
          'peer-checked:dark:bg-primary peer-checked:dark:border-primary',
          // Focus ring
          'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
          // Disabled state
          'peer-disabled:opacity-50 peer-disabled:cursor-not-allowed',
        )}
      />
      {/* Thumb */}
      <div
        aria-hidden="true"
        className={cn(
          thumbSize[size],
          thumbTranslate[size],
          'absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm ring-0',
          'dark:bg-white dark:shadow-md',
          'transition-transform duration-200 ease-spring pointer-events-none',
        )}
      />
    </div>
  );

  if (!label) {
    return (
      <label
        className={cn(
          'inline-flex items-center cursor-pointer select-none',
          disabled && 'opacity-50 cursor-not-allowed',
          className,
        )}
      >
        {toggle}
        <span className="sr-only">Toggle</span>
      </label>
    );
  }

  return (
    <label
      className={cn(
        'group inline-flex gap-3 cursor-pointer select-none',
        description ? 'items-start' : 'items-center',
        disabled && 'opacity-50 cursor-not-allowed',
        labelPosition === 'left' && 'flex-row-reverse justify-end',
        className,
      )}
    >
      {toggle}
      <div className={cn('flex flex-col justify-center', size === 'sm' ? 'min-h-4' : 'min-h-6')}>
        <span className="text-sm leading-5 font-medium text-foreground">{label}</span>
        {description && (
          <span className="mt-0.5 text-xs leading-normal text-muted-foreground">{description}</span>
        )}
      </div>
    </label>
  );
}
