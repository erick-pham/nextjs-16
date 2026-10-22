'use client';

import { Check } from 'lucide-react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/libs/utils';

/* ─────────────────────────────────────────── Checkbox ─── */

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
  /** Label text displayed next to the checkbox. */
  label?: string;
  /** Helper text beneath the label. */
  description?: string;
  /** Shows error styling and aria-invalid. */
  error?: boolean;
};

/**
 * Custom-styled checkbox with high-contrast icon visibility across dark/light modes
 * and aligned horizontal centerlines with label text.
 * @param props - Checkbox component properties.
 * @returns Checkbox element.
 */
export function Checkbox(props: CheckboxProps) {
  const { label, description, error, className, disabled, ...rest } = props;

  return (
    <label
      className={cn(
        'group flex gap-2.5 cursor-pointer select-none',
        description ? 'items-start' : 'items-center',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className,
      )}
    >
      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input {...rest} type="checkbox" aria-invalid={error} className="peer sr-only" />
        {/* Custom box */}
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all duration-150 ease-out',
            'bg-card dark:bg-card',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1',
            error
              ? 'border-error peer-checked:bg-error peer-checked:border-error'
              : 'border-border dark:border-white/20 peer-checked:bg-primary peer-checked:border-primary',
            'group-hover:border-primary/70',
            // Checkmark visibility & animation driven by peer:checked
            '[&_svg]:opacity-0 [&_svg]:scale-75 peer-checked:[&_svg]:opacity-100 peer-checked:[&_svg]:scale-100',
          )}
        >
          <Check
            className="h-3.5 w-3.5 stroke-3 text-primary-foreground transition-all duration-150 ease-spring dark:text-white"
            aria-hidden="true"
          />
        </div>
      </div>

      {(label ?? description) && (
        <div className="flex min-h-5 flex-col justify-center">
          {label && <span className="text-sm leading-5 font-medium text-foreground">{label}</span>}
          {description && (
            <span className="mt-0.5 text-xs leading-normal text-muted-foreground">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}

/* ─────────────────────────────────────────── RadioGroup ─── */

export type RadioOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  /** Accessible group label. */
  label?: string;
  /** Available options. */
  options: RadioOption[];
  /** Selected value. */
  value?: string;
  /** Layout direction. */
  direction?: 'vertical' | 'horizontal';
  /** Called when user selects an option. */
  onChange?: (value: string) => void;
  /** Disables all radios. */
  disabled?: boolean;
  /** fieldset name attribute. */
  name: string;
  /** Additional class names. */
  className?: string;
};

/**
 * Radio group with custom styled radios, smooth animations,
 * and horizontal/vertical layout support.
 * @param props - RadioGroup component properties.
 * @returns RadioGroup element.
 */
export function RadioGroup(props: RadioGroupProps) {
  const {
    label,
    options,
    value,
    direction = 'vertical',
    onChange,
    disabled = false,
    name,
    className,
  } = props;

  return (
    <fieldset className={cn('border-0 p-0 m-0', className)}>
      {label && <legend className="mb-3 text-sm font-semibold text-foreground">{label}</legend>}

      <div
        className={cn(direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'flex flex-col gap-3')}
      >
        {options.map((opt) => {
          const isSelected = opt.value === value;
          const isDisabled = disabled || opt.disabled;

          return (
            <label
              key={opt.value}
              className={cn(
                'group flex gap-2.5 cursor-pointer select-none',
                opt.description ? 'items-start' : 'items-center',
                isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
              )}
            >
              <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={() => onChange?.(opt.value)}
                  className={cn(
                    'peer sr-only',
                    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                  )}
                />
                {/* Outer ring */}
                <div
                  className={cn(
                    'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-150 ease-out',
                    'bg-card dark:bg-card',
                    'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1',
                    isSelected
                      ? 'border-primary'
                      : 'border-border dark:border-white/20 group-hover:border-primary/70',
                  )}
                >
                  {/* Inner dot */}
                  <div
                    className={cn(
                      'h-2.5 w-2.5 rounded-full bg-primary',
                      'transition-all duration-150 ease-spring',
                      isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
                    )}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {(opt.label || opt.description) && (
                <div className="flex min-h-5 flex-col justify-center">
                  <span className="text-sm leading-5 font-medium text-foreground">{opt.label}</span>
                  {opt.description && (
                    <span className="mt-0.5 text-xs leading-normal text-muted-foreground">
                      {opt.description}
                    </span>
                  )}
                </div>
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
