'use client';

import { cva } from 'class-variance-authority';
import { Check } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/libs/utils';

const inputWrapperVariants = cva(
  [
    'relative flex items-center gap-2',
    'w-full rounded-lg border border-border bg-card',
    'transition-all duration-150 ease-out',
    'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-0',
    'has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed',
  ],
  {
    variants: {
      hasError: {
        true: 'border-error has-[:focus-visible]:ring-error',
        false: 'hover:border-primary/40 has-[:focus-visible]:border-primary',
      },
      size: {
        sm: 'h-8 px-2.5',
        md: 'h-10 px-3',
        lg: 'h-12 px-3.5',
      },
    },
    defaultVariants: {
      hasError: false,
      size: 'md',
    },
  },
);

type InputSize = 'sm' | 'md' | 'lg';

/** Props for the Input/TextField component. */
export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** Field label text. */
  label?: string;
  /** Helper text shown below the field. */
  helperText?: string;
  /** Validation error message. Takes priority over helperText. */
  error?: string;
  /** Element rendered at the start (left) of the input — e.g. icon or currency symbol. */
  startAdornment?: ReactNode;
  /** Element rendered at the end (right) of the input — e.g. icon or unit. */
  endAdornment?: ReactNode;
  /** Size preset. */
  size?: InputSize;
  /** Enables floating label animation on standard variant. */
  floatingLabel?: boolean;
  /** Visual variant: default form input or premium stacked card input. */
  variant?: 'default' | 'premium';
  /** Shows success state checkmark badge on the right. */
  success?: boolean;
  /** Accent color for premium variant. */
  accentColor?: 'emerald' | 'primary';
  /** Unique id — required for label association. Falls back to auto-generated value. */
  id?: string;
};

let _counter = 0;
function useId(prefix: string, supplied?: string) {
  if (supplied) {
    return supplied;
  }
  _counter += 1;
  return `${prefix}-${_counter}`;
}

const sizeText: Record<InputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const renderHelperText = ({
  error,
  helperText,
  errorId,
  helperId,
  hasError,
}: {
  error?: string;
  helperText?: string;
  errorId?: string;
  helperId?: string;
  hasError: boolean;
}) => {
  if (hasError) {
    return (
      <p
        id={errorId}
        role="alert"
        className="flex items-center gap-1 text-xs font-medium text-error"
      >
        <svg
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
          className="h-3 w-3 shrink-0"
        >
          <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm-.75 4a.75.75 0 0 1 1.5 0v3.5a.75.75 0 0 1-1.5 0V5zm.75 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
        </svg>
        {error}
      </p>
    );
  }

  if (!hasError && helperText) {
    return (
      <p id={helperId} className="text-xs leading-normal text-muted-foreground">
        {helperText}
      </p>
    );
  }

  return null;
};

const renderEndAdornment = ({
  success,
  endAdornment,
}: {
  success: boolean;
  endAdornment?: ReactNode;
}) => {
  if (success) {
    return (
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs"
        aria-label="Input valid"
      >
        <Check className="h-3 w-3 stroke-3" />
      </div>
    );
  } else if (endAdornment) {
    return (
      <span
        className="flex shrink-0 items-center justify-center text-muted-foreground select-none"
        aria-hidden="true"
      >
        {endAdornment}
      </span>
    );
  }

  return null;
};

const renderFloatingLabel = ({
  floatingLabel,
  label,
  id,
  startAdornment,
  hasError,
  required,
}: {
  floatingLabel: boolean;
  label?: string;
  id?: string;
  startAdornment?: ReactNode;
  hasError: boolean;
  required?: boolean;
}) => {
  if (floatingLabel && label) {
    return (
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute z-10 select-none leading-none rounded-xs',
          'transition-all duration-150 ease-out',
          // Floated state
          '-top-2.5 left-2.5 px-1.5 bg-card text-[11px] font-semibold',
          hasError ? 'text-error' : 'text-muted-foreground peer-focus:text-primary',
          // Unfocused and empty
          'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2',
          'peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal',
          'peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0',
          'peer-placeholder-shown:text-muted-foreground/70',
          startAdornment ? 'peer-placeholder-shown:left-8' : 'peer-placeholder-shown:left-3',
          // Re-float on focus
          'peer-focus:-top-2.5 peer-focus:left-2.5 peer-focus:translate-y-0',
          'peer-focus:text-[11px] peer-focus:font-semibold peer-focus:bg-card peer-focus:px-1.5',
          hasError ? 'peer-focus:text-error' : 'peer-focus:text-primary',
          required ? "after:content-['*'] after:ml-0.5 after:text-error after:font-bold" : '',
        )}
      >
        {label}
      </label>
    );
  }

  return null;
};

/**
 * Text input with start/end adornments, floating label, error/helper text,
 * and support for both standard and premium stacked card variants.
 * @param props - Input component properties.
 * @returns Input element.
 */
export function Input(props: InputProps) {
  const {
    label,
    helperText,
    error,
    startAdornment,
    endAdornment,
    size = 'md',
    floatingLabel = false,
    success = false,
    id: suppliedId,
    className,
    placeholder,
    ...rest
  } = props;

  const id = useId('input', suppliedId);
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  /* ───────────────── Standard Default Variant ───────────────── */
  return (
    <div className={cn('group/field flex flex-col gap-1.5', className)}>
      {label && !floatingLabel && (
        <label
          htmlFor={id}
          className={cn(
            'text-xs font-semibold tracking-tight text-foreground/80 transition-colors select-none',
            'group-focus-within/field:text-foreground',
            hasError && 'text-error group-focus-within/field:text-error',
            rest.required && "after:content-['*'] after:ml-0.5 after:text-error after:font-bold",
          )}
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          inputWrapperVariants({
            hasError,
            size,
          }),
        )}
      >
        {startAdornment && (
          <span
            className="flex shrink-0 items-center justify-center text-muted-foreground select-none"
            aria-hidden="true"
          >
            {startAdornment}
          </span>
        )}

        <input
          {...rest}
          id={id}
          placeholder={floatingLabel ? (placeholder ?? ' ') : placeholder}
          className={cn(
            'peer flex-1 h-full bg-transparent outline-none py-0',
            floatingLabel
              ? 'placeholder:text-transparent peer-focus:placeholder:text-muted-foreground/50'
              : 'placeholder:text-muted-foreground/50',
            sizeText[size],
            'tabular-nums text-foreground',
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : (helperText ?? helperId)}
        />

        {renderFloatingLabel({
          floatingLabel,
          label,
          id,
          startAdornment,
          hasError,
          required: rest.required,
        })}

        {/* End adornment or Success circular badge */}
        {renderEndAdornment({ success, endAdornment })}
      </div>

      {renderHelperText({ error, helperText, errorId, helperId, hasError })}
    </div>
  );
}
