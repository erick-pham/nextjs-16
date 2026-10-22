'use client';

import { AlertTriangle, Bell, Check, Info, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/libs/utils';

export type TooltipVariant = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  /** Target trigger element wrapped by the tooltip. */
  children: ReactNode;
  /** Primary text or custom ReactNode content. */
  content?: ReactNode;
  /** Optional headline for rich card tooltips (following Toast title). */
  title?: ReactNode;
  /** Optional explanatory message (following Toast description). */
  description?: ReactNode;
  /** Visual variant matching Toast: vibrant gradient + translucent squircle badge. */
  variant?: TooltipVariant;
  /** Positioning relative to trigger element. */
  position?: TooltipPosition;
  /** Optional custom leading icon (defaults to variant icon when showIcon is true). */
  icon?: ReactNode;
  /** Whether to show the translucent squircle icon badge. */
  showIcon?: boolean;
  /** Optional keyboard shortcut badge (e.g. "⌘K", "Ctrl+S"). */
  shortcut?: string;
  /** Delay in milliseconds before showing tooltip. */
  delay?: number;
  /** Whether to render the matching directional arrow. */
  arrow?: boolean;
  /** Additional container styling. */
  className?: string;
};

const variantConfigs: Record<
  TooltipVariant,
  {
    bg: string;
    shadow: string;
    arrowBg: string;
    icon: ReactNode;
  }
> = {
  default: {
    bg: 'bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700',
    shadow: 'shadow-lg shadow-slate-950/30',
    arrowBg: 'bg-slate-850 dark:bg-slate-750',
    icon: <Bell className="h-3.5 w-3.5 stroke-[2.5]" />,
  },
  primary: {
    bg: 'bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-600 dark:to-indigo-500',
    shadow: 'shadow-lg shadow-blue-700/25 dark:shadow-blue-950/50',
    arrowBg: 'bg-indigo-600 dark:bg-indigo-500',
    icon: <Sparkles className="h-3.5 w-3.5 stroke-2" />,
  },
  info: {
    bg: 'bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-600 dark:to-blue-500',
    shadow: 'shadow-lg shadow-blue-600/25 dark:shadow-blue-950/50',
    arrowBg: 'bg-blue-500',
    icon: <Info className="h-3.5 w-3.5 stroke-[2.5]" />,
  },
  success: {
    bg: 'bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-600 dark:to-emerald-500',
    shadow: 'shadow-lg shadow-emerald-600/25 dark:shadow-emerald-950/50',
    arrowBg: 'bg-emerald-500',
    icon: <Check className="h-3.5 w-3.5 stroke-3" />,
  },
  warning: {
    bg: 'bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-600 dark:to-amber-500',
    shadow: 'shadow-lg shadow-amber-600/25 dark:shadow-amber-950/50',
    arrowBg: 'bg-amber-500',
    icon: <AlertTriangle className="h-3.5 w-3.5 stroke-[2.5]" />,
  },
  error: {
    bg: 'bg-gradient-to-r from-rose-600 to-rose-500 dark:from-rose-600 dark:to-rose-500',
    shadow: 'shadow-lg shadow-rose-600/25 dark:shadow-rose-950/50',
    arrowBg: 'bg-rose-500',
    icon: <X className="h-3.5 w-3.5 stroke-3" />,
  },
};

const positionStyles: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowPositionStyles: Record<TooltipPosition, string> = {
  top: '-bottom-1 left-1/2 -translate-x-1/2 border-b border-r',
  bottom: '-top-1 left-1/2 -translate-x-1/2 border-t border-l',
  left: '-right-1 top-1/2 -translate-y-1/2 border-t border-r',
  right: '-left-1 top-1/2 -translate-y-1/2 border-b border-l',
};

/**
 * Premium Tooltip component inspired by Toast:
 * - Vibrant gradient surfaces with glassmorphism border and shadows
 * - Translucent squircle icon badge and floating background bokeh circles
 * - Rich layouts (headline, description, shortcut kbd) and compact pill modes
 * - Accessible keyboard focus, hover delay, and matching directional arrows
 * @param props - ToastProvider properties.
 * @returns ToastProvider element.
 */
export function Tooltip(props: TooltipProps) {
  const {
    children,
    content,
    title,
    description,
    variant = 'default',
    position = 'top',
    icon,
    showIcon,
    shortcut,
    delay = 150,
    arrow = true,
    className,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const config = variantConfigs[variant];
  const isRich = Boolean(title ?? description);
  const shouldShowIcon = showIcon ?? (Boolean(icon) || (isRich && variant !== 'default'));
  const resolvedIcon = icon ?? (shouldShowIcon ? config.icon : null);

  const handleMouseEnter = () => {
    const t = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimer(t);
  };

  const handleMouseLeave = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setIsVisible(false);
  };

  const richContent = description ?? content;

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => {
        setIsVisible(true);
      }}
      onBlur={() => {
        setIsVisible(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setIsVisible(false);
        }
      }}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 animate-in fade-in-0 zoom-in-95 duration-150',
            positionStyles[position],
            className,
          )}
        >
          {/* Rotated Square Arrow matching gradient and border */}
          {arrow && (
            <div
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute h-2 w-2 rotate-45 border-white/20',
                config.arrowBg,
                arrowPositionStyles[position],
              )}
            />
          )}

          {/* Main Bubble Container */}
          <div
            className={cn(
              'relative flex items-center rounded-xl border border-white/20 text-white select-none transition-all duration-150 overflow-hidden',
              config.bg,
              config.shadow,
              isRich ? 'gap-3 p-3 min-w-44 max-w-xs' : 'gap-2 px-3 py-1.5 whitespace-nowrap',
            )}
          >
            {/* Background decorative bokeh circles (matching Toast design signature) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-3 -bottom-5 h-12 w-12 rounded-full bg-white/10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-3 right-6 h-7 w-7 rounded-full bg-white/10"
            />

            {/* Squircle Left Icon Badge */}
            {resolvedIcon && (
              <div
                className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white shadow-xs backdrop-blur-xs"
                aria-hidden="true"
              >
                {resolvedIcon}
              </div>
            )}

            {/* Content Area */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center">
              {title && (
                <h5 className="text-xs leading-tight font-bold tracking-tight text-white">
                  {title}
                </h5>
              )}
              {richContent && (
                <p
                  className={cn(
                    'text-white/95',
                    isRich
                      ? 'mt-0.5 text-[11px] leading-snug font-medium text-white/90'
                      : 'text-xs font-semibold leading-none',
                  )}
                >
                  {richContent}
                </p>
              )}
            </div>

            {/* Keyboard Shortcut Kbd Badge */}
            {shortcut && (
              <kbd className="relative z-10 ml-1 inline-flex items-center rounded-md border border-white/20 bg-white/15 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white/90 shadow-2xs">
                {shortcut}
              </kbd>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
