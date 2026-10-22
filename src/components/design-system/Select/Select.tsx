'use client';

import { Check, ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/libs/utils';

/** A single option item in the Select. */
export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

/** Props for the Select component. */
type SelectProps = {
  /** List of selectable options. */
  options: SelectOption[];
  /** Currently selected value. */
  value?: string;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Field label. */
  label?: string;
  /** Helper text shown below. */
  helperText?: string;
  /** Validation error message. */
  error?: string;
  /** Disables the entire select. */
  disabled?: boolean;
  /** Enables option search/filter. */
  searchable?: boolean;
  /** Called when the user selects an option. */
  onChange?: (value: string) => void;
  /** Additional class names on the wrapper. */
  className?: string;
  /** Required marker. */
  required?: boolean;
  /** HTML ID for trigger button. */
  id?: string;
};

/**
 * Custom Select/Dropdown with optional search filter,
 * keyboard navigation, and item descriptions.
 * @param props - Select component properties.
 * @returns Select element.
 */
export function Select(props: SelectProps) {
  const {
    options,
    value,
    placeholder = 'Select an option…',
    label,
    helperText,
    error,
    disabled = false,
    searchable = false,
    onChange,
    className,
    required,
    id,
  } = props;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);

  const selected = options.find((o) => o.value === value);

  const filtered = searchable
    ? options.filter(
        (o) =>
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          o.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      // oxlint-disable-next-line typescript/no-unsafe-type-assertion
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
    };
  }, []);

  // Focus search when opening
  useEffect(() => {
    if (open && searchable) {
      searchRef.current?.focus();
    }
  }, [open, searchable]);

  function handleSelect(opt: SelectOption) {
    if (opt.disabled) {
      return;
    }
    onChange?.(opt.value);
    setOpen(false);
    setQuery('');
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  }

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={containerRef}
      className={cn('relative flex flex-col gap-1.5', className)}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          className={cn(
            'text-sm font-medium text-foreground',
            required && "after:content-['*'] after:ml-0.5 after:text-error",
          )}
        >
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        id={id}
        onClick={() => {
          if (disabled) {
            return;
          }
          setOpen((p) => !p);
        }}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex h-10 w-full items-center justify-between gap-2 rounded-lg border px-3',
          'text-sm bg-card text-left',
          'transition-all duration-150 ease-out cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          hasError
            ? 'border-error focus-visible:outline-error'
            : 'border-border hover:border-primary/40',
        )}
      >
        <span className={cn('truncate', !selected && 'text-muted-foreground/60')}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={cn(
            'shrink-0 text-muted-foreground transition-transform duration-150',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown popover */}
      {open && (
        <div
          className={cn(
            'absolute top-full z-50 mt-1 w-full',
            'rounded-xl border border-border bg-popover',
            'shadow-(--shadow-glass-md) py-1',
            'animate-in fade-in-0 zoom-in-95 duration-100',
          )}
        >
          {searchable && (
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <Search size={14} aria-hidden="true" className="shrink-0 text-muted-foreground" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search…"
                aria-label="Search options"
                aria-controls="options-listbox"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </div>
          )}

          <ul
            id="options-listbox"
            aria-label={label ?? 'Options'}
            className="max-h-56 overflow-y-auto py-1"
          >
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">No results</li>
            )}

            {filtered.map((opt) => (
              <option
                key={opt.value}
                id={`option-${opt.value}`}
                aria-selected={opt.value === value}
                aria-disabled={opt.disabled ?? undefined}
                onClick={() => {
                  if (!opt.disabled) {
                    handleSelect(opt);
                  }
                }}
                className={cn(
                  'flex cursor-pointer items-start gap-3 px-3 py-2',
                  'transition-colors duration-100',
                  opt.disabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-muted',
                  opt.value === value && 'bg-muted',
                )}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{opt.label}</p>
                  {opt.description && (
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {opt.description}
                    </p>
                  )}
                </div>

                {opt.value === value && (
                  <Check size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
                )}
              </option>
            ))}
          </ul>
        </div>
      )}

      {hasError && (
        <p role="alert" className="text-error text-xs font-medium">
          {error}
        </p>
      )}
      {!hasError && helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
}
