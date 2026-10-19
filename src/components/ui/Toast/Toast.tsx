'use client';

import { AlertTriangle, Bell, Check, Info, X } from 'lucide-react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/libs/utils';

export type ToastVariant = 'success' | 'info' | 'warning' | 'error' | 'default';

export type ToastItem = {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export type ToastProps = {
  /** Notification category variant. */
  variant?: ToastVariant;
  /** Primary headline. */
  title?: string;
  /** Detailed explanatory message. */
  description?: string;
  /** Optional interactive action link/button. */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Callback triggered when user clicks the dismiss button. */
  onDismiss?: () => void;
  className?: string;
};

const variantConfigs: Record<
  ToastVariant,
  {
    bg: string;
    shadow: string;
    icon: ReactNode;
    defaultTitle: string;
  }
> = {
  success: {
    bg: 'bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-600 dark:to-emerald-500',
    shadow: 'shadow-lg shadow-emerald-600/25 dark:shadow-emerald-950/50',
    icon: <Check className="h-5 w-5 stroke-3" />,
    defaultTitle: 'Success',
  },
  info: {
    bg: 'bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-600 dark:to-blue-500',
    shadow: 'shadow-lg shadow-blue-600/25 dark:shadow-blue-950/50',
    icon: <Info className="h-5 w-5 stroke-[2.5]" />,
    defaultTitle: 'Info',
  },
  warning: {
    bg: 'bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-600 dark:to-amber-500',
    shadow: 'shadow-lg shadow-amber-600/25 dark:shadow-amber-950/50',
    icon: <AlertTriangle className="h-5 w-5 stroke-[2.5]" />,
    defaultTitle: 'Warning',
  },
  error: {
    bg: 'bg-gradient-to-r from-rose-600 to-rose-500 dark:from-rose-600 dark:to-rose-500',
    shadow: 'shadow-lg shadow-rose-600/25 dark:shadow-rose-950/50',
    icon: <X className="h-5 w-5 stroke-3" />,
    defaultTitle: 'Error',
  },
  default: {
    bg: 'bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-800 dark:to-slate-700',
    shadow: 'shadow-lg shadow-slate-900/20',
    icon: <Bell className="h-5 w-5 stroke-[2.5]" />,
    defaultTitle: 'Notification',
  },
};

/**
 * Premium standalone Toast component featuring vibrant gradient surfaces,
 * translucent squircle icon badges, floating background bokeh circles, and circular dismiss button.
 * @param props - Toast component properties.
 * @returns Toast element.
 */
export function Toast(props: ToastProps) {
  const { variant = 'default', title, description, action, onDismiss, className } = props;

  const config = variantConfigs[variant];
  const displayTitle = title ?? config.defaultTitle;

  return (
    <div
      role="alert"
      className={cn(
        'relative overflow-hidden flex items-center gap-3.5 rounded-2xl p-4 sm:p-4.5',
        'border border-white/20 text-white select-none transition-all duration-200',
        config.bg,
        config.shadow,
        className,
      )}
    >
      {/* Background translucent decorative bokeh circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-8 h-28 w-28 rounded-full bg-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-20 h-16 w-16 rounded-full bg-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-36 bottom-1 h-10 w-10 rounded-full bg-white/5"
      />

      {/* Squircle Left Icon Badge */}
      <div
        className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white shadow-xs backdrop-blur-xs"
        aria-hidden="true"
      >
        {config.icon}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center pr-1">
        {displayTitle && (
          <h4 className="text-sm leading-tight font-bold tracking-tight text-white sm:text-base">
            {displayTitle}
          </h4>
        )}
        {description && (
          <p className="mt-0.5 text-xs leading-snug font-medium text-white/90 sm:text-sm">
            {description}
          </p>
        )}
        {action && (
          <button
            type="button"
            onClick={(event) => {
              action.onClick();
              event.stopPropagation();
            }}
            className="mt-1.5 self-start text-xs font-semibold text-white underline underline-offset-2 transition-colors hover:text-white/80"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Circular Translucent Dismiss Button */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="relative z-10 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-white active:scale-95"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────── Toast Context & Provider ─── */

type ToastFn = {
  (options: Omit<ToastItem, 'id'>): string;
  success: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
};

type ToastContextValue = {
  toasts: ToastItem[];
  toast: ToastFn;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

/**
 * Toast notification provider and floating viewport.
 * @param props - ToastProvider properties.
 * @returns ToastProvider element.
 */
export function ToastProvider(props: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastBase = useCallback(
    (opts: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).slice(2, 9);
      const newToast: ToastItem = { id, ...opts };

      setToasts((prev) => [...prev, newToast]);

      const duration = opts.duration ?? 5000;
      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss],
  );

  const toast = useMemo(
    () =>
      Object.assign(toastBase, {
        success: (title: string, description?: string) =>
          toastBase({ variant: 'success', title, description }),
        info: (title: string, description?: string) =>
          toastBase({ variant: 'info', title, description }),
        warning: (title: string, description?: string) =>
          toastBase({ variant: 'warning', title, description }),
        error: (title: string, description?: string) =>
          toastBase({ variant: 'error', title, description }),
      }),
    [toastBase],
  );

  const contextValue = useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss]);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      {/* Floating Viewport */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-full max-w-sm flex-col gap-3 p-2 sm:max-w-md"
      >
        {toasts.map((item) => (
          <div
            key={item.id}
            className="pointer-events-auto animate-in transition-all duration-300 ease-out fade-in-0 slide-in-from-bottom-5"
          >
            <Toast
              variant={item.variant}
              title={item.title}
              description={item.description}
              action={item.action}
              onDismiss={() => {
                dismiss(item.id);
              }}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
