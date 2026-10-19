'use client';

import { createContext, useCallback, useContext, useId, useMemo, useState } from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactNode } from 'react';
import { cn } from '@/libs/utils';

export type TabVariant = 'pill' | 'underline' | 'glass' | 'enclosed';
export type TabColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'neutral';
export type TabSize = 'sm' | 'md' | 'lg';
export type TabOrientation = 'horizontal' | 'vertical';

type TabsContextValue = {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: TabVariant;
  color: TabColor;
  size: TabSize;
  orientation: TabOrientation;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error('Tab components must be used within a Tabs provider');
  }
  return ctx;
}

export type TabsProps = HTMLAttributes<HTMLDivElement> & {
  /** Default active tab value (uncontrolled). */
  defaultValue?: string;
  /** Controlled active tab value. */
  value?: string;
  /** Callback when active tab changes. */
  onValueChange?: (value: string) => void;
  /** Surface treatment variant. */
  variant?: TabVariant;
  /** Accent color token applied to active indicator. */
  color?: TabColor;
  /** Size preset for tab items. */
  size?: TabSize;
  /** Layout orientation. */
  orientation?: TabOrientation;
  children: ReactNode;
};

/**
 * Premium Tabs component supporting pill, underline, glassmorphism, and enclosed variants,
 * semantic color palettes, full keyboard navigation (WAI-ARIA), badges, and responsive orientations.
 * @param props - Tabs component properties.
 * @returns Tabs element.
 */
export function Tabs(props: TabsProps) {
  const {
    defaultValue = '',
    value,
    onValueChange,
    variant = 'pill',
    color = 'neutral',
    size = 'md',
    orientation = 'horizontal',
    children,
    className,
    ...rest
  } = props;

  const [internalTab, setInternalTab] = useState(defaultValue);
  const activeTab = value ?? internalTab;
  const baseId = useId();

  const handleTabChange = useCallback(
    (next: string) => {
      if (value === undefined) {
        setInternalTab(next);
      }
      onValueChange?.(next);
    },
    [value, onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      activeTab,
      setActiveTab: handleTabChange,
      variant,
      color,
      size,
      orientation,
      baseId,
    }),
    [activeTab, handleTabChange, variant, color, size, orientation, baseId],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        {...rest}
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col gap-4',
          className,
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* ─────────────────────────────────────────── TabList ─── */

export type TabListProps = HTMLAttributes<HTMLDivElement> & {
  /** Stretch tabs to equal full width of container. */
  fullWidth?: boolean;
};

export function TabList(props: TabListProps) {
  const { fullWidth = false, className, onKeyDown, ...rest } = props;
  const { variant, orientation } = useTabsContext();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) {
      return;
    }

    const tabs = [
      ...e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    ];
    const activeEl = document.activeElement;
    const currentIndex = activeEl instanceof HTMLButtonElement ? tabs.indexOf(activeEl) : -1;
    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number | null = null;
    const isHorizontal = orientation === 'horizontal';

    if ((isHorizontal && e.key === 'ArrowRight') || (!isHorizontal && e.key === 'ArrowDown')) {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if ((isHorizontal && e.key === 'ArrowLeft') || (!isHorizontal && e.key === 'ArrowUp')) {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const target = tabs[nextIndex];
      target?.focus();
      target?.click();
    }
  };

  return (
    <div
      tabIndex={0}
      {...rest}
      role="tablist"
      aria-orientation={orientation}
      onKeyDown={handleKeyDown}
      className={cn(
        'select-none transition-all duration-200',
        orientation === 'horizontal'
          ? 'inline-flex items-center'
          : 'inline-flex flex-col items-stretch',
        fullWidth && orientation === 'horizontal' && 'w-full grid grid-flow-col auto-cols-fr',

        // Variant track surfaces
        variant === 'pill' && [
          'rounded-2xl bg-muted/70 p-1.5 border border-border/60 shadow-inner',
          orientation === 'horizontal' ? 'gap-1' : 'gap-1.5',
        ],

        variant === 'underline' && [
          orientation === 'horizontal'
            ? 'border-b border-border/80 gap-6 pb-px'
            : 'border-r border-border/80 gap-4 pr-px',
        ],

        variant === 'glass' && [
          'rounded-2xl bg-background/50 backdrop-blur-md p-1.5 border border-white/20 dark:border-white/10 shadow-glass',
          orientation === 'horizontal' ? 'gap-1.5' : 'gap-2',
        ],

        variant === 'enclosed' && [
          'rounded-2xl bg-muted/40 p-1.5 border border-border/80',
          orientation === 'horizontal' ? 'gap-1.5' : 'gap-2',
        ],

        className,
      )}
    />
  );
}

/* ─────────────────────────────────────────── Tab ─── */

export type TabProps = HTMLAttributes<HTMLButtonElement> & {
  /** Unique identifier for the tab matching TabPanel value. */
  value: string;
  /** Optional leading icon. */
  icon?: ReactNode;
  /** Optional count badge or tag (string, number, or ReactNode). */
  badge?: ReactNode;
  /** Disables tab interaction. */
  disabled?: boolean;
};

const sizeStyles: Record<TabSize, string> = {
  sm: 'text-xs px-3 py-1 gap-1.5 rounded-lg',
  md: 'text-sm px-4 py-1.5 gap-2 rounded-xl',
  lg: 'text-base px-5 py-2.5 gap-2.5 rounded-xl',
};

const pillActiveMap: Record<TabColor, string> = {
  primary: 'bg-primary text-primary-foreground shadow-sm shadow-primary/25 font-semibold',
  secondary: 'bg-secondary text-secondary-foreground shadow-sm font-semibold',
  info: 'bg-blue-600 text-white shadow-sm shadow-blue-600/25 font-semibold',
  success: 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25 font-semibold',
  warning: 'bg-amber-500 text-white shadow-sm shadow-amber-500/25 font-semibold',
  error: 'bg-rose-600 text-white shadow-sm shadow-rose-600/25 font-semibold',
  neutral: 'bg-background text-foreground shadow-xs border border-border/40 font-semibold',
};

const underlineActiveMap: Record<TabColor, string> = {
  primary: 'border-primary text-primary font-semibold',
  secondary: 'border-secondary-foreground text-secondary-foreground font-semibold',
  info: 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-semibold',
  success:
    'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 font-semibold',
  warning:
    'border-amber-500 text-amber-600 dark:border-amber-400 dark:text-amber-400 font-semibold',
  error: 'border-rose-600 text-rose-600 dark:border-rose-400 dark:text-rose-400 font-semibold',
  neutral: 'border-foreground text-foreground font-semibold',
};

export function Tab(props: TabProps) {
  const { value, icon, badge, disabled, className, children, ...rest } = props;
  const { activeTab, setActiveTab, variant, color, size, orientation, baseId } = useTabsContext();
  const isActive = activeTab === value;

  const tabId = `tab-${baseId}-${value}`;
  const panelId = `panel-${baseId}-${value}`;

  return (
    <button
      {...rest}
      type="button"
      role="tab"
      id={tabId}
      aria-controls={panelId}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => {
        setActiveTab(value);
      }}
      className={cn(
        'relative inline-flex items-center justify-center font-medium transition-all duration-150 outline-none cursor-pointer select-none',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',

        // Pill variant
        variant === 'pill' && [
          sizeStyles[size],
          isActive
            ? pillActiveMap[color]
            : 'text-muted-foreground hover:text-foreground hover:bg-background/40',
        ],

        // Underline variant
        variant === 'underline' && [
          orientation === 'horizontal'
            ? 'pb-2.5 pt-1 px-1 -mb-px border-b-2'
            : 'py-2 px-3 -mr-px border-r-2 text-left justify-start',
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base',
          isActive
            ? underlineActiveMap[color]
            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border/70',
        ],

        // Enclosed variant
        variant === 'enclosed' && [
          sizeStyles[size],
          isActive
            ? 'bg-card text-foreground shadow-xs border border-border/90 font-semibold'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/70',
        ],

        className,
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {badge !== undefined && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 py-0.5 leading-none transition-colors',
            isActive
              ? 'bg-foreground/15 text-current'
              : 'bg-muted-foreground/20 text-muted-foreground',
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

/* ─────────────────────────────────────────── TabPanel ─── */

export type TabPanelProps = HTMLAttributes<HTMLDivElement> & {
  /** Identifier matching the target Tab value. */
  value: string;
};

export function TabPanel(props: TabPanelProps) {
  const { value, className, children, ...rest } = props;
  const { activeTab, baseId } = useTabsContext();

  if (activeTab !== value) {
    return null;
  }

  const tabId = `tab-${baseId}-${value}`;
  const panelId = `panel-${baseId}-${value}`;

  return (
    <div
      {...rest}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={cn(
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'animate-in fade-in-50 duration-200 slide-in-from-bottom-1',
        className,
      )}
    >
      {children}
    </div>
  );
}
